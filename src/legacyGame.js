import game from "./data/gameData.js";

let root = null;
const starterWorkflowSkills = [];
const EMERGENCY_RISK_THRESHOLD = 8;
let audioContext = null;
let soundEnabled = true;
let state = createInitialState();

function createInitialState() {
  return {
    showHeroPopup: false,
    screen: "title",
    index: 0,
    progress: 0,
    activeChaos: null,
    triggeredChaosByPhase: {},
    phaseSummaries: [],
    seenPhaseGoals: [],
    activeSkillDetail: null,
    randomModifiersTriggered: [],
    randomModifierCooldown: 0,
    skills: [...starterWorkflowSkills],
    time: 0,
    token: game.caps.token,
    risk: 0,
    quality: 0,
    history: [],
    resolution: null,
    emergencyTriggered: false,
    microEventTriggered: false,
    lastSignalTone: "stable",
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function normalizeEffects(effects = {}) {
  return {
    time: Number.isFinite(effects.time) ? effects.time : 0,
    token: Number.isFinite(effects.token) ? effects.token : 0,
    risk: Number.isFinite(effects.risk) ? effects.risk : 0,
    quality: Number.isFinite(effects.quality) ? effects.quality : 0,
  };
}

function getTokenSpent() {
  return game.caps.token - state.token;
}

function getTokenRemaining() {
  return Math.max(0, state.token);
}

function getTokenDebt() {
  return Math.max(0, -state.token);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSkill(skillId) {
  return game.skills.find((skill) => skill.id === skillId);
}

function getCurrentStep() {
  return game.steps[state.index] ?? null;
}

function getAvailableOptions(step) {
  if (state.activeChaos) {
    return [
      ...(state.activeChaos.options || []),
      ...(state.activeChaos.skillOptions || []).filter(option => state.skills.includes(option.skill))
    ];
  }

  const synergies = step.synergyOptions
    ? step.synergyOptions.filter((option) => option.requires.every((req) => state.skills.includes(req)))
    : [];
  return [
    ...step.baseOptions,
    ...step.skillOptions.filter((option) => state.skills.includes(option.skill)),
    ...synergies,
  ];
}

function hasCounter(option, eventId) {
  return option.counters?.includes(eventId) ?? false;
}

function getProjectSignalTone() {
  const tokenSpent = getTokenSpent();
  if (state.risk >= EMERGENCY_RISK_THRESHOLD || getTokenDebt() > 0 || state.time >= 16) return "critical";
  if (state.risk >= 4 || tokenSpent >= 7 || state.time >= 10) return "tense";
  return "stable";
}

function shellClass() {
  const tone = getProjectSignalTone();
  return tone === "stable" ? "shell" : `shell shell--${tone}`;
}

function getChoiceReaction(option, countered) {
  if (option.reaction) return option.reaction;

  if (countered) {
    return {
      tone: "recovery",
      title: "Workflow รับแรงกระแทกไว้ได้",
      copy: option.outcome,
    };
  }

  if (option.effects.risk >= 4 || option.effects.quality < 0) {
    return {
      tone: "danger",
      title: "ความเร็วเริ่มกลายเป็นหนี้งาน",
      copy: option.outcome,
    };
  }

  if (option.effects.risk >= 2 || option.effects.token >= 3) {
    return {
      tone: "warn",
      title: "โปรเจกต์เดินหน้า แต่เริ่มมีแรงกด",
      copy: option.outcome,
    };
  }

  if (option.effects.risk < 0 || option.effects.quality >= 3) {
    return {
      tone: "recovery",
      title: "ทีมสร้างหลักยึดก่อนเร่งงาน",
      copy: option.outcome,
    };
  }

  return {
    tone: "safe",
    title: "ทางเลือกนี้ยังคุมเกมได้",
    copy: option.outcome,
  };
}

function inferChoiceSolves(option) {
  const effects = normalizeEffects(option.effects);
  const progress = Number.isFinite(option.progress) ? option.progress : 0;
  const solves = [];

  if (progress >= 100) {
    solves.push("ปิด phase ได้ครบในจังหวะเดียว");
  } else if (progress >= 60) {
    solves.push("เร่ง progress ของ phase อย่างชัดเจน");
  } else if (progress >= 40) {
    solves.push("ขยับงานไปข้างหน้าโดยยังเหลือ room ให้ปรับ");
  }

  if (effects.risk <= -5) {
    solves.push("ลด risk หนักและเพิ่มความมั่นใจก่อนส่งต่อ");
  } else if (effects.risk < 0) {
    solves.push("ลด risk ที่กำลังสะสมใน workflow");
  }

  if (effects.quality >= 5) {
    solves.push("เพิ่ม evidence และ quality ของงาน");
  } else if (effects.quality > 0) {
    solves.push("ทำให้งานตรวจสอบได้มากขึ้น");
  }

  if (option.preventPenalty) {
    solves.push("counter issue ที่เกิดขึ้นใน phase นี้");
  }

  if (option.requires?.length) {
    solves.push("รวมหลาย superpower เพื่อปิด gap หลายด้านพร้อมกัน");
  } else if (option.skill) {
    solves.push("ใช้ superpower เฉพาะทางแก้ pressure จุดนี้");
  }

  if (!solves.length && effects.risk >= 3) {
    solves.push("ซื้อความเร็วหรือ momentum แต่ยอมรับ risk เพิ่ม");
  }

  return solves.length ? solves.join(" / ") : "ให้ทางเลือกเชิง tactical สำหรับสถานการณ์นี้";
}

function inferChoiceMisses(option) {
  const effects = normalizeEffects(option.effects);
  const misses = [];

  if (effects.risk >= 4) {
    misses.push("เพิ่ม risk สูง อาจเปิด phase issue ทันที");
  } else if (effects.risk >= 2) {
    misses.push("ยังมี risk ที่ต้องปิดด้วย guardrail ต่อ");
  }

  if (effects.quality <= -2) {
    misses.push("quality debt สูง อาจทำให้ review หนักขึ้น");
  } else if (effects.quality < 0) {
    misses.push("งานเดินหน้าแต่คุณภาพลดลง");
  }

  if (effects.token >= 3) {
    misses.push("ใช้ AI budget หนัก");
  }

  if (effects.time >= 3) {
    misses.push("ใช้เวลามากและอาจบีบ deadline");
  }

  if (!misses.length && option.tradeoff) {
    misses.push(option.tradeoff);
  }

  return misses.length ? misses.join(" / ") : "ยังต้อง verify ต่อใน phase ถัดไป";
}

function getChoiceMeaning(option) {
  return {
    purpose: option.purpose || option.helper || "เลือกแนวทางนี้เพื่อจัดการ pressure เฉพาะหน้าของ phase",
    solves: option.solves || inferChoiceSolves(option),
    misses: option.misses || inferChoiceMisses(option),
  };
}

function getInPlayHint(step, option, countered) {
  if (option.hint) return option.hint;

  const effects = normalizeEffects(option.effects);

  if (countered) {
    return "Hint: เลือก tool ถูกกับ edge case แล้ว รอบต่อไปให้ดูว่า cost ด้านเวลา/token คุ้มกับ risk ที่ลดลงไหม";
  }

  if (option.requires?.length) {
    return "Hint: combo ช่วยปิดหลาย gap ได้เร็ว แต่ยังต้องดูว่า phase นี้ต้องการ combo ทั้งชุดจริงหรือไม่";
  }

  if (effects.risk >= 4 || effects.quality <= -2) {
    return "Hint: ทางลัดนี้มีเหตุผลเรื่องความเร็ว แต่กำลังเปลี่ยนเป็นหนี้ risk/quality ที่ต้องจ่ายตอน Review";
  }

  if (effects.token >= 3 || effects.time >= 3) {
    return "Hint: choice นี้ซื้อความมั่นใจด้วย budget/time ถ้าใช้ซ้ำต้องมี evidence กลับมาคุ้มค่า";
  }

  if (effects.risk < 0 || effects.quality >= 3) {
    return "Hint: guardrail ที่ดีควรลดความไม่แน่นอนของ phase ไม่ใช่แค่เพิ่มขั้นตอนให้ดูครบ";
  }

  return step?.goal?.copy || option.lesson || "Hint: ดูผล resource แล้วตัดสินว่าควรเร่งต่อหรือวาง guardrail เพิ่ม";
}

function buildMicroEvent({ id, title, icon, tags, tradeoff, outcome, lesson, effects, reaction }) {
  return {
    phase: "System Signal",
    eventId: id,
    eventTitle: title,
    optionId: id,
    optionLabel: title,
    optionIcon: icon,
    optionTone: reaction.tone === "danger" ? "gray" : "mint",
    skillName: null,
    tags,
    tradeoff,
    outcome,
    lesson,
    countered: false,
    effects,
    lines: ["สัญญาณนี้เกิดจากทรัพยากรที่สะสมระหว่างเล่น ไม่ใช่เหตุการณ์สุ่ม"],
    reaction,
    isMicroEvent: true,
  };
}

function formatRandomEffectDelta(effects) {
  const safeEffects = normalizeEffects(effects);
  const deltas = [];

  if (safeEffects.time !== 0) {
    deltas.push(`Time ${safeEffects.time > 0 ? "+" : ""}${safeEffects.time}`);
  }

  if (safeEffects.token !== 0) {
    deltas.push(`Token ${safeEffects.token > 0 ? "-" : "+"}${Math.abs(safeEffects.token)}`);
  }

  if (safeEffects.risk !== 0) {
    deltas.push(`Risk ${safeEffects.risk > 0 ? "+" : ""}${safeEffects.risk}`);
  }

  if (safeEffects.quality !== 0) {
    deltas.push(`Quality ${safeEffects.quality > 0 ? "+" : ""}${safeEffects.quality}`);
  }

  return deltas.length ? deltas.join(" / ") : "No resource change";
}

function buildRandomModifierEvent(modifier, step) {
  const effects = normalizeEffects(modifier.effects);
  const tone = modifier.tone || (effects.risk > 0 || effects.token > 0 || effects.time > 0 ? "warn" : "safe");

  return {
    phase: "External Signal",
    eventId: modifier.id,
    eventTitle: modifier.title,
    optionId: modifier.id,
    optionLabel: modifier.title,
    optionIcon: modifier.icon || "???",
    optionTone: tone === "danger" ? "gray" : "mint",
    skillName: null,
    tags: modifier.tags || ["external"],
    tradeoff: "External pressure แทรกหลัง decision เพื่อทดสอบว่า workflow รับแรงกดจริงได้ไหม",
    outcome: modifier.copy,
    lesson: "นี่เป็น external signal ไม่ใช่ Problems Triggered จาก choice โดยตรง แต่ resource delta ยังสะท้อนแรงกดของ run นี้",
    hint: modifier.hint || "Hint: ถ้า signal นี้เริ่มกัด resource ให้ใช้ choice ถัดไปปิด pressure ด้วยหลักฐาน ไม่ใช่เร่งแบบเดิม",
    countered: false,
    effects,
    progress: 0,
    lines: [
      `External signal หลัง decision ใน phase ${step?.title || "current"}`,
      modifier.copy,
      formatRandomEffectDelta(effects),
    ],
    reaction: {
      tone,
      title: tone === "safe" ? "Workflow รับแรงกดได้" : "แรงกดนอกแผนเริ่มโผล่",
      copy: "เกมโยน external signal เข้ามาให้ adapt โดยไม่เปลี่ยนโจทย์หลักของ phase",
    },
    isRandomModifier: true,
  };
}

function isHarmfulModifier(modifier) {
  const effects = normalizeEffects(modifier.effects);
  return effects.time > 0 || effects.token > 0 || effects.risk > 0 || effects.quality < 0;
}

function hasExternalPressure(lastResult) {
  const effects = normalizeEffects(lastResult?.effects);
  return (
    effects.risk >= 3
    || effects.quality < 0
    || effects.token >= 3
    || effects.time >= 3
    || state.risk >= 4
    || getTokenSpent() >= 7
    || state.time >= 10
    || state.quality < 0
  );
}

function chooseWeightedRandomModifier(modifiers) {
  const totalWeight = modifiers.reduce((total, modifier) => total + Math.max(0, modifier.weight || 1), 0);
  let roll = Math.random() * totalWeight;

  for (const modifier of modifiers) {
    roll -= Math.max(0, modifier.weight || 1);
    if (roll <= 0) return modifier;
  }

  return modifiers[modifiers.length - 1] || null;
}

function maybeTriggerRandomModifier(step, lastResult = null) {
  const config = game.randomModifierConfig || {};
  const maxPerRun = Number.isFinite(config.maxPerRun) ? config.maxPerRun : 2;
  const chance = Number.isFinite(config.chance) ? config.chance : 0.3;

  if (!step || !game.randomModifiers?.length) return null;
  if ((state.randomModifiersTriggered || []).length >= maxPerRun) return null;

  if (state.randomModifierCooldown > 0) {
    state.randomModifierCooldown = Math.max(0, state.randomModifierCooldown - 1);
    return null;
  }

  const triggeredIds = new Set((state.randomModifiersTriggered || []).map((modifier) => modifier.id));
  const pressureActive = hasExternalPressure(lastResult);
  const availableModifiers = game.randomModifiers.filter((modifier) => {
    if (triggeredIds.has(modifier.id)) return false;
    return pressureActive || !isHarmfulModifier(modifier);
  });
  if (!availableModifiers.length) return null;

  const shouldForceFirst =
    state.randomModifiersTriggered.length === 0
    && config.guaranteedFirstRandomByPhase
    && step.id === config.guaranteedFirstRandomByPhase;

  if (!shouldForceFirst && Math.random() >= chance) return null;

  const modifier = chooseWeightedRandomModifier(availableModifiers);
  if (!modifier) return null;

  const randomEvent = buildRandomModifierEvent(modifier, step);
  applyEffects(randomEvent.effects);
  state.randomModifiersTriggered = [
    ...state.randomModifiersTriggered,
    {
      id: modifier.id,
      title: modifier.title,
      phase: step.title,
      effects: randomEvent.effects,
    },
  ];
  state.randomModifierCooldown = Number.isFinite(config.cooldownDecisions) ? config.cooldownDecisions : 1;
  state.lastSignalTone = getProjectSignalTone();
  return randomEvent;
}

function maybeTriggerMicroEvent() {
  if (state.microEventTriggered) return null;

  let microEvent = null;

  if (getTokenSpent() >= 11) {
    microEvent = buildMicroEvent({
      id: "context_drift",
      title: "AI Context Drift",
      icon: "AI",
      tags: ["AI ล้า", "ต้องคัดกรอง", "risk เพิ่ม"],
      tradeoff: "ใช้ AI หนักจนคำตอบเริ่มต้องตรวจละเอียดขึ้น",
      outcome: "AI เริ่มย้ำ pattern เดิมและเสนอข้อความที่ดูดีแต่ไม่ค่อยตรงโจทย์ลูกค้า",
      lesson: "AI budget ไม่ใช่คะแนน ยิ่งใช้หนักยิ่งต้องมีระบบตรวจ",
      effects: { time: 0, token: 0, risk: 1, quality: -1 },
      reaction: {
        tone: "warn",
        title: "AI เริ่ม drift จากโจทย์",
        copy: "คำตอบยังดูมีเหตุผล แต่ทีมต้องใช้แรงคัดกรองมากขึ้นเพราะบริบทเริ่มล้น",
      },
    });
  } else if (state.risk >= 5) {
    microEvent = buildMicroEvent({
      id: "client_trust_shake",
      title: "Client Trust Shakes",
      icon: "!",
      tags: ["ลูกค้ากังวล", "ความเชื่อมั่นสั่น", "ต้องมีหลักฐาน"],
      tradeoff: "ความเสี่ยงสะสมทำให้ทุกคำตอบต้องมีหลักฐานรองรับ",
      outcome: "ลูกค้าเริ่มถามว่าทำไมข้อความบนหน้าเว็บไม่ตรงกับฟีเจอร์ที่คุยกันไว้",
      lesson: "ความเสี่ยงที่ไม่ถูกจัดการจะกลายเป็นคำถามเรื่องความน่าเชื่อถือ",
      effects: { time: 0, token: 0, risk: 1, quality: 0 },
      reaction: {
        tone: "danger",
        title: "Trust เริ่มแตกร้าว",
        copy: "ทีมยังเดินต่อได้ แต่ลูกค้าเริ่มมองหาหลักฐานว่าเว็บนี้พูดความจริง",
      },
    });
  } else if (state.time >= 14) {
    microEvent = buildMicroEvent({
      id: "deadline_squeeze",
      title: "Deadline Squeeze",
      icon: "CLK",
      tags: ["เวลาเริ่มบีบ", "ตัดสินใจยากขึ้น", "risk เพิ่ม"],
      tradeoff: "เวลาที่ใช้ไปทำให้ทางเลือกช่วงท้ายแคบลง",
      outcome: "ทีมเริ่มตัด scope บางอย่างเพื่อให้ทัน demo ทำให้ review ต้องคมกว่าเดิม",
      lesson: "เวลาที่ใช้กับ workflow ต้องซื้อความมั่นใจกลับมา ไม่ใช่แค่เพิ่มพิธีกรรม",
      effects: { time: 0, token: 0, risk: 1, quality: 0 },
      reaction: {
        tone: "warn",
        title: "Deadline เริ่มบีบ decision",
        copy: "ทางเลือกช่วงท้ายเริ่มแคบลง ทีมต้องเลือกสิ่งที่ลดความเสี่ยงจริง ๆ",
      },
    });
  }

  if (!microEvent) return null;

  state.microEventTriggered = true;
  applyEffects(microEvent.effects);
  state.lastSignalTone = getProjectSignalTone();
  return microEvent;
}

function applyEffects(effects) {
  const safeEffects = normalizeEffects(effects);

  state.time = Math.max(0, state.time + safeEffects.time);
  state.token = Math.min(game.caps.token, state.token - safeEffects.token);
  state.risk = clamp(state.risk + safeEffects.risk, 0, game.caps.risk + 8);
  state.quality += safeEffects.quality;

  if (state.token < 0) {
    state.risk = clamp(state.risk + 1, 0, game.caps.risk + 8);
  }

  if (state.time > game.caps.time) {
    state.risk = clamp(state.risk + 1, 0, game.caps.risk + 8);
  }
}

function buildResolution(step, option) {
  const optionEffects = normalizeEffects(option.effects);
  const choiceMeaning = getChoiceMeaning(option);
  let skillNameStr = null;
  if (option.skill) {
    skillNameStr = getSkill(option.skill)?.name;
  } else if (option.requires) {
    skillNameStr = "Synergy: " + option.requires.map(r => getSkill(r)?.name).join(" + ");
  }
  const hiddenPenalty = [];

  if (state.token - optionEffects.token < 0) {
    hiddenPenalty.push("ทีมใช้ AI budget หนักเกินไป คำตอบเริ่มต้องคัดกรองมากขึ้น");
  }

  if (state.time + optionEffects.time > game.caps.time) {
    hiddenPenalty.push("deadline เริ่มบีบ ทีมต้องตัดสินใจเร็วขึ้นในช่วงท้าย");
  }

  let eventTitle = "";
  let eventLine = "";
  let projectMood = "";
  let countered = false;

  if (state.activeChaos) {
    eventTitle = state.activeChaos.title;
    if (option.preventPenalty) {
      countered = true;
      eventLine = `Chaos คลี่คลาย: ${state.activeChaos.title} ถูกจัดการได้ทัน`;
      projectMood = "ความเสียหายถูกหยุดไว้ได้";
    } else {
      eventLine = `Chaos ส่งผลกระทบ: ${state.activeChaos.title}`;
      projectMood = `เสีย Progress ${state.activeChaos.progressPenalty}%`;
    }
  } else if (step.event) {
    eventTitle = step.event.title;
    eventLine = `Emergency: ${step.event.title}`;
    projectMood = step.event.copy || option.outcome || "";
  } else {
    eventTitle = "Action Completed";
    eventLine = `Progress +${option.progress || 0}%`;
    projectMood = option.outcome || "";
  }

  return {
    phase: step.title,
    eventId: state.activeChaos ? state.activeChaos.id : "action",
    eventTitle: eventTitle,
    optionId: option.id,
    optionLabel: option.label,
    optionIcon: option.icon || "ACT",
    optionTone: option.tone,
    skillName: skillNameStr,
    tags: option.tags || [],
    tradeoff: option.tradeoff,
    purpose: choiceMeaning.purpose,
    solves: choiceMeaning.solves,
    misses: choiceMeaning.misses,
    outcome: option.resolveMsg || option.outcome,
    lesson: option.lesson || "",
    hint: getInPlayHint(step, option, countered),
    reaction: getChoiceReaction(option, countered),
    countered,
    effects: optionEffects,
    progress: state.activeChaos ? (option.preventPenalty ? 0 : -(state.activeChaos.progressPenalty)) : (option.progress || 0),
    lines: [eventLine, projectMood, ...hiddenPenalty],
    problem: option.problem || state.activeChaos?.problem || step.event?.problem || null,
  };
}

function sumEffects(entries) {
  return entries.reduce(
    (total, item) => {
      const effects = normalizeEffects(item.effects);
      total.time += effects.time;
      total.token += effects.token;
      total.risk += effects.risk;
      total.quality += effects.quality;
      return total;
    },
    { time: 0, token: 0, risk: 0, quality: 0 },
  );
}

function getPhaseFocus({ riskDelta, tokenDelta, timeDelta, qualityDelta, riskyChoices, counteredEvents, problems }) {
  if (riskDelta >= 4 || riskyChoices >= 2) {
    return "โฟกัส Spec, guardrail และ Review ให้เร็วขึ้นก่อน risk สะสมเกินควบคุม";
  }

  if (qualityDelta < 0) {
    return "โฟกัส acceptance criteria และ test/checklist เพื่อไม่ให้งานดูเสร็จแต่คุณภาพถอย";
  }

  if (tokenDelta >= 6) {
    return "โฟกัสการใช้ AI แบบมีขอบเขต ลดการ reprompt และเพิ่มเครื่องมือคัดกรอง";
  }

  if (timeDelta >= 5) {
    return "โฟกัสแตกงานให้เล็กและเลือก workflow ที่ซื้อความมั่นใจจริง ไม่ใช่เพิ่มขั้นตอนลอย ๆ";
  }

  if (problems.length && counteredEvents === 0) {
    return "โฟกัสเลือก Superpower ที่ counter edge case ของ phase นี้ให้ตรงจังหวะ";
  }

  return "รักษาจังหวะนี้ไว้ แล้วใช้ Review/Scanner ตรวจหลักฐานก่อนส่งต่อ";
}

function getPhaseGrade(score) {
  if (score >= 85) {
    return {
      label: "A",
      title: "Phase Cleared",
      tone: "safe",
      helper: "เล่น phase นี้แข็งแรง ใช้ workflow ช่วยลดความเสี่ยงได้ชัด",
    };
  }

  if (score >= 70) {
    return {
      label: "B",
      title: "Solid Control",
      tone: "safe",
      helper: "คุม phase ได้ดี แม้ยังมีค่าใช้จ่ายด้านเวลา หรือ AI budget อยู่บ้าง",
    };
  }

  if (score >= 50) {
    return {
      label: "C",
      title: "Working but Fragile",
      tone: "warn",
      helper: "phase นี้เดินต่อได้ แต่ยังมี risk หรือ quality debt ซ่อนอยู่",
    };
  }

  if (score >= 31) {
    return {
      label: "D",
      title: "Barely Controlled",
      tone: "warn",
      helper: "รอดแบบตึงมือ ทางลัดเริ่มกินความน่าเชื่อถือของ workflow",
    };
  }

  return {
    label: "F",
    title: "Phase Breakdown",
    tone: "danger",
    helper: "phase นี้เสียหายหนัก ต้องกลับไปตั้ง guardrail ก่อนเร่งงานต่อ",
  };
}

function buildPhaseSummary(step) {
  const entries = state.history.filter((item) => item.phase === step.title && !item.isMicroEvent);
  const effects = sumEffects(entries);
  const riskyChoices = entries.filter((item) => normalizeEffects(item.effects).risk >= 3).length;
  const counteredEvents = entries.filter((item) => item.countered).length;
  const skillUses = entries.filter((item) => item.skillName).length;
  const problems = [...new Set(entries.map((item) => item.problem).filter(Boolean))];
  const edgeCases = [...new Set(entries.filter((item) => item.eventId !== "action").map((item) => item.eventTitle).filter(Boolean))];
  const positiveQuality = Math.max(0, effects.quality);
  const qualityScore = Math.min(positiveQuality, 8) * 4 + Math.max(0, positiveQuality - 8) * 1.5 + Math.min(0, effects.quality) * 6;
  const phaseCeiling = Math.min(
    100,
    effects.token >= 9 ? 76 : effects.token >= 6 ? 86 : 100,
    effects.time >= 7 ? 76 : effects.time >= 5 ? 86 : 100,
    riskyChoices >= 2 ? 72 : riskyChoices >= 1 ? 88 : 100,
  );
  const rawScore =
    68
    + qualityScore
    + counteredEvents * 10
    + skillUses * 3
    - Math.max(0, effects.risk) * 8
    - riskyChoices * 9
    - Math.max(0, effects.token - 3) * 4
    - Math.max(0, effects.time - 3) * 4;
  const score = clamp(Math.round(Math.min(rawScore, phaseCeiling)), 0, 100);
  const grade = getPhaseGrade(score);

  return {
    phase: step.title,
    score,
    grade,
    choices: entries.map((item) => item.optionLabel),
    edgeCases,
    problems,
    effects,
    riskyChoices,
    counteredEvents,
    skillUses,
    focus: getPhaseFocus({
      riskDelta: effects.risk,
      tokenDelta: effects.token,
      timeDelta: effects.time,
      qualityDelta: effects.quality,
      riskyChoices,
      counteredEvents,
      problems,
    }),
  };
}

function getNormalPhaseDecisionCount(step) {
  if (!step) return 0;
  return state.history.filter((item) =>
    item.phase === step.title
    && item.eventId === "action"
    && !item.isMicroEvent
    && !item.isRandomModifier
  ).length;
}

function shouldTriggerPhaseIssue(step, lastResult) {
  if (!step?.chaosEvents?.length) return false;
  if (state.activeChaos || state.triggeredChaosByPhase[step.id]) return false;
  if (state.progress >= step.requiredProgress) return false;
  if (!lastResult || lastResult.eventId !== "action") return false;

  const effects = normalizeEffects(lastResult.effects);
  const pressureFromRisk = effects.risk >= 4;
  const pressureFromQuality = effects.quality <= -2;
  const stalledPhase = getNormalPhaseDecisionCount(step) >= 2;

  return pressureFromRisk || pressureFromQuality || stalledPhase;
}

function chooseOption(optionId) {
  const isEmergency = state.screen === "emergency_step";
  const step = isEmergency ? game.emergencyStep : getCurrentStep();
  const option = getAvailableOptions(step).find((item) => item.id === optionId);
  if (!step || !option) return;

  playChoiceSound(option);
  const resolution = buildResolution(step, option);
  applyEffects(option.effects || {time:0, token:0, risk:0, quality:0});
  state.progress = clamp(state.progress + resolution.progress, 0, 100);
  
  if (state.activeChaos) {
    state.activeChaos = null; // Cleared
  }

  state.lastSignalTone = getProjectSignalTone();
  state.resolution = resolution;
  state.history.push(resolution);
  state.screen = isEmergency ? "emergency_resolution" : "resolution";
  render();
}

function advanceAfterNormalDecision({ allowRandomModifier = true, allowMicroEvent = true, allowPhaseIssue = true, lastResult = null } = {}) {
  if (state.risk >= EMERGENCY_RISK_THRESHOLD && !state.emergencyTriggered) {
    state.emergencyTriggered = true;
    state.resolution = null;
    state.screen = "emergency_step";
    render();
    return;
  }

  const step = getCurrentStep();

  if (!step) {
    state.screen = "result";
    state.lastSignalTone = getProjectSignalTone();
    render();
    return;
  }

  if (state.progress >= step.requiredProgress) {
    state.phaseSummaries = [...state.phaseSummaries, buildPhaseSummary(step)];
    state.index += 1;
    state.progress = 0;
    state.screen = state.index >= game.steps.length ? "result" : "step";
    state.lastSignalTone = getProjectSignalTone();
    render();
    return;
  }

  if (allowPhaseIssue && shouldTriggerPhaseIssue(step, lastResult)) {
    state.activeChaos = step.chaosEvents[0];
    state.triggeredChaosByPhase[step.id] = state.activeChaos.id;
    state.screen = "step";
    state.lastSignalTone = getProjectSignalTone();
    render();
    return;
  }

  const microEvent = allowMicroEvent ? maybeTriggerMicroEvent() : null;
  if (microEvent) {
    state.resolution = microEvent;
    state.history.push(microEvent);
    state.screen = "resolution";
    render();
    return;
  }

  if (allowRandomModifier) {
    const randomModifier = maybeTriggerRandomModifier(step, lastResult);
    if (randomModifier) {
      state.resolution = randomModifier;
      state.history.push(randomModifier);
      state.screen = "resolution";
      render();
      return;
    }
  }

  state.screen = "step";

  state.lastSignalTone = getProjectSignalTone();
  render();
}

function continueAfterResolution() {
  if (state.screen === "emergency_resolution") {
    state.resolution = null;
    state.index += 1;
    state.progress = 0;
    state.screen = state.index >= game.steps.length ? "result" : "step";
    state.lastSignalTone = getProjectSignalTone();
    render();
    return;
  }

  if (state.resolution?.isRandomModifier) {
    state.resolution = null;
    advanceAfterNormalDecision({ allowRandomModifier: false, allowMicroEvent: false, allowPhaseIssue: false });
    return;
  }

  if (state.resolution?.isMicroEvent) {
    state.resolution = null;
    if (state.risk >= EMERGENCY_RISK_THRESHOLD && !state.emergencyTriggered) {
      state.emergencyTriggered = true;
      state.screen = "emergency_step";
      render();
      return;
    }

    // Go back to step, not next step
    state.screen = "step";
    state.lastSignalTone = getProjectSignalTone();
    render();
    return;
  }

  const completedResolution = state.resolution;
  const isNormalDecision = completedResolution?.eventId === "action";
  state.resolution = null;
  advanceAfterNormalDecision({
    allowRandomModifier: isNormalDecision,
    allowMicroEvent: isNormalDecision,
    allowPhaseIssue: isNormalDecision,
    lastResult: completedResolution,
  });
}

function toggleSkill(skillId) {
  if (state.skills.includes(skillId)) {
    state.skills = state.skills.filter((id) => id !== skillId);
    state.activeSkillDetail = null;
    render();
    return;
  }

  if (state.skills.length >= game.maxSkills) {
    return;
  }
  state.skills = [...state.skills, skillId];
  state.activeSkillDetail = null;
  render();
}

function openSkillDetail(skillId) {
  if (!getSkill(skillId)) return;
  state.activeSkillDetail = skillId;
  render();
}

function closeSkillDetail() {
  state.activeSkillDetail = null;
  render();
}

function confirmPhaseGoal() {
  const step = getCurrentStep();
  if (!step || state.screen !== "step") return;

  if (!state.seenPhaseGoals.includes(step.id)) {
    state.seenPhaseGoals = [...state.seenPhaseGoals, step.id];
  }
  render();
}

function startMission() {
  if (state.skills.length !== game.maxSkills) return;
  state.activeSkillDetail = null;
  state.screen = "step";
  render();
}

function startSkillDraft() {
  state.activeSkillDetail = null;
  state.screen = "setup";
  render();
}

function restart() {
  playRestartSound();
  state = createInitialState();
  render();
}

function ensureAudio() {
  if (!soundEnabled) return null;
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    audioContext = new AudioCtx();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

function beep({ frequency, duration = 0.08, type = "square", volume = 0.03, delay = 0 }) {
  const ctx = ensureAudio();
  if (!ctx) return;

  const start = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function playChoiceSound(option) {
  if (option.effects.risk > 2) {
    beep({ frequency: 210, duration: 0.08, volume: 0.035 });
    beep({ frequency: 160, duration: 0.12, volume: 0.03, delay: 0.06 });
    return;
  }

  if (option.counters?.length) {
    beep({ frequency: 392, duration: 0.07, volume: 0.03 });
    beep({ frequency: 523, duration: 0.08, volume: 0.028, delay: 0.05 });
    beep({ frequency: 659, duration: 0.09, volume: 0.026, delay: 0.1 });
    return;
  }

  beep({ frequency: 450, duration: 0.07, volume: 0.03 });
  beep({ frequency: 560, duration: 0.08, volume: 0.025, delay: 0.05 });
}

function playResultSound(failed) {
  if (failed) {
    beep({ frequency: 220, duration: 0.12, volume: 0.04 });
    beep({ frequency: 180, duration: 0.18, volume: 0.035, delay: 0.08 });
    beep({ frequency: 140, duration: 0.22, volume: 0.03, delay: 0.18 });
    return;
  }

  beep({ frequency: 392, duration: 0.1, volume: 0.03 });
  beep({ frequency: 523, duration: 0.1, volume: 0.03, delay: 0.08 });
  beep({ frequency: 659, duration: 0.16, volume: 0.03, delay: 0.16 });
}

function playRestartSound() {
  beep({ frequency: 500, duration: 0.06, volume: 0.03 });
  beep({ frequency: 680, duration: 0.08, volume: 0.025, delay: 0.05 });
}

function soundButtonMarkup() {
  return `
    <button class="sound-toggle ${soundEnabled ? "on" : "off"}" type="button" aria-label="Toggle sound">
      <span class="sound-toggle__icon">${soundEnabled ? "SFX" : "OFF"}</span>
    </button>
  `;
}

function handleRootClick(event) {
  const target = event.target;
  if (!(target instanceof Element) || !root?.contains(target)) return;

  if (target.classList.contains("skill-detail-overlay")) {
    closeSkillDetail();
    return;
  }

  const closeSkillButton = target.closest(".skill-detail-close");
  if (closeSkillButton) {
    closeSkillDetail();
    return;
  }

  const toggleSkillButton = target.closest(".skill-detail-toggle");
  if (toggleSkillButton) {
    toggleSkill(toggleSkillButton.dataset.skill);
    return;
  }

  const soundButton = target.closest(".sound-toggle");
  if (soundButton) {
    soundEnabled = !soundEnabled;
    if (soundEnabled) beep({ frequency: 640, duration: 0.06, volume: 0.02 });
    render();
    return;
  }

  const heroStartButton = target.closest(".hero-start-btn");
  if (heroStartButton) {
    if (state.showHeroPopup && heroStartButton.closest(".hero-popup-overlay")) {
      state.showHeroPopup = false;
      render();
      return;
    }

    startSkillDraft();
    return;
  }

  const skillCard = target.closest(".skill-card");
  if (skillCard) {
    openSkillDetail(skillCard.dataset.skill);
    return;
  }

  const handCard = target.closest(".superpower-hand__card");
  if (handCard) {
    openSkillDetail(handCard.dataset.skill);
    return;
  }

  const startButton = target.closest(".start-mission");
  if (startButton) {
    startMission();
    return;
  }

  const phaseGoalButton = target.closest(".phase-goal-start");
  if (phaseGoalButton) {
    confirmPhaseGoal();
    return;
  }

  const choiceButton = target.closest(".choice");
  if (choiceButton) {
    chooseOption(choiceButton.dataset.option);
    return;
  }

  const continueButton = target.closest(".continue-button");
  if (continueButton) {
    continueAfterResolution();
    return;
  }

  const restartButton = target.closest(".restart");
  if (restartButton) {
    restart();
  }
}

function getPressureResourceTone(value, warnAt, dangerAt) {
  if (value >= dangerAt) return "danger";
  if (value >= warnAt) return "warn";
  return "stable";
}

function getTimeResourceTone(value) {
  if (value <= 30) return "danger";
  if (value <= 60) return "warn";
  return "stable";
}

function getTokenResourceTone(value) {
  if (value <= 20) return "danger";
  if (value <= 50) return "warn";
  return "stable";
}

function getResourceBarState() {
  const timeRemaining = Math.max(0, game.caps.time - state.time);
  const timeFill = game.caps.time > 0
    ? clamp(Math.round((timeRemaining / game.caps.time) * 100), 0, 100)
    : 0;
  const tokenRemaining = getTokenRemaining();
  const tokenFill = game.caps.token > 0
    ? clamp(Math.round((tokenRemaining / game.caps.token) * 100), 0, 100)
    : 0;
  const riskValue = game.caps.risk > 0
    ? Math.round((state.risk / game.caps.risk) * 100)
    : 0;

  return [
    {
      key: "time",
      label: "Time",
      value: timeRemaining,
      fill: timeFill,
      helper: "เวลาเหลือ",
      tone: getTimeResourceTone(timeFill),
    },
    {
      key: "token",
      label: "Token",
      value: tokenRemaining,
      fill: tokenFill,
      helper: "AI budget เหลือ",
      tone: getTokenResourceTone(tokenFill),
    },
    {
      key: "risk",
      label: "Risk",
      value: riskValue,
      fill: clamp(riskValue, 0, 100),
      helper: "เสี่ยงพัง",
      tone: getPressureResourceTone(riskValue, 50, 80),
    },
  ];
}

function resourceBarMarkup() {
  const resources = getResourceBarState();
  return `
    <div class="resource-bar" aria-label="Resource Bar">
      ${resources
        .map(
          (resource) => `
            <div class="resource-meter resource-meter--${resource.key} resource-meter--${resource.tone}" aria-label="${resource.label}: ${resource.value}">
              <span class="resource-meter__topline">
                <span class="resource-meter__label">${resource.label}</span>
                <strong class="resource-meter__value">${resource.value}</strong>
              </span>
              <span class="resource-meter__track" aria-hidden="true">
                <span class="resource-meter__fill" style="width: ${resource.fill}%;"></span>
              </span>
              <span class="resource-meter__helper">${resource.helper}</span>
            </div>
          `,
        )
        .join("")}
      </div>
  `;
}

function selectedSkillHandMarkup() {
  const selectedSkills = state.skills.map((skillId) => getSkill(skillId)).filter(Boolean);
  if (!selectedSkills.length) return "";

  return `
    <section class="superpower-hand" aria-label="Superpower Hand">
      <div class="superpower-hand__label">
        <span>Superpower Hand</span>
        <strong>ถืออยู่ ${selectedSkills.length}/${game.maxSkills}</strong>
      </div>
      <div class="superpower-hand__cards">
        ${selectedSkills.map((skill) => `
          <button class="superpower-hand__card" type="button" data-skill="${escapeHtml(skill.id)}" aria-label="ดูรายละเอียด ${escapeHtml(skill.name)}">
            <span class="superpower-hand__icon">${escapeHtml(skill.icon)}</span>
            <span class="superpower-hand__meta">
              <span>${escapeHtml(skill.type)}</span>
              <strong>${escapeHtml(skill.name)}</strong>
            </span>
            <span class="superpower-hand__ready">พร้อมใช้</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function getTotalPhaseCount() {
  return game.steps.length + 1;
}

function phaseMarkup(currentIndex) {
  const labels = [...game.steps.map((step) => step.title), "Report"];
  return labels
    .map((label, index) => {
      const isReport = index === labels.length - 1;
      const stateClass =
        state.screen === "result" && isReport
          ? "current"
          : !isReport && index < currentIndex
            ? "done"
            : !isReport && index === currentIndex && state.screen !== "result"
              ? "current"
              : "upcoming";

      return `
        <li class="phase ${stateClass}">
          <span class="phase-tab">
            <span class="phase-num">${index + 1}</span>
            <span class="phase-copy">
              <span class="phase-label">Phase ${index + 1}</span>
              <span class="phase-text">${label}</span>
            </span>
          </span>
          ${index < labels.length - 1 ? '<span class="phase-link" aria-hidden="true"></span>' : ""}
        </li>
      `;
    })
    .join("");
}

function titleGlyphMarkup() {
  return `
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path fill="#fff4b8" d="M36 5 17 34h13l-2 25 19-30H34z"></path>
      <path fill="#e4aa18" d="M34 11 22 30h11l-2 15 12-19H32z"></path>
      <path fill="#8a5408" d="M35 3 15 34h13l-2 27 23-36H36zm-15 29 15-23h8L30 29h10L31 52l2-20z"></path>
    </svg>
  `;
}

function eventIconMarkup() {
  return `
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path fill="#7a4100" d="M32 4 56 18v16c0 11-8 21-24 26C16 55 8 45 8 34V18z"></path>
      <path fill="#f8cb52" d="M32 10 50 21v13c0 9-6 17-18 21C20 51 14 43 14 34V21z"></path>
      <rect x="29" y="20" width="6" height="18" fill="#7a4100"></rect>
      <rect x="29" y="42" width="6" height="6" fill="#7a4100"></rect>
    </svg>
  `;
}

function heroMarkup() {
  return `
    <header class="start-scene">
      <div class="start-sky" aria-hidden="true">
        <span class="cloud cloud--one"></span>
        <span class="cloud cloud--two"></span>
      </div>
      <div class="start-board">
        <div class="start-emblem">${titleGlyphMarkup()}</div>
        <p class="start-kicker">Project Survival Game</p>
        <h1 class="start-logo" aria-label="SUPERPOWER WORKFLOW">
          <span>SUPER</span><span>POWER</span>
          <strong>WORKFLOW</strong>
        </h1>
        <div class="start-stage">
          <span>v0.6</span>
          <strong>${game.stage}</strong>
        </div>
        <p class="start-copy">${game.intro}</p>
        <button class="hero-start-btn restart" type="button">เริ่มภารกิจ</button>
      </div>
      <div class="start-ground" aria-hidden="true"></div>
    </header>
  `;
}

function tagMarkup(tags) {
  return tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
}

function skillCardMarkup(skill) {
  const selected = state.skills.includes(skill.id);
  const locked = !selected && state.skills.length >= game.maxSkills;
  const summary = skill.summary || skill.description;
  return `
    <button class="skill-card inventory-slot ${selected ? "is-selected" : ""} ${locked ? "is-locked" : ""}" type="button" data-skill="${escapeHtml(skill.id)}" aria-pressed="${selected ? "true" : "false"}">
      <span class="inventory-slot__check" aria-hidden="true">${selected ? "&#10003;" : ""}</span>
      <span class="inventory-slot__icon">${escapeHtml(skill.icon)}</span>
      <span class="inventory-slot__type">${escapeHtml(skill.type)}</span>
      <strong>${escapeHtml(skill.name)}</strong>
      <span class="inventory-slot__copy">${escapeHtml(summary)}</span>
      <span class="inventory-slot__detail">Details</span>
    </button>
  `;
}

function skillDetailPopupMarkup(skill, allowEdit = state.screen === "setup") {
  const selected = state.skills.includes(skill.id);
  const locked = !selected && state.skills.length >= game.maxSkills;
  const actionLabel = selected ? "ถอดสกิล" : locked ? "เลือกครบ 3 ใบแล้ว" : "เลือกสกิล";
  const summary = skill.summary || skill.description;
  const teaches = skill.teaches
    ? `
      <div class="skill-detail-section">
        <p class="skill-detail-label">สอนอะไร</p>
        <p>${escapeHtml(skill.teaches)}</p>
      </div>
    `
    : "";
  const warning = skill.warning
    ? `
      <div class="skill-detail-warning">
        <p class="skill-detail-label">ข้อควรระวัง</p>
        <p>${escapeHtml(skill.warning)}</p>
      </div>
    `
    : "";

  return `
    <div class="hero-popup-overlay skill-detail-overlay">
      <div class="hero-popup-content skill-detail-popup">
        <section class="brief-card skill-detail-card">
          <p class="brief-label">Skill Detail</p>
          <div class="skill-detail-head">
            <span class="skill-detail-icon">${escapeHtml(skill.icon)}</span>
            <span class="skill-detail-meta">
              <span class="skill-detail-type">${escapeHtml(skill.type)}</span>
              <strong>${escapeHtml(skill.name)}</strong>
            </span>
          </div>
          <p class="skill-detail-summary">${escapeHtml(summary)}</p>
          <div class="skill-detail-section">
            <p class="skill-detail-label">รายละเอียด</p>
            <p>${escapeHtml(skill.description)}</p>
          </div>
          ${teaches}
          ${warning}
          <div class="skill-detail-actions">
            ${allowEdit ? `<button class="restart skill-detail-toggle" type="button" data-skill="${escapeHtml(skill.id)}" ${locked ? "disabled" : ""}>${actionLabel}</button>` : ""}
            <button class="restart skill-detail-close" type="button">ปิด</button>
          </div>
        </section>
      </div>
    </div>
  `;
}

function choiceCardMarkup(option, index) {
  const isSkill = Boolean(option.skill);
  const isSynergy = Boolean(option.requires);
  const meaning = getChoiceMeaning(option);
  const visibleTags = option.tags ? option.tags.slice(0, 2) : [];
  const hiddenTagCount = option.tags ? Math.max(0, option.tags.length - visibleTags.length) : 0;
  const unlock = isSkill
    ? `Workflow Tool: ${getSkill(option.skill)?.name}`
    : isSynergy
      ? `Combo Tool: ${option.requires.map((req) => getSkill(req)?.name).join(" + ")}`
      : "";
  const visualTone = isSynergy ? "combo" : isSkill ? "skill" : "base";

  return `
    <button class="choice action-slot action-slot--${visualTone} ${isSkill ? "choice--skill" : ""} ${isSynergy ? "choice--synergy" : ""}" data-option="${option.id}" style="--choice-delay:${index * 65}ms">
      <span class="action-slot__body">
        <strong class="action-slot__title">${option.label}</strong>
        <span class="action-slot__helper">${option.helper || ""}</span>
        <span class="action-slot__meaning">
          <span><b>แก้ปัญหา</b> ${escapeHtml(meaning.solves)}</span>
        </span>
        <span class="action-slot__tags">
          ${visibleTags.length ? tagMarkup(visibleTags) : ""}
          ${hiddenTagCount ? `<span>+${hiddenTagCount}</span>` : ""}
        </span>
      </span>
      <span class="action-slot__footer">
        ${unlock ? `<span class="action-slot__unlock">${unlock}</span>` : ""}
        <span class="action-slot__tradeoff">${option.tradeoff}</span>
        <span class="action-slot__select">Select</span>
      </span>
    </button>
  `;
}

function briefMarkup(step, isEmergency = false, isChaos = false) {
  const label = isEmergency ? "Emergency Brief" : isChaos ? "Issue Brief" : "Brief";

  return `
    <div class="brief-card">
      <p class="brief-label">${label}</p>
      <div class="brief-copy">
        ${step.briefing.map((line) => `<p>${line}</p>`).join("")}
      </div>
    </div>
  `;
}

function renderSkillDetailPopup() {
  if (!state.activeSkillDetail) return;

  const skill = getSkill(state.activeSkillDetail);
  if (!skill) {
    state.activeSkillDetail = null;
    return;
  }

  root.insertAdjacentHTML("beforeend", skillDetailPopupMarkup(skill));
}

function renderSetup() {
  root.innerHTML = `
    <main class="app">
      <section class="${shellClass()}">
        <section class="phasebar" style="display: flex; align-items: center; justify-content: space-between;">
          <ol class="phases" style="flex: 1;">${phaseMarkup(0)}</ol>
          ${soundButtonMarkup()}
        </section>
        <section class="playfield">
          <section class="panel setup-panel">
            <div class="panel-head">
              <p class="phase-tag">Superpower Draft</p>
              <div class="panel-title-row">
                <h2 class="phase-title">เลือก Superpowers ${game.maxSkills} ใบ</h2>
                <span class="phase-badge" aria-hidden="true">${eventIconMarkup()}</span>
              </div>
              <div class="phase-body">
                <p>คลิกการ์ดเพื่อดูรายละเอียด แล้วเลือกให้ครบ ${game.maxSkills} ใบก่อนเริ่ม Brainstorm</p>
              </div>
            </div>

            <div class="skill-grid inventory-grid">
              ${game.skills.map((skill) => skillCardMarkup(skill)).join("")}
            </div>

            <div class="setup-actions">
              <p class="draft-count">เลือกแล้ว ${state.skills.length} / ${game.maxSkills}</p>
              <button class="restart start-mission" ${state.skills.length === game.maxSkills ? "" : "disabled"}>Start Mission</button>
            </div>
          </section>
        </section>
      </section>
    </main>
  `;
}

function renderTitle() {
  root.innerHTML = `
    <main class="app">
      ${heroMarkup()}
    </main>
  `;
}

function renderStep(step, isEmergency = false) {
  const options = getAvailableOptions(step);
  const isChaos = !!state.activeChaos;
  const issueLabel = `${step.title} Issue`;

  const eventContent = isChaos ? `
    <section class="event event--active event--issue">
      <div class="event-label">${issueLabel}</div>
      <div class="event-icon">${eventIconMarkup()}</div>
      <div class="event-copyblock">
        <h3 class="event-title">${state.activeChaos.title}</h3>
        <p class="event-copy">"${state.activeChaos.copy}"</p>
      </div>
      <div class="event-impact">
        <small>Pressure</small>
        <strong>${state.activeChaos.danger}</strong>
      </div>
    </section>
  ` : isEmergency && step.event ? `
    <section class="event event--active event--chaos">
      <div class="event-label">EMERGENCY</div>
      <div class="event-icon">${eventIconMarkup()}</div>
      <div class="event-copyblock">
        <h3 class="event-title">${step.event.title}</h3>
        <p class="event-copy">"${step.event.copy}"</p>
      </div>
      <div class="event-impact">
        <small>Danger</small>
        <strong>${step.event.danger}</strong>
      </div>
    </section>
  ` : `
    <div class="progress-bar-container">
      <div class="progress-bar-header">
        <span>Phase Progress</span>
        <span>${state.progress}% / ${step.requiredProgress}%</span>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width: ${state.progress}%;"></div>
      </div>
    </div>
  `;

  root.innerHTML = `
    <main class="app">
      <section class="${shellClass()}">
        <section class="phasebar" style="display: flex; align-items: center; justify-content: space-between;">
          <ol class="phases" style="flex: 1;">${phaseMarkup(state.index)}</ol>
          ${soundButtonMarkup()}
        </section>
        <section class="playfield">
          <section class="panel ${isEmergency ? "panel--hazard panel--emergency" : isChaos ? "panel--hazard panel--issue" : ""}">
            <div class="panel-head ${isEmergency ? "panel-head--emergency" : isChaos ? "panel-head--issue" : ""}">
              <p class="phase-tag">${isEmergency ? "EMERGENCY" : isChaos ? "URGENT ISSUE" : `Phase ${state.index + 1} of ${getTotalPhaseCount()}`}</p>
              <div class="panel-title-row">
                <h2 class="phase-title">${step.title}</h2>
                <span class="phase-badge" aria-hidden="true">${eventIconMarkup()}</span>
              </div>
              ${briefMarkup(step, isEmergency, isChaos)}
            </div>

            ${resourceBarMarkup()}
            ${selectedSkillHandMarkup()}
            ${eventContent}

            <div class="choices choices--adaptive action-grid">
              ${options.map((option, index) => choiceCardMarkup(option, index)).join("")}
            </div>

            <p class="panel-footer"></p>
          </section>
        </section>
      </section>
    </main>
  `;
}

function resolutionChoiceMeaningMarkup(result) {
  if (!result?.purpose && !result?.solves && !result?.misses) return "";

  return `
              <div class="resolution-card resolution-card--meaning">
                <p class="mini-label">Choice Meaning</p>
                ${result.purpose ? `<p><strong>สำคัญเพราะ</strong> ${escapeHtml(result.purpose)}</p>` : ""}
                ${result.solves ? `<p><strong>แก้ปัญหา</strong> ${escapeHtml(result.solves)}</p>` : ""}
                ${result.misses ? `<p><strong>ยังพลาด</strong> ${escapeHtml(result.misses)}</p>` : ""}
              </div>
  `;
}

function resolutionHintMarkup(result) {
  if (!result?.hint) return "";

  return `
              <div class="resolution-card resolution-card--hint">
                <p class="mini-label">In-Play Hint</p>
                <p>${escapeHtml(result.hint)}</p>
              </div>
  `;
}

function renderResolution() {
  const result = state.resolution;
  if (!result) return;
  const resolutionLabel = result.isRandomModifier ? "External Signal" : result.isMicroEvent ? "System Signal" : "Decision Result";
  const resolutionToneClass = result.isRandomModifier
    ? `resolution-panel--random resolution-panel--${result.reaction?.tone || "warn"}`
    : result.countered ? "resolution-panel--safe" : "resolution-panel--warn";

  root.innerHTML = `
    <main class="app">
      <section class="${shellClass()}">
        <section class="phasebar" style="display: flex; align-items: center; justify-content: space-between;">
          <ol class="phases" style="flex: 1;">${phaseMarkup(state.index)}</ol>
          ${soundButtonMarkup()}
        </section>
        <section class="playfield">
          <section class="panel resolution-panel ${resolutionToneClass}">
            <div class="panel-head">
              <p class="phase-tag">${resolutionLabel}</p>
              <div class="panel-title-row">
                <h2 class="phase-title">${result.optionLabel}</h2>
              </div>
            </div>

            ${resourceBarMarkup()}
            ${selectedSkillHandMarkup()}
            <div class="resolution-layout">
              <div class="resolution-card reaction-card reaction-card--${result.reaction.tone} resolution-card--primary">
                <p class="mini-label">Reaction</p>
                <h3>${result.reaction.title}</h3>
                <p>${result.reaction.copy}</p>
              </div>

              <div class="resolution-card resolution-card--event">
                <p class="mini-label">Event</p>
                <h3>${result.eventTitle}</h3>
                <ul>
                  ${result.lines.map((line) => `<li>${line}</li>`).join("")}
                </ul>
              </div>

              <div class="resolution-card">
                <p class="mini-label">What happened</p>
                <p>${result.outcome}</p>
                <div class="choice-tags resolution-tags">${tagMarkup(result.tags)}</div>
              </div>

              <div class="resolution-card resolution-card--lesson">
                <p class="mini-label">Lesson</p>
                <p>${result.lesson}</p>
              </div>
              ${resolutionHintMarkup(result)}
              ${resolutionChoiceMeaningMarkup(result)}
            </div>

            <button class="restart continue-button">Continue</button>
          </section>
        </section>
      </section>
    </main>
  `;
}

function getTitleBadge({ failed, protectedEvents, riskyChoices, skillUses, problemsTriggered, overBudget, overtime, workflowScore }) {
  const tokenSpent = getTokenSpent();
  const masterReady =
    workflowScore >= 86
    && !failed
    && !overBudget
    && !overtime
    && state.risk <= 3
    && state.quality >= 12
    && riskyChoices <= 1
    && skillUses >= 3;

  if (masterReady) {
    return {
      label: "Workflow Master",
      helper: "คุณใช้ guardrail หลายชั้นจน AI กลายเป็นแรงเสริม ไม่ใช่แหล่งความเสี่ยง",
    };
  }

  if (problemsTriggered.includes("Hardcoded Secrets Leak") && state.risk >= 6) {
    return {
      label: "Security Oops",
      helper: "Secret หรือ security risk โผล่ระหว่างทาง และ workflow ยังจับได้ไม่แน่นพอ",
    };
  }

  if (problemsTriggered.includes("Shadow IT Discovery") && (failed || state.risk >= 6)) {
    return {
      label: "Shadow IT Casualty",
      helper: "โปรเจกต์เร็วมาก แต่หลักฐานและมาตรฐานยังไม่พอรับการตรวจจากองค์กร",
    };
  }

  if (problemsTriggered.includes("Reprompting Loop Trap") && state.time >= 12) {
    return {
      label: "Debugging Victim",
      helper: "ทีมเสียแรงกับการ reprompt ซ้ำจน debugging กลายเป็น rework",
    };
  }

  if (!failed && !overBudget && !overtime && skillUses >= 3 && tokenSpent >= 7 && state.risk <= 5) {
    return {
      label: "AI Conductor",
      helper: "คุณใช้หลายเครื่องมือได้เร็ว แต่ยังมีคนคุมทิศทางและรวมงานให้เข้ากัน",
    };
  }

  if (state.time <= 8 && riskyChoices >= 2) {
    return {
      label: "เดอะแฟลชงานหยาบ",
      helper: "คุณประหยัดเวลาได้จริง แต่จ่ายด้วยความเสี่ยงและงานแก้ท้ายเกม",
    };
  }

  if (state.time <= 10 && state.risk >= 6) {
    return {
      label: "Fast but Fragile",
      helper: "คุณไปถึงเส้นชัยเร็วมาก แต่โปรเจกต์ยังมีรอยร้าวที่พร้อมแตก",
    };
  }

  if (tokenSpent >= 12) {
    return {
      label: "AI Simp",
      helper: "คุณพึ่ง AI หนักจนทุกคำตอบต้องมีคนช่วยคัดกรองซ้ำ",
    };
  }

  if (failed) {
    return {
      label: "Victim of Chaos",
      helper: "ความเร็วชนะ workflow ชั่วคราว แต่ความเสียหายตามทันตอนส่งงาน",
    };
  }

  if (state.emergencyTriggered) {
    return {
      label: "Project Survivor",
      helper: "โปรเจกต์เกือบหลุดมือ แต่คุณยังดับไฟและพากลับเข้าเส้นทางได้",
    };
  }

  return {
    label: "Project Survivor",
    helper: "คุณส่งงานรอดโดยยังมีพื้นที่ให้ปรับ workflow ให้คมขึ้นในรอบต่อไป",
  };
}

function getWorkflowPattern({ failed, protectedEvents, riskyChoices, skillUses }) {
  const tokenSpent = getTokenSpent();

  if (failed && riskyChoices >= 2) {
    return {
      label: "Risk-heavy Run",
      helper: "เลือกทางลัดหลายครั้งจน risk สะสมเกิน workflow จะรับไหว",
    };
  }

  if (protectedEvents >= 2 && riskyChoices <= 1 && getTokenDebt() === 0) {
    return {
      label: "Guarded Run",
      helper: "ใช้ guardrail และ review รับมือเหตุเสี่ยงได้ดี",
    };
  }

  if (skillUses >= 3 && tokenSpent >= 9) {
    return {
      label: "Tool-heavy Run",
      helper: "ใช้เครื่องมือช่วยเยอะ งานเดินเร็ว แต่ AI budget ตึง",
    };
  }

  if (state.time <= 8 && riskyChoices >= 2) {
    return {
      label: "Fast but Fragile",
      helper: "ไปเร็ว แต่มีความเสี่ยงซ่อนอยู่หลายจุด",
    };
  }

  return {
    label: "Balanced Run",
    helper: "คุมเวลา เครื่องมือ และความเสี่ยงได้ค่อนข้างสมดุล",
  };
}

function getScoreVerdict(score, failed, pressure = {}) {
  const tier = getScoreTier(score);
  if (pressure.overBudget && pressure.overtime) {
    return "Workflow พอพาโปรเจกต์รอดได้ แต่ใช้ทั้งเวลาและ AI budget เกินแผน ควรลดการ reprompt และเลือก guardrail ที่คุ้มกว่า";
  }
  if (pressure.overBudget) {
    return "คุม risk ได้บางส่วน แต่ใช้ AI หนักเกินไป ควรกำหนดขอบเขต prompt และใช้ tool เฉพาะจุด";
  }
  if (pressure.overtime) {
    return "คุณภาพงานดีขึ้น แต่ deadline ถูกใช้เกินแผน ควรตัด scope และ review ให้เร็วขึ้น";
  }
  if (state.risk >= game.caps.risk * 0.8) {
    return "Risk ยังสูงเกินไป ควรกลับไปย้ำ Spec, guardrail และ Review ก่อนส่งงาน";
  }
  if (failed && score <= 50) return tier.helper;
  return tier.helper;
}

function getScoreTier(score) {
  if (score <= 30) {
    return {
      label: "Workflow Breakdown",
      range: "0-30",
      tone: "danger",
      helper: "แย่ตรง risk หรือ quality พังจน workflow รับไม่ทัน",
      focus: "ควรโฟกัส Spec + Review ก่อนใช้ AI เร่งงานต่อ",
    };
  }

  if (score <= 50) {
    return {
      label: "Barely Survived",
      range: "31-50",
      tone: "danger",
      helper: "รอดแบบมีแผล ทางลัดเริ่มชนะ workflow หลายจุด",
      focus: "ควรลดทางลัด เพิ่ม guardrail และตรวจเทียบ requirement ให้เร็วขึ้น",
    };
  }

  if (score <= 70) {
    return {
      label: "Working but Fragile",
      range: "51-70",
      tone: "warn",
      helper: "เริ่มคุมเกมได้ แต่เวลา, token หรือ risk ยังไม่สมดุล",
      focus: "ควรใช้ AI แบบมีขอบเขต และเลือก tool/check ให้ตรงปัญหา",
    };
  }

  if (score <= 85) {
    return {
      label: "Solid Workflow",
      range: "71-85",
      tone: "safe",
      helper: "เล่นดี ใช้ workflow ถูกจังหวะ โปรเจกต์ไม่หลุดมือ",
      focus: "ควร refine tool usage และเก็บหลักฐาน review ให้แน่นขึ้น",
    };
  }

  return {
    label: "Workflow Master",
    range: "86-100",
    tone: "safe",
    helper: "เก่งมาก คุม AI, risk, review และ delivery ได้ครบ",
    focus: "รักษา workflow นี้ไว้ แล้วใช้เป็น baseline สำหรับ stage ที่ยากขึ้น",
  };
}

function getScoreCeilingDetails({ failed, overBudget, overtime, riskyChoices, skillUses }) {
  const tokenDebt = getTokenDebt();
  const timeOverflow = Math.max(0, state.time - game.caps.time);
  let ceiling = failed ? 50 : 100;
  const reasons = [];

  const capScore = (value, reason) => {
    if (value < ceiling) {
      ceiling = value;
    }
    if (reason) reasons.push(reason);
  };

  if (failed) {
    reasons.push("Failed/shipped damaged route caps score at 50");
  }

  if (state.risk >= 8) {
    capScore(70, "Risk >= 8 caps score at 70");
  } else if (state.risk >= 6) {
    capScore(82, "Risk >= 6 caps score at 82");
  }

  if (state.risk >= game.caps.risk) {
    capScore(45, "Risk reached the project failure cap");
  } else if (state.risk >= game.caps.risk * 0.8) {
    capScore(68, "Risk reached critical project pressure");
  }

  if (overBudget && overtime) {
    capScore(76, "AI budget and deadline both exceeded");
  } else if (overBudget || overtime) {
    capScore(84, overBudget ? "Token debt caps score at 84" : "Overtime caps score at 84");
  }

  if (tokenDebt >= 10) {
    capScore(68, "Token debt 10+ caps score at 68");
  } else if (tokenDebt >= 5) {
    capScore(76, "Token debt 5-9 caps score at 76");
  } else if (tokenDebt >= 1) {
    capScore(84, "Token debt 1-4 caps score at 84");
  }

  if (timeOverflow >= Math.ceil(game.caps.time * 0.6)) {
    capScore(68, "Heavy overtime caps score at 68");
  } else if (timeOverflow >= Math.ceil(game.caps.time * 0.25)) {
    capScore(76, "Moderate overtime caps score at 76");
  } else if (timeOverflow >= 3) {
    capScore(84, "Light overtime caps score at 84");
  }

  if (state.quality < 6) {
    capScore(80, "Quality < 6 caps score at 80");
  }

  if (riskyChoices >= 3) {
    capScore(75, "3+ risky choices caps score at 75");
  }

  const masterReady =
    !failed
    && !overBudget
    && !overtime
    && state.risk <= 3
    && state.quality >= 12
    && tokenDebt === 0
    && riskyChoices <= 1
    && skillUses >= 3;

  if (!masterReady) {
    capScore(85, "Workflow Master requires risk <= 3, quality >= 12, no token debt, <= 1 risky choice, and 3+ skill uses");
  }

  return {
    ceiling,
    reasons: [...new Set(reasons)],
  };
}

function getScoreCeiling(args) {
  return getScoreCeilingDetails(args).ceiling;
}

function calculateWorkflowScore({ failed, protectedEvents, riskyChoices, skillUses, overBudget, overtime }) {
  const positiveQuality = Math.max(0, state.quality);
  const qualityScore = Math.min(positiveQuality, 18) * 2.5 + Math.max(0, positiveQuality - 18) * 0.35 + Math.min(0, state.quality) * 4;
  const cappedRiskPenalty = Math.min(state.risk, game.caps.risk) * 4.3;
  const overflowRiskPenalty = Math.max(0, state.risk - game.caps.risk) * 2.5;
  const tokenSpent = getTokenSpent();
  const tokenDebt = getTokenDebt();
  const timeOverflow = Math.max(0, state.time - game.caps.time);
  const tokenPressurePenalty = tokenDebt * 3 + Math.max(0, tokenSpent - game.caps.token * 0.75) * 0.55;
  const timePressurePenalty = timeOverflow * 3 + Math.max(0, state.time - game.caps.time * 0.75) * 0.8;
  const rawScore =
    66
    + qualityScore
    + Math.min(protectedEvents, 3) * 5
    + skillUses * 2.5
    - cappedRiskPenalty
    - overflowRiskPenalty
    - riskyChoices * 7
    - tokenPressurePenalty
    - timePressurePenalty
    + (failed ? -12 : 6);

  const minimumReadableScore = failed ? 18 : 24;
  const cappedScore = Math.min(rawScore, getScoreCeiling({ failed, overBudget, overtime, riskyChoices, skillUses }));
  return clamp(Math.round(cappedScore), minimumReadableScore, 100);
}

function getFinalResult() {
  const protectedEvents = state.history.filter((item) => item.countered).length;
  const riskyChoices = state.history.filter((item) => item.effects.risk >= 3).length;
  const skillUses = state.history.filter((item) => item.skillName).length;
  const draftedSuperpowers = state.skills.map((skillId) => getSkill(skillId)?.name).filter(Boolean);
  const superpowersUsed = [...new Set(state.history.map((item) => item.skillName).filter(Boolean))];
  const problemsTriggered = [...new Set(state.history.map((item) => item.problem).filter(Boolean))];
  const tokenSpent = getTokenSpent();
  const tokenRemaining = getTokenRemaining();
  const tokenDebt = getTokenDebt();
  const overBudget = tokenDebt > 0;
  const overtime = state.time > game.caps.time;
  const phaseSummaries = state.phaseSummaries || [];
  const randomModifiers = state.randomModifiersTriggered || [];
  const shippedRiskyShortcut = state.history.some((item) => item.optionId === "ship_now") && state.risk >= 6;
  const failed = state.risk >= game.caps.risk || state.quality < 1 || shippedRiskyShortcut;

  const title = failed ? "Project Shipped With Damage" : "Project Survived";
  const summary = failed
    ? "งานอาจดูเหมือนเสร็จ แต่ workflow ป้องกันความเสี่ยงไม่พอ ทำให้ bug/rework หลุดถึงช่วงส่งงาน"
    : "ทีมใช้ workflow ช่วยคุม AI ได้ดีพอ โปรเจกต์ส่งได้โดยไม่พังตอนท้าย";

  const lesson = failed
    ? "บทเรียนหลัก: AI ช่วยให้เร็วขึ้น แต่ถ้าไม่มี Spec, Check และ Review ความเร็วจะเปลี่ยนเป็น rework"
    : "บทเรียนหลัก: Workflow ที่ดีไม่ได้ทำให้งานช้าลงเฉย ๆ แต่มันซื้อความมั่นใจและลดความเสียหายตอนท้าย";

  const workflowScore = calculateWorkflowScore({ failed, protectedEvents, riskyChoices, skillUses, overBudget, overtime });
  const scoreTier = getScoreTier(workflowScore);
  const scoreCeiling = getScoreCeilingDetails({ failed, overBudget, overtime, riskyChoices, skillUses });

  return {
    failed,
    title,
    summary,
    lesson,
    protectedEvents,
    riskyChoices,
    skillUses,
    overBudget,
    overtime,
    tokenSpent,
    tokenRemaining,
    tokenDebt,
    workflowScore,
    scoreVerdict: getScoreVerdict(workflowScore, failed, { overBudget, overtime }),
    scoreTier,
    scoreCeilingReasons: scoreCeiling.reasons,
    titleBadge: getTitleBadge({ failed, protectedEvents, riskyChoices, skillUses, problemsTriggered, overBudget, overtime, workflowScore }),
    workflowPattern: getWorkflowPattern({ failed, protectedEvents, riskyChoices, skillUses }),
    draftedSuperpowers,
    superpowersUsed,
    problemsTriggered,
    randomModifiers,
    randomModifierBadge: randomModifiers.length
      ? {
        label: "Signal Run",
        helper: `External signals triggered ${randomModifiers.length} time${randomModifiers.length > 1 ? "s" : ""}`,
      }
      : null,
    phaseSummaries,
  };
}

function reportCardMarkup(label, value, helper) {
  return `
    <div class="report-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <p>${helper}</p>
    </div>
  `;
}

function getUsageTone(value, cap) {
  if (value > cap) return "danger";
  if (value >= cap * 0.75) return "warn";
  return "safe";
}

function getRiskTone(value) {
  if (value >= 8) return "danger";
  if (value >= 5) return "warn";
  return "safe";
}

function reportSignalMarkup({ icon, label, value, helper, tone }) {
  return `
    <article class="report-signal report-signal--${tone}">
      <span class="report-signal__icon">${icon}</span>
      <span class="report-signal__label">${label}</span>
      <strong>${value}</strong>
      <p>${helper}</p>
    </article>
  `;
}

function reportEvidenceMarkup(label, value, helper, tone = "neutral") {
  return `
    <article class="report-evidence report-evidence--${tone}">
      <span>${label}</span>
      <strong>${value}</strong>
      <p>${helper}</p>
    </article>
  `;
}

function reportListMarkup(label, items, emptyText) {
  const safeItems = items.length ? items : [emptyText];
  return `
    <article class="report-list-card">
      <span class="mini-label">${label}</span>
      <ul>
        ${safeItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </article>
  `;
}

function phaseLearningsMarkup(summaries) {
  const items = summaries.map((summary) => `${summary.phase}: ${summary.grade.label} - ${summary.focus}`);
  return reportListMarkup("Phase Learnings", items, "ยังไม่มี phase learning ถูกบันทึก");
}

function randomModifiersMarkup(modifiers) {
  const items = modifiers.map((modifier) => `${modifier.phase}: ${modifier.title} (${formatRandomEffectDelta(modifier.effects)})`);
  return reportListMarkup("Random Modifiers", items, "รอบนี้ไม่มี External Signal แทรก");
}

function scoreSlotMarkup(score, verdict) {
  const digits = String(score).padStart(3, "0").split("");
  return `
    <article class="score-slot" data-score="${score}">
      <span class="score-slot__label">Workflow Score</span>
      <div class="score-slot__reels" aria-label="Workflow Score ${score} out of 100">
        ${digits.map((digit) => `<span class="score-slot__digit" data-final="${digit}">0</span>`).join("")}
        <span class="score-slot__max">/100</span>
      </div>
      <p>${verdict}</p>
    </article>
  `;
}

function scoreTierMarkup(tier) {
  return `
    <article class="score-tier score-tier--${tier.tone}">
      <span class="score-tier__range">${tier.range}</span>
      <strong>${tier.label}</strong>
      <p>${tier.helper}</p>
      <em>${tier.focus}</em>
    </article>
  `;
}

function animateScoreSlot() {
  const scoreSlot = root.querySelector(".score-slot");
  if (!scoreSlot) return;

  const score = Number(scoreSlot.dataset.score || 0);
  const digits = scoreSlot.querySelectorAll(".score-slot__digit");
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const setDigits = (value) => {
    String(value).padStart(3, "0").split("").forEach((digit, index) => {
      if (digits[index]) digits[index].textContent = digit;
    });
  };

  if (prefersReduced) {
    setDigits(score);
    return;
  }

  const duration = 920;
  const start = performance.now();
  const tick = (now) => {
    const progress = clamp((now - start) / duration, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const spinNoise = progress < 0.82 ? Math.floor(now / 48) % 10 : 0;
    const value = progress < 0.82 ? Math.min(100, Math.floor(score * eased) + spinNoise) : Math.round(score * eased);
    setDigits(clamp(value, 0, score));

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      setDigits(score);
      scoreSlot.classList.add("is-settled");
    }
  };

  requestAnimationFrame(tick);
}

function renderResult() {
  const result = getFinalResult();
  const timeTone = getUsageTone(state.time, game.caps.time);
  const tokenFill = game.caps.token > 0
    ? clamp(Math.round((result.tokenRemaining / game.caps.token) * 100), 0, 100)
    : 0;
  const tokenTone = result.overBudget ? "danger" : getTokenResourceTone(tokenFill);
  const riskTone = getRiskTone(state.risk);
  const tokenHelper = result.overBudget
    ? `AI budget เกิน ${result.tokenDebt}`
    : "AI budget ยังเหลือให้คุมงาน";

  root.innerHTML = `
    <main class="app">
      <section class="${shellClass()}">
        <section class="phasebar" style="display: flex; align-items: center; justify-content: space-between;">
          <ol class="phases" style="flex: 1;">${phaseMarkup(game.steps.length)}</ol>
          ${soundButtonMarkup()}
        </section>
        <section class="playfield">
          <section class="result mission-report ${result.failed ? "fail" : ""}">
            <div class="mission-report__header">
              <p class="phase-tag">Workflow Report</p>
              <span class="title-badge">${result.titleBadge.label}</span>
              ${result.randomModifierBadge ? `<span class="title-badge title-badge--chaos">${result.randomModifierBadge.label}</span>` : ""}
              <h2 class="result-title">${result.title}</h2>
              <p>${result.summary}</p>
              <p class="title-badge-helper">${result.titleBadge.helper}</p>
              ${result.randomModifierBadge ? `<p class="title-badge-helper title-badge-helper--chaos">${result.randomModifierBadge.helper}</p>` : ""}
            </div>

            <div class="mission-report__body">
              <aside class="mission-report__summary">
                <article class="run-pattern run-pattern--${result.failed ? "danger" : "safe"}">
                  <span class="mini-label">Run Style</span>
                  <strong>${result.workflowPattern.label}</strong>
                  <p>${result.workflowPattern.helper}</p>
                </article>

                ${scoreSlotMarkup(result.workflowScore, result.scoreVerdict)}
                ${scoreTierMarkup(result.scoreTier)}

                <div class="report-signals mission-report__meters">
                  ${reportSignalMarkup({
                    icon: "CLK",
                    label: "Time",
                    value: `${state.time} / ${game.caps.time}`,
                    helper: result.overtime ? "deadline ถูกใช้เกินแผน" : "ยังคุมเวลาได้",
                    tone: timeTone,
                  })}
                  ${reportSignalMarkup({
                  icon: "AI",
                  label: "Token Left",
                  value: `${result.tokenRemaining} / ${game.caps.token}`,
                    helper: tokenHelper,
                    tone: tokenTone,
                  })}
                  ${reportSignalMarkup({
                    icon: "RISK",
                    label: "Risk",
                    value: `${state.risk} / ${game.caps.risk}`,
                    helper: state.risk >= 8 ? "โปรเจกต์เปราะบาง" : "ความเสี่ยงยังไม่แตก",
                    tone: riskTone,
                  })}
                </div>

                <div class="report-evidence-row mission-report__evidence">
                  ${reportEvidenceMarkup("Guardrails", result.protectedEvents, "จำนวน event ที่ workflow กันไว้ได้", result.protectedEvents > 0 ? "safe" : "neutral")}
                  ${reportEvidenceMarkup("Risky Calls", result.riskyChoices, "จำนวนทางลัดที่เพิ่มความเสี่ยง", result.riskyChoices >= 2 ? "danger" : "neutral")}
                  ${reportEvidenceMarkup("Tool Uses", result.skillUses, "จำนวนครั้งที่ใช้ skill ช่วยตัดสินใจ", result.skillUses >= 2 ? "safe" : "neutral")}
                </div>

                <div class="report-lists">
                  ${reportListMarkup("Drafted Superpowers", result.draftedSuperpowers, "ไม่ได้เลือก Superpower")}
                  ${reportListMarkup("Superpowers Used", result.superpowersUsed, "ยังไม่ได้ใช้ Superpower ที่เลือก")}
                  ${reportListMarkup("Problems Triggered", result.problemsTriggered, "ไม่มีปัญหาหลักถูก trigger")}
                  ${reportListMarkup("Score Limits", result.scoreCeilingReasons, "ไม่มี score ceiling เพิ่มเติม")}
                  ${randomModifiersMarkup(result.randomModifiers)}
                  ${phaseLearningsMarkup(result.phaseSummaries)}
                </div>
              </aside>

              <div class="timeline-report mission-report__timeline">
                <h3>Decision Timeline</h3>
                ${state.history
      .map(
        (item, index) => `
                    <article class="timeline-item ${item.isRandomModifier ? "is-random" : item.isMicroEvent ? "is-signal" : item.countered ? "is-safe" : "is-risky"}">
                      <span>${index + 1}</span>
                      <div>
                        <h4>${item.phase}: ${item.optionLabel}</h4>
                        <p>${item.isRandomModifier ? "Random modifier" : item.isMicroEvent ? "สัญญาณโปรเจกต์" : item.countered ? "คุม Event ได้" : "เดินหน้าต่อ แต่มีความเสี่ยงซ่อนอยู่"} — ${item.lesson}</p>
                      </div>
                    </article>
                  `,
      )
      .join("")}
              </div>
            </div>

            <div class="mission-report__footer">
              <p class="result-lesson">${result.lesson}</p>
              <button class="restart">Play again</button>
            </div>
          </section>
        </section>
      </section>
    </main>
  `;
  playResultSound(result.failed);
  animateScoreSlot();
}

function phaseGoalPopupMarkup() {
  if (state.screen !== "step" || state.activeChaos) return "";

  const step = getCurrentStep();
  if (!step?.goal || state.seenPhaseGoals.includes(step.id)) return "";

  const guidance = Array.isArray(step.goal.guidance) ? step.goal.guidance.slice(0, 5) : [];
  return `
    <div class="hero-popup-overlay phase-goal-overlay">
      <section class="phase-goal-popup" role="dialog" aria-modal="true" aria-labelledby="phase-goal-title">
        <div class="phase-goal-popup__head">
          <p class="phase-tag">Phase Goal</p>
          <span>Phase ${state.index + 1} of ${getTotalPhaseCount()} · ${escapeHtml(step.title)}</span>
        </div>
        <h2 id="phase-goal-title">${escapeHtml(step.goal.title)}</h2>
        <p class="phase-goal-popup__copy">${escapeHtml(step.goal.copy)}</p>
        ${guidance.length
          ? `
            <div class="phase-goal-popup__guidance">
              <p class="mini-label">คำแนะนำ</p>
              <ol>
                ${guidance.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ol>
            </div>
          `
          : ""}
        <button class="restart phase-goal-start" type="button">เริ่มต่อไป</button>
      </section>
    </div>
  `;
}

function render() {
  if (state.screen === "title") {
    renderTitle();
  } else if (state.screen === "setup") {
    renderSetup();
  } else if (state.screen === "resolution") {
    renderResolution();
  } else if (state.screen === "result") {
    renderResult();
  } else if (state.screen === "emergency_step") {
    renderStep(game.emergencyStep, true);
  } else if (state.screen === "emergency_resolution") {
    renderResolution();
  } else {
    const step = getCurrentStep();
    if (!step) {
      state.screen = "result";
      renderResult();
    } else {
      renderStep(step);
    }
  }

  if (state.showHeroPopup) {
    const popupHtml = `
      <div class="hero-popup-overlay">
        <div class="hero-popup-content">
          ${heroMarkup()}
        </div>
      </div>
    `;
    root.insertAdjacentHTML("beforeend", popupHtml);
  }

  const phaseGoalPopup = phaseGoalPopupMarkup();
  if (phaseGoalPopup) {
    root.insertAdjacentHTML("beforeend", phaseGoalPopup);
  }

  renderSkillDetailPopup();
}

export function mountLegacyGame(container) {
  root = container;
  state = createInitialState();
  root.addEventListener("click", handleRootClick);
  render();

  return () => {
    if (root === container) {
      root.removeEventListener("click", handleRootClick);
      root.innerHTML = "";
      root = null;
    }
  };
}

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload();
  });
}
