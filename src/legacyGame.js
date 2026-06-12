import { allStagesEN, allStagesTH } from "./data/gameData.js";
import { i18n } from "./data/i18n.js";
import { getPhaseMoment, getRunIdentity } from "./gameFeel.js";

let root = null;
let currentLang = localStorage.getItem("sp_workflow_lang") || "th";
let allStages = currentLang === "th" ? allStagesTH : allStagesEN;
let game = allStages[0];
const starterWorkflowSkills = [];
const EMERGENCY_RISK_THRESHOLD = 8;
let audioContext = null;
let soundEnabled = true;
let state = null;
function getCharacterInlineStyle() {
  if (!state || !state.characterPos) return `cursor: grab; touch-action: none; pointer-events: none; transform: none;`;
  return `position: fixed; left: ${state.characterPos.x}px; top: ${state.characterPos.y}px; z-index: 9999; margin: 0; transition: none; cursor: var(--cursor-grab); touch-action: none; pointer-events: none; transform: none;`;
}

function getCharacterHitboxStyle(lv, isFail = false) {
  const spriteMetrics = {
    1: { width: 1774, height: 887, bbox: [326, 196, 1104, 693] },
    2: { width: 1774, height: 887, bbox: [415, 182, 1148, 752] },
    3: { width: 1774, height: 887, bbox: [681, 79, 1112, 755] },
    4: { width: 1774, height: 887, bbox: [298, 40, 1448, 821] },
    5: { width: 1419, height: 709, bbox: [206, 71, 1214, 637] },
  };

  const failMetrics = {
    1: { width: 1064, height: 532, bbox: [343, 74, 751, 435] },
    2: { width: 1064, height: 532, bbox: [266, 72, 786, 491] },
    3: { width: 1064, height: 532, bbox: [360, 65, 726, 464] },
    4: { width: 1419, height: 709, bbox: [544, 115, 959, 640] },
    5: { width: 1419, height: 709, bbox: [444, 88, 963, 660] },
  };

  const metricsSet = isFail ? failMetrics : spriteMetrics;
  const metrics = metricsSet[lv] || metricsSet[1];
  const [left, top, right, bottom] = metrics.bbox;
  const leftPct = (left / metrics.width) * 100;
  const topPct = (top / metrics.height) * 100;
  const widthPct = ((right - left) / metrics.width) * 100;
  const heightPct = ((bottom - top) / metrics.height) * 100;

  return `position: absolute; left: ${leftPct.toFixed(2)}%; top: ${topPct.toFixed(2)}%; width: ${widthPct.toFixed(2)}%; height: ${heightPct.toFixed(2)}%;`;
}

function createInitialState() {
  return {
    characterPos: null,
    showTutorial: false,
    tutorialPage: 0,
    showHeroPopup: false,
    screen: "title",
    index: 0,
    progress: 0,
    activeChaos: null,
    triggeredChaosByPhase: {},
    phaseSummaries: [],
    pendingPhaseMoment: null,
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
    emergencyCharacterFailed: false,
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

function getCurrentRunIdentity() {
  return getRunIdentity(state.skills, i18n[currentLang]);
}

function getAvailableOptions(step) {
  if (state.activeChaos) {
    return [
      ...(state.activeChaos.options || []),
      ...(state.activeChaos.skillOptions || []).filter(option => state.skills.includes(option.skill))
    ];
  }

  const usedSynergy = state.history.some(item => item.phase === step.title && item.isSynergy);

  const synergies = (!usedSynergy && step.synergyOptions)
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
      title: "Workflow Absorbed the Impact",
      copy: option.outcome,
    };
  }

  if (option.effects.risk >= 4 || option.effects.quality < 0) {
    return {
      tone: "danger",
      title: "Speed Becomes Technical Debt",
      copy: option.outcome,
    };
  }

  if (option.effects.risk >= 2 || option.effects.token >= 3) {
    return {
      tone: "warn",
      title: "Project Advances, Pressure Builds",
      copy: option.outcome,
    };
  }

  if (option.effects.risk < 0 || option.effects.quality >= 3) {
    return {
      tone: "recovery",
      title: "Team Secures Foothold Before Sprinting",
      copy: option.outcome,
    };
  }

  return {
    tone: "safe",
    title: "Choice Keeps Workflow Controlled",
    copy: option.outcome,
  };
}

function inferChoiceSolves(option) {
  const lang = i18n[currentLang];
  const effects = normalizeEffects(option.effects);
  const progress = Number.isFinite(option.progress) ? option.progress : 0;
  const solves = [];

  if (progress >= 100) {
    solves.push(lang.closedPhaseInOneMove);
  } else if (progress >= 60) {
    solves.push(lang.acceleratedPhaseProgress);
  } else if (progress >= 40) {
    solves.push(lang.advancedWorkRoomForAdjustments);
  }

  if (effects.risk <= -5) {
    solves.push(lang.heavilyReducedRisk);
  } else if (effects.risk < 0) {
    solves.push(lang.reducedAccumulatedRisk);
  }

  if (effects.quality >= 5) {
    solves.push(lang.increasedEvidenceAndQuality);
  } else if (effects.quality > 0) {
    solves.push(lang.madeWorkMoreVerifiable);
  }

  if (option.preventPenalty) {
    solves.push(lang.counteredIssueInPhase);
  }

  if (option.requires?.length) {
    solves.push(lang.combinedSuperpowersToCloseGaps);
  } else if (option.skill) {
    solves.push(lang.usedSpecificSuperpowerToResolvePressure);
  }

  if (!solves.length && effects.risk >= 3) {
    solves.push(lang.boughtSpeedAcceptedRisk);
  }

  return solves.length ? solves.join(" / ") : lang.providedTacticalOption;
}

function inferChoiceMisses(option) {
  const lang = i18n[currentLang];
  const effects = normalizeEffects(option.effects);
  const misses = [];

  if (effects.risk >= 4) {
    misses.push(lang.highlyIncreasedRisk);
  } else if (effects.risk >= 2) {
    misses.push(lang.stillHasRiskNeedsGuardrails);
  }

  if (effects.quality <= -2) {
    misses.push(lang.highQualityDebt);
  } else if (effects.quality < 0) {
    misses.push(lang.workAdvancedQualityDropped);
  }

  if (effects.token >= 3) {
    misses.push(lang.heavilyConsumedAIBudget);
  }

  if (effects.time >= 3) {
    misses.push(lang.consumedTimeSqueezeDeadline);
  }

  if (!misses.length && option.tradeoff) {
    misses.push(option.tradeoff);
  }

  return misses.length ? misses.join(" / ") : lang.stillNeedsVerificationInNextPhase;
}

function getChoiceMeaning(option) {
  const lang = i18n[currentLang];
  return {
    purpose: option.purpose || option.helper || lang.chooseThisApproachToHandleImmediatePhasePressure,
    solves: option.solves || inferChoiceSolves(option),
    misses: option.misses || inferChoiceMisses(option),
  };
}

function getInPlayHint(step, option, countered) {
  if (option.hint) return option.hint;

  const lang = i18n[currentLang];
  const effects = normalizeEffects(option.effects);

  if (countered) {
    return lang.hintCountered;
  }

  if (option.requires?.length) {
    return lang.hintCombo;
  }

  if (effects.risk >= 4 || effects.quality <= -2) {
    return lang.hintShortcut;
  }

  if (effects.token >= 3 || effects.time >= 3) {
    return lang.hintExpensive;
  }

  if (effects.risk < 0 || effects.quality >= 3) {
    return lang.hintGuardrails;
  }

  return step?.goal?.copy || option.lesson || lang.hintDefault;
}

function buildMicroEvent({ id, title, icon, tags, tradeoff, outcome, lesson, effects, reaction }) {
  const lang = i18n[currentLang];
  return {
    phase: lang.systemSignal,
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
    lines: [lang.systemSignalLine],
    reaction,
    isMicroEvent: true,
  };
}

function formatRandomEffectDelta(effects) {
  const safeEffects = normalizeEffects(effects);
  const deltas = [];
  const lang = i18n[currentLang];

  const timeLabel = lang.time || "Time";
  const tokenLabel = lang.tokenLabel || "Token";
  const riskLabel = lang.risk || "Risk";
  const qualityLabel = lang.qualityLabel || "Quality";

  if (safeEffects.time !== 0) {
    deltas.push(`${timeLabel} ${safeEffects.time > 0 ? "+" : ""}${safeEffects.time}`);
  }

  if (safeEffects.token !== 0) {
    deltas.push(`${tokenLabel} ${safeEffects.token > 0 ? "-" : "+"}${Math.abs(safeEffects.token)}`);
  }

  if (safeEffects.risk !== 0) {
    deltas.push(`${riskLabel} ${safeEffects.risk > 0 ? "+" : ""}${safeEffects.risk}`);
  }

  if (safeEffects.quality !== 0) {
    deltas.push(`${qualityLabel} ${safeEffects.quality > 0 ? "+" : ""}${safeEffects.quality}`);
  }

  return deltas.length ? deltas.join(" / ") : lang.noResourceChange || "No resource change";
}

function buildRandomModifierEvent(modifier, step) {
  const lang = i18n[currentLang];
  const effects = normalizeEffects(modifier.effects);
  const tone = modifier.tone || (effects.risk > 0 || effects.token > 0 || effects.time > 0 ? "warn" : "safe");

  return {
    phase: lang.externalSignal,
    eventId: modifier.id,
    eventTitle: modifier.title,
    optionId: modifier.id,
    optionLabel: modifier.title,
    optionIcon: modifier.icon || "???",
    optionTone: tone === "danger" ? "gray" : "mint",
    skillName: null,
    tags: modifier.tags || ["external"],
    tradeoff: lang.modifierTradeoff,
    outcome: modifier.copy,
    lesson: lang.modifierLesson,
    hint: modifier.hint || lang.modifierHint,
    countered: false,
    effects,
    progress: 0,
    lines: [
      `${lang.modifierExternalSignal} ${step?.title || lang.currentPhase}`,
      modifier.copy,
      formatRandomEffectDelta(effects),
    ],
    reaction: {
      tone,
      title: tone === "safe" ? lang.modifierWorkflowResilient : lang.modifierExternalPressure,
      copy: lang.modifierReactionCopy,
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
      tags: ["AI Fatigue", "Needs Filtering", "Risk Increase"],
      tradeoff: "Using AI heavily makes answers require closer scrutiny.",
      outcome: "AI starts repeating the same patterns and proposing good-looking but off-brief text.",
      lesson: "AI budget is not a score. The more you use it, the more verification systems you need.",
      effects: { time: 0, token: 0, risk: 1, quality: -1 },
      reaction: {
        tone: "warn",
        title: "AI starts drifting from the brief",
        copy: "Answers still look reasonable, but the team needs more effort to filter them as context overflows.",
      },
    });
  } else if (state.risk >= 5) {
    microEvent = buildMicroEvent({
      id: "client_trust_shake",
      title: "Client Trust Shakes",
      icon: "!",
      tags: ["Client Anxious", "Trust Shaken", "Needs Evidence"],
      tradeoff: "Accumulated risk forces every answer to be backed by solid evidence.",
      outcome: "Client starts questioning why the website copy doesn't match the agreed features.",
      lesson: "Unmanaged risk inevitably leads to credibility questions.",
      effects: { time: 0, token: 0, risk: 1, quality: 0 },
      reaction: {
        tone: "danger",
        title: "Trust begins to crack",
        copy: "The team can still move forward, but the client starts looking for proof that this website is telling the truth.",
      },
    });
  } else if (state.time >= 14) {
    microEvent = buildMicroEvent({
      id: "deadline_squeeze",
      title: "Deadline Squeeze",
      icon: "CLK",
      tags: ["Time Squeeze", "Harder Decisions", "Risk Increase"],
      tradeoff: "Time spent narrows down your late-game options.",
      outcome: "The team starts cutting scope to meet the demo deadline, requiring sharper reviews.",
      lesson: "Time spent on workflow should buy back confidence, not just add ritualistic steps.",
      effects: { time: 0, token: 0, risk: 1, quality: 0 },
      reaction: {
        tone: "warn",
        title: "Deadline starts squeezing decisions",
        copy: "Late-game options are narrowing. The team must choose options that truly reduce risk.",
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

  state.resourceFlashes = {
    time: safeEffects.time !== 0 ? (safeEffects.time < 0 ? 'green' : 'red') : null,
    token: safeEffects.token !== 0 ? (safeEffects.token < 0 ? 'green' : 'red') : null,
    risk: safeEffects.risk !== 0 ? (safeEffects.risk < 0 ? 'green' : 'red') : null,
  };

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
    hiddenPenalty.push("Team is burning through AI budget. Answers require heavier filtering.");
  }

  if (state.time + optionEffects.time > game.caps.time) {
    hiddenPenalty.push("Deadline crunch: team is forced to make rushed decisions late in the game.");
  }

  let eventTitle = "";
  let eventLine = "";
  let projectMood = "";
  let countered = false;
  const lang = i18n[currentLang];

  if (state.activeChaos) {
    eventTitle = state.activeChaos.title;
    if (option.preventPenalty) {
      countered = true;
      eventLine = lang.chaosAverted.replace("{event}", state.activeChaos.title);
      projectMood = lang.damageBlocked;
    } else {
      eventLine = lang.chaosImpact.replace("{event}", state.activeChaos.title);
      projectMood = lang.lostProgress.replace("{amount}", state.activeChaos.progressPenalty);
    }
  } else if (step.event) {
    eventTitle = step.event.title;
    eventLine = lang.emergencyLabel.replace("{event}", step.event.title);
    projectMood = step.event.copy || option.outcome || "";
  } else {
    eventTitle = lang.actionCompleted;
    eventLine = lang.progressGain.replace("{amount}", option.progress || 0);
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
    isSynergy: !!option.requires,
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
  const lang = i18n[currentLang];
  if (riskDelta >= 4 || riskyChoices >= 2) {
    return currentLang === "th"
      ? "โฟกัสที่ Spec, guardrails และการ review ให้ไวขึ้นก่อนที่ความเสี่ยงจะสะสมจนคุมไม่อยู่"
      : "Focus on Spec, guardrails, and Reviews faster before risk accumulates out of control.";
  }

  if (qualityDelta < 0) {
    return currentLang === "th"
      ? "โฟกัสที่ acceptance criteria และ test/checklist เพื่อไม่ให้งานดูเหมือนเสร็จทั้งที่คุณภาพกำลังตก"
      : "Focus on acceptance criteria and tests/checklists so work doesn't look finished while quality drops.";
  }

  if (tokenDelta >= 6) {
    return currentLang === "th"
      ? "โฟกัสที่การใช้ AI แบบมีขอบเขต ลดวง reprompt และเพิ่มตัวช่วยกรองคำตอบ"
      : "Focus on bounded AI usage, reducing reprompt loops, and adding filtering tools.";
  }

  if (timeDelta >= 5) {
    return currentLang === "th"
      ? "โฟกัสที่การแตก task และเลือก workflow ที่ซื้อความมั่นใจกลับมาได้จริง แทนการเพิ่มขั้นตอนลอย ๆ"
      : "Focus on breaking down tasks and choosing workflows that buy back real confidence rather than adding arbitrary steps.";
  }

  if (problems.length && counteredEvents === 0) {
    return currentLang === "th"
      ? "โฟกัสที่การเลือก skill ให้ตรงกับ edge case ของเฟสนี้ในจังหวะที่ใช่"
      : "Focus on selecting the right skill to counter the edge cases of this phase at the right moment.";
  }

  return currentLang === "th"
    ? "รักษาจังหวะนี้ไว้ และใช้ Review/Scanner ตรวจหลักฐานก่อน handoff"
    : "Maintain this pace and use Review/Scanner to verify evidence before handoff.";
}

function getPhaseGrade(score) {
  if (score >= 85) {
    return {
      label: "A",
      title: "Phase Cleared",
      tone: "safe",
      helper: "Cleared this phase cleanly, using workflow to clearly reduce risk.",
    };
  }

  if (score >= 70) {
    return {
      label: "B",
      title: "Solid Control",
      tone: "safe",
      helper: "Controlled the phase well, though with some time or AI budget costs.",
    };
  }

  if (score >= 50) {
    return {
      label: "C",
      title: "Working but Fragile",
      tone: "warn",
      helper: "This phase keeps moving, but has hidden risk or quality debt.",
    };
  }

  if (score >= 31) {
    return {
      label: "D",
      title: "Barely Controlled",
      tone: "warn",
      helper: "Barely survived; shortcuts are starting to erode workflow credibility.",
    };
  }

  return {
    label: "F",
    title: "Phase Breakdown",
    tone: "danger",
    helper: "Severe damage in this phase; must re-establish guardrails before accelerating further.",
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

function buildPendingPhaseMoment(phaseSummary) {
  const moment = getPhaseMoment(phaseSummary, i18n[currentLang]);
  if (!moment) return null;

  return {
    ...moment,
    phase: phaseSummary.phase,
    grade: phaseSummary.grade,
    focus: phaseSummary.focus,
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
  applyEffects(option.effects || { time: 0, token: 0, risk: 0, quality: 0 });
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
  if (state.risk >= game.caps.risk) {
    state.characterPos = null;
    state.screen = "result";
    state.lastSignalTone = getProjectSignalTone();
    render();
    return;
  }

  if (state.risk >= EMERGENCY_RISK_THRESHOLD && !state.emergencyTriggered) {
    state.emergencyTriggered = true;
    state.resolution = null;
    state.screen = "emergency_step";
    state.emergencyCharacterFailed = false;
    render();
    return;
  }

  const step = getCurrentStep();

  if (!step) {
    state.characterPos = null;
    state.screen = "result";
    state.lastSignalTone = getProjectSignalTone();
    render();
    return;
  }

  if (state.progress >= step.requiredProgress) {
    const phaseSummary = buildPhaseSummary(step);
    state.phaseSummaries = [...state.phaseSummaries, phaseSummary];
    state.pendingPhaseMoment = buildPendingPhaseMoment(phaseSummary);
    const oldLevel = Math.min(5, state.index + 1);
    state.index += 1;
    const newLevel = Math.min(5, state.index + 1);
    state.progress = 0;

    if (oldLevel !== newLevel) {
      triggerEvolutionTransition(oldLevel, newLevel);
      return;
    } else {
      state.screen = state.index >= game.steps.length ? "result" : "step";
    }

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

function triggerEvolutionTransition(oldLevel, newLevel) {
  state.characterPos = null;
  // Hide UI elements to focus on the cat
  const uiElements = document.querySelectorAll('.phase-container, .phasebar, .resolution-panel, .start-board');
  uiElements.forEach(el => {
    if (el) {
      el.style.transition = 'opacity 0.6s ease';
      el.style.opacity = '0';
    }
  });

  setTimeout(() => {
    state.screen = "evolution";
    state.evolutionOldLevel = oldLevel;
    state.evolutionNewLevel = newLevel;
    render();
  }, 650);
}

function continueAfterResolution() {
  if (state.screen === "emergency_resolution") {
    state.resolution = null;
    const step = getCurrentStep();
    if (step) {
      const phaseSummary = buildPhaseSummary(step);
      state.phaseSummaries = [...state.phaseSummaries, phaseSummary];
      state.pendingPhaseMoment = buildPendingPhaseMoment(phaseSummary);
    }
    const oldLevel = Math.min(5, state.index + 1);
    state.index += 1;
    const newLevel = Math.min(5, state.index + 1);
    state.progress = 0;

    if (oldLevel !== newLevel) {
      triggerEvolutionTransition(oldLevel, newLevel);
      return;
    } else {
      state.screen = state.index >= game.steps.length ? "result" : "step";
    }
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
      state.emergencyCharacterFailed = false;
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
  } else {
    if (state.skills.length >= game.maxSkills) return;
    state.skills = [...state.skills, skillId];
  }
  
  closeSkillDetail();
  
  if (state.screen === "setup") {
    updateSkillDraftUI();
  } else {
    render();
  }
}

function updateSkillDraftUI() {
  const cards = document.querySelectorAll('.skill-card');
  cards.forEach(card => {
    const id = card.dataset.skill;
    const selected = state.skills.includes(id);
    const locked = !selected && state.skills.length >= game.maxSkills;
    
    card.classList.toggle('is-selected', selected);
    card.classList.toggle('is-locked', locked);
    card.setAttribute('aria-pressed', selected ? "true" : "false");
    
    const check = card.querySelector('.inventory-slot__check');
    if (check) check.innerHTML = selected ? "&#10003;" : "";
  });
  
  const countEl = document.querySelector('.draft-count');
  if (countEl) {
    const lang = i18n[currentLang];
    countEl.textContent = `${lang.selected} ${state.skills.length} / ${game.maxSkills}`;
  }
  
  const startBtn = document.querySelector('.start-mission');
  if (startBtn) {
    startBtn.disabled = state.skills.length !== game.maxSkills;
  }
  
  const hotbarSection = document.querySelector('.superpower-hand.mmo-hotbar');
  if (hotbarSection) {
    hotbarSection.outerHTML = selectedSkillHandMarkup();
  } else if (state.skills.length > 0) {
    // If it wasn't there before, append it
    const main = document.querySelector('main.app');
    if (main) main.insertAdjacentHTML("beforeend", selectedSkillHandMarkup());
  }
}

function openSkillDetail(skillId) {
  const skill = getSkill(skillId);
  if (!skill) return;
  state.activeSkillDetail = skillId;
  
  renderSkillDetailPopup();
}

function closeSkillDetail() {
  state.activeSkillDetail = null;
  const overlay = document.querySelector('.skill-detail-overlay');
  if (overlay) overlay.remove();
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
  // TODO: Randomize when more stages are available. For now, lock to stage 01.
  selectStage(allStages[0].id);
}

function selectStage(stageId) {
  const stage = allStages.find((s) => s.id === stageId);
  if (!stage || stage.status === "coming_soon") return;
  game = stage;
  state = createInitialState();
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

let bgmInterval = null;
let bgmNextNoteTime = 0;
let bgmCurrentStep = 0;
let bgmStarted = false;
const BGM_TEMPO = 140; // BPM
const SECONDS_PER_BEAT = 60 / BGM_TEMPO;
const NOTE_LENGTH = SECONDS_PER_BEAT / 2; // 8th notes

// C Major / A Minor upbeat progression
const bgmNotes = [
  261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 261.63, 392.00,
  349.23, 440.00, 523.25, 698.46, 523.25, 440.00, 349.23, 523.25,
  392.00, 493.88, 587.33, 783.99, 587.33, 493.88, 392.00, 587.33,
  440.00, 523.25, 659.25, 880.00, 659.25, 523.25, 440.00, 659.25
];

const bgmBass = [
  130.81, 130.81, 130.81, 130.81,
  174.61, 174.61, 174.61, 174.61,
  196.00, 196.00, 196.00, 196.00,
  220.00, 220.00, 220.00, 220.00
];

function scheduleBGM() {
  const ctx = ensureAudio();
  if (!ctx || !soundEnabled) {
    if (bgmInterval) {
      clearInterval(bgmInterval);
      bgmInterval = null;
    }
    return;
  }

  while (bgmNextNoteTime < ctx.currentTime + 0.1) {
    const freq = bgmNotes[bgmCurrentStep % bgmNotes.length];

    // Melody
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, bgmNextNoteTime);
    gain.gain.setValueAtTime(0.0001, bgmNextNoteTime);
    gain.gain.linearRampToValueAtTime(0.015, bgmNextNoteTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, bgmNextNoteTime + NOTE_LENGTH - 0.02);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(bgmNextNoteTime);
    osc.stop(bgmNextNoteTime + NOTE_LENGTH);

    // Bass
    if (bgmCurrentStep % 2 === 0) {
      const bassFreq = bgmBass[Math.floor((bgmCurrentStep % 32) / 2)];
      const bOsc = ctx.createOscillator();
      const bGain = ctx.createGain();
      bOsc.type = "sawtooth";
      bOsc.frequency.setValueAtTime(bassFreq, bgmNextNoteTime);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400;

      bGain.gain.setValueAtTime(0.0001, bgmNextNoteTime);
      bGain.gain.linearRampToValueAtTime(0.025, bgmNextNoteTime + 0.01);
      bGain.gain.exponentialRampToValueAtTime(0.0001, bgmNextNoteTime + (NOTE_LENGTH * 2) - 0.02);

      bOsc.connect(filter);
      filter.connect(bGain);
      bGain.connect(ctx.destination);
      bOsc.start(bgmNextNoteTime);
      bOsc.stop(bgmNextNoteTime + (NOTE_LENGTH * 2));
    }

    bgmNextNoteTime += NOTE_LENGTH;
    bgmCurrentStep++;
  }
}

function startBGM() {
  if (!soundEnabled) return;
  const ctx = ensureAudio();
  if (!ctx) return;

  if (!bgmInterval) {
    bgmNextNoteTime = ctx.currentTime + 0.05;
    bgmCurrentStep = 0;
    bgmInterval = setInterval(scheduleBGM, 25);
  }
}

function stopBGM() {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}

function playHoverSound() {
  if (!soundEnabled) return;
  beep({ frequency: 800, duration: 0.02, volume: 0.015, type: "sine" });
}

function playClickSound() {
  if (!soundEnabled) return;
  beep({ frequency: 600, duration: 0.04, volume: 0.025, type: "square" });
  beep({ frequency: 800, duration: 0.04, volume: 0.02, delay: 0.02, type: "square" });
}

document.addEventListener("mouseover", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest("button, .choice, .stage-card, .skill-card, .superpower-hand__card, .phase-goal-start, .lang-btn")) {
    playHoverSound();
  }
});

function soundButtonMarkup() {
  return `
    <button class="sound-toggle ${soundEnabled ? "on" : "off"}" type="button" aria-label="Toggle sound">
      <span class="sound-toggle__icon">${soundEnabled ? "SFX" : "OFF"}</span>
    </button>
  `;
}


function handleRootClick(event) {
  if (!bgmStarted && soundEnabled) {
    bgmStarted = true;
    startBGM();
  }

  const target = event.target;
  if (!(target instanceof Element) || !root?.contains(target)) return;

  const isInteractive = target.closest("button, .choice, .stage-card, .skill-card, .superpower-hand__card, .phase-goal-start, .lang-btn");
  if (isInteractive && !target.closest(".sound-toggle")) {
    playClickSound();
  }

  const langBtn = target.closest(".lang-btn");
  if (langBtn) {
    currentLang = langBtn.dataset.lang;
    localStorage.setItem("sp_workflow_lang", currentLang);
    allStages = currentLang === "th" ? allStagesTH : allStagesEN;
    game = allStages[0];
    render();
    return;
  }

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
    if (soundEnabled) {
      beep({ frequency: 640, duration: 0.06, volume: 0.02 });
      startBGM();
      bgmStarted = true;
    } else {
      stopBGM();
    }
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

    state.showTutorial = true;
    state.tutorialPage = 0;
    render();
    return;
  }

  const tutNext = target.closest(".tutorial-next");
  if (tutNext) {
    if (state.tutorialPage < 2) {
      state.tutorialPage++;
      render();
    } else {
      state.showTutorial = false;
      startSkillDraft();
    }
    return;
  }

  const tutPrev = target.closest(".tutorial-prev");
  if (tutPrev) {
    if (state.tutorialPage > 0) {
      state.tutorialPage--;
      render();
    }
    return;
  }

  const stageCard = target.closest(".stage-card");
  if (stageCard && !stageCard.disabled) {
    selectStage(stageCard.dataset.stage);
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

  const phaseMomentButton = target.closest(".phase-moment-start");
  if (phaseMomentButton) {
    state.pendingPhaseMoment = null;
    render();
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

function truncateHelper(text, maxWords = 12) {
  if (!text) return "";
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "\u2026";
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
  const lang = i18n[currentLang];
  const flashes = state.resourceFlashes || {};
  const timeRemaining = Math.max(0, game.caps.time - state.time);
  const timeFill = game.caps.time > 0
    ? clamp(Math.round((timeRemaining / game.caps.time) * 100), 0, 100)
    : 0;
  const tokenRemaining = getTokenRemaining();
  const tokenFill = game.caps.token > 0
    ? clamp(Math.round((tokenRemaining / game.caps.token) * 100), 0, 100)
    : 0;
  const rawRiskValue = game.caps.risk > 0
    ? Math.round((state.risk / game.caps.risk) * 100)
    : 0;
  const riskValue = clamp(rawRiskValue, 0, 100);
  const qualityStars = Math.min(5, Math.max(0, Math.floor(state.quality / 4)));

  return [
    {
      key: "time",
      label: lang.time,
      value: timeRemaining,
      fill: timeFill,
      helper: lang.timeRemaining,
      tone: getTimeResourceTone(timeFill),
      flash: flashes.time ? `meter-flash-${flashes.time}` : "",
    },
    {
      key: "token",
      label: "Token",
      value: tokenRemaining,
      fill: tokenFill,
      helper: lang.aiBudgetRemaining,
      tone: getTokenResourceTone(tokenFill),
      flash: flashes.token ? `meter-flash-${flashes.token}` : "",
    },
    {
      key: "risk",
      label: lang.risk,
      value: riskValue,
      fill: clamp(riskValue, 0, 100),
      helper: lang.fragility,
      tone: getPressureResourceTone(riskValue, 50, 80),
      flash: flashes.risk ? `meter-flash-${flashes.risk}` : "",
    },
  ];
}

function resourceBarMarkup() {
  const resources = getResourceBarState();
  if (state.resourceFlashes) {
    state.resourceFlashes = null;
  }
  return `
    <div class="resource-bar" aria-label="Resource Bar">
      ${resources
      .map((resource) => `
            <div class="resource-meter resource-meter--${resource.key} resource-meter--${resource.tone} ${resource.flash || ''}" aria-label="${resource.label}: ${resource.value}">
              <span class="resource-meter__topline">
                <span class="resource-meter__label">${resource.label}</span>
                <strong class="resource-meter__value">${resource.value}</strong>
              </span>
              <span class="resource-meter__track" aria-hidden="true">
                <span class="resource-meter__fill" style="width: ${resource.fill}%;"></span>
              </span>
              <span class="resource-meter__helper">${resource.helper}</span>
            </div>
          `)
      .join("")}
      </div>
  `;
}

function selectedSkillHandMarkup() {
  const selectedSkills = state.skills.map((skillId) => getSkill(skillId)).filter(Boolean);
  if (!selectedSkills.length) return "";
  const runIdentity = getCurrentRunIdentity();

  const slots = [];
  for (let i = 0; i < game.maxSkills; i++) {
    const skill = selectedSkills[i];
    if (skill) {
      slots.push(`
        <button class="superpower-hand__card hotbar-slot" type="button" data-skill="${escapeHtml(skill.id)}" aria-label="View details ${escapeHtml(skill.name)}" title="${escapeHtml(skill.name)}">
          <span class="hotbar-slot__icon">${escapeHtml(skill.icon)}</span>
          <span class="hotbar-slot__number">${i + 1}</span>
        </button>
      `);
    } else {
      slots.push(`
        <div class="hotbar-slot hotbar-slot--empty">
          <span class="hotbar-slot__number">${i + 1}</span>
        </div>
      `);
    }
  }

  return `
    <section class="superpower-hand mmo-hotbar" aria-label="Superpower Hand">
      <div class="hotbar-slots">
        ${slots.join("")}
      </div>
    </section>
  `;
}

function getTotalPhaseCount() {
  return game.steps.length + 1;
}

function phaseMarkup(currentIndex) {
  const lang = i18n[currentLang];
  const labels = [...game.steps.map((step) => step.title), lang.reportTab || "Report"];
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
  const lang = i18n[currentLang];
  return `
    <header class="start-scene">
      <div class="lang-selection">
         <button class="lang-btn ${currentLang === 'th' ? 'active-lang' : ''}" data-lang="th">ภาษาไทย</button>
         <button class="lang-btn ${currentLang === 'en' ? 'active-lang' : ''}" data-lang="en">English</button>
      </div>
      <div class="start-sky" aria-hidden="true">
        <span class="cloud cloud--one"></span>
        <span class="cloud cloud--two"></span>
      </div>
      <div class="start-board">
        <div class="start-character" aria-hidden="true" style="${getCharacterInlineStyle()}">
          <img src="/assets/cathappy/lv1.gif" alt="Hero Lv1" class="hero-character-img" draggable="false" onerror="this.onerror=null; this.src='/assets/cathappy/lv1.png';" />
          <div class="character-hitbox" style="${getCharacterHitboxStyle(1)}"></div>
        </div>
        <div class="start-emblem">${titleGlyphMarkup()}</div>
        <p class="start-kicker">${lang.projectSurvivalGame}</p>
        <h1 class="start-logo" aria-label="SUPERPOWER WORKFLOW">
          <span>SUPER</span><span>POWER</span>
          <strong>WORKFLOW</strong>
        </h1>
        <div class="start-stage">
          <span>v0.6</span>
          <strong>${game.stage}</strong>
        </div>
        <p class="start-copy">${game.intro}</p>
        <button class="hero-start-btn restart" type="button">${lang.startMission}</button>
      </div>
      <div class="start-ground" aria-hidden="true"></div>
    </header>
  `;
}

function tagMarkup(tags) {
  return tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
}

function skillCardMarkup(skill) {
  const lang = i18n[currentLang];
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
      <span class="inventory-slot__detail">${lang.details}</span>
    </button>
  `;
}

function skillDetailPopupMarkup(skill, allowEdit = state.screen === "setup") {
  const lang = i18n[currentLang];
  const selected = state.skills.includes(skill.id);
  const locked = !selected && state.skills.length >= game.maxSkills;
  const actionLabel = selected ? lang.removeSkill : locked ? lang.maxSkillsSelected.replace('{max}', game.maxSkills) : lang.selectSkill;
  const summary = skill.summary || skill.description;
  const teaches = skill.teaches
    ? `
      <div class="skill-detail-section">
        <p class="skill-detail-label">${lang.teaches}</p>
        <p>${escapeHtml(skill.teaches)}</p>
      </div>
    `
    : "";
  const warning = skill.warning
    ? `
      <div class="skill-detail-warning">
        <p class="skill-detail-label">${lang.warning}</p>
        <p>${escapeHtml(skill.warning)}</p>
      </div>
    `
    : "";

  return `
    <div class="hero-popup-overlay skill-detail-overlay">
      <div class="hero-popup-content skill-detail-popup">
        <section class="brief-card skill-detail-card">
          <p class="brief-label">${lang.details}</p>
          <div class="skill-detail-head">
            <span class="skill-detail-icon">${escapeHtml(skill.icon)}</span>
            <span class="skill-detail-meta">
              <span class="skill-detail-type">${escapeHtml(skill.type)}</span>
              <strong>${escapeHtml(skill.name)}</strong>
            </span>
          </div>
          <p class="skill-detail-summary">${escapeHtml(summary)}</p>
          <div class="skill-detail-section">
            <p class="skill-detail-label">${lang.description}</p>
            <p>${escapeHtml(skill.description)}</p>
          </div>
          ${teaches}
          ${warning}
          <div class="skill-detail-actions">
            ${allowEdit ? `<button class="restart skill-detail-toggle" type="button" data-skill="${escapeHtml(skill.id)}" ${locked ? "disabled" : ""}>${actionLabel}</button>` : ""}
            <button class="restart skill-detail-close" type="button">${lang.close}</button>
          </div>
        </section>
      </div>
    </div>
  `;
}

function choiceCardMarkup(option, index) {
  const lang = i18n[currentLang];
  const isSkill = Boolean(option.skill);
  const isSynergy = Boolean(option.requires);
  const meaning = getChoiceMeaning(option);
  const visibleTags = option.tags ? option.tags.slice(0, 2) : [];
  const hiddenTagCount = option.tags ? Math.max(0, option.tags.length - visibleTags.length) : 0;
  const unlock = isSkill
    ? `${lang.workflowTool} ${getSkill(option.skill)?.name}`
    : isSynergy
      ? `${lang.comboTool} ${option.requires.map((req) => getSkill(req)?.name).join(" + ")}`
      : "";
  const visualTone = isSynergy ? "combo" : isSkill ? "skill" : "base";

  return `
    <button class="choice action-slot action-slot--${visualTone} ${isSkill ? "choice--skill" : ""} ${isSynergy ? "choice--synergy" : ""}" data-option="${option.id}" style="--choice-delay:${index * 65}ms">
      <span class="action-slot__body">
        <strong class="action-slot__title">${escapeHtml(option.label)}</strong>
        <span class="action-slot__helper">${escapeHtml(truncateHelper(option.helper || ""))}</span>
        <span class="action-slot__tags">
          ${visibleTags.length ? tagMarkup(visibleTags) : ""}
          ${hiddenTagCount ? `<span>+${hiddenTagCount}</span>` : ""}
        </span>
      </span>
      <span class="action-slot__footer">
        ${unlock ? `<span class="action-slot__unlock">${escapeHtml(unlock)}</span>` : ""}
        <span class="action-slot__select">${lang.select}</span>
      </span>
    </button>
  `;
}

function briefMarkup(step, isEmergency = false, isChaos = false) {
  const lang = i18n[currentLang];
  const label = isEmergency ? lang.emergencyBrief : isChaos ? lang.issueBrief : lang.briefLabel;

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

  const existing = document.querySelector('.skill-detail-overlay');
  if (existing) existing.remove();

  const panel = document.querySelector('.panel');
  if (panel && (state.screen === "step" || state.screen === "emergency_step")) {
    panel.insertAdjacentHTML("beforeend", skillDetailPopupMarkup(skill));
  } else {
    root.insertAdjacentHTML("beforeend", skillDetailPopupMarkup(skill));
  }
}

function stageCardMarkup(stage) {
  const lang = i18n[currentLang];
  const isAvailable = stage.status !== "coming_soon";
  return `
    <button
      class="stage-card ${isAvailable ? "" : "stage-card--locked"}"
      data-stage="${escapeHtml(stage.id)}"
      type="button"
      ${isAvailable ? "" : "disabled"}>
      <span class="stage-card__badge">${isAvailable ? lang.available : lang.comingSoon}</span>
      <strong class="stage-card__title">${escapeHtml(stage.stage || stage.title)}</strong>
      <p class="stage-card__intro">${escapeHtml(stage.intro || "")}</p>
    </button>
  `;
}

function renderStageSelect() {
  const lang = i18n[currentLang];
  root.innerHTML = `
    <main class="app phase-enter">
      <div class="phase-character" aria-hidden="true" style="${getCharacterInlineStyle()}">
        <img src="/assets/cathappy/lv1.gif" alt="Hero" class="phase-character-img" draggable="false" onerror="this.onerror=null; this.src='/assets/cathappy/lv1.png';" />
        <div class="character-hitbox" style="${getCharacterHitboxStyle(1)}"></div>
      </div>
      <section class="${shellClass()}">
        <section class="phasebar" style="display: flex; align-items: center; justify-content: space-between;">
          <ol class="phases" style="flex: 1;">${phaseMarkup(0)}</ol>
          ${soundButtonMarkup()}
        </section>
        <section class="playfield">
          <section class="panel setup-panel">
            <div class="panel-head">
              <p class="phase-tag">${lang.missionSelect}</p>
              <div class="panel-title-row">
                <h2 class="phase-title">${lang.chooseStage}</h2>
                <span class="phase-badge" aria-hidden="true">${eventIconMarkup()}</span>
              </div>
              <div class="phase-body">
                <p>${lang.selectStageToDraft}</p>
              </div>
            </div>
            <div class="stage-select-grid">
              ${allStages.map(stageCardMarkup).join("")}
            </div>
          </section>
        </section>
      </section>
    </main>
  `;
}

function renderSetup() {
  const lang = i18n[currentLang];
  const characterLevel = Math.min(5, (state.index || 0) + 1);
  const runIdentity = state.skills.length === game.maxSkills ? getCurrentRunIdentity() : null;
  root.innerHTML = `
    <main class="app phase-enter">
      <div class="phase-character ${characterLevel === 4 ? 'phase-character--lv4' : ''}" aria-hidden="true" style="${getCharacterInlineStyle()}">
        <img src="/assets/cathappy/lv${characterLevel}.gif" alt="Hero Lv${characterLevel}" class="phase-character-img" draggable="false" onerror="this.onerror=null; this.src='/assets/cathappy/lv${characterLevel}.png';" />
        <div class="character-hitbox" style="${getCharacterHitboxStyle(characterLevel)}"></div>
      </div>
      <section class="${shellClass()}">
        <section class="phasebar" style="display: flex; align-items: center; justify-content: space-between;">
          <ol class="phases" style="flex: 1;">${phaseMarkup(0)}</ol>
          ${soundButtonMarkup()}
        </section>
        <section class="playfield">
          <section class="panel setup-panel">
            <div class="panel-head">
              <p class="phase-tag">${lang.superpowerDraft}</p>
              <div class="panel-title-row">
                <h2 class="phase-title">${lang.selectSuperpowers.replace('{max}', game.maxSkills)}</h2>
                <span class="phase-badge" aria-hidden="true">${eventIconMarkup()}</span>
              </div>
              <div class="phase-body">
                <p>${lang.clickCardForDetails.replace('{max}', game.maxSkills)}</p>
              </div>
            </div>

            <div class="skill-grid inventory-grid">
              ${game.skills.map((skill) => skillCardMarkup(skill)).join("")}
            </div>

            <div class="setup-actions">
              <p class="draft-count">${lang.selected} ${state.skills.length} / ${game.maxSkills}</p>
              <button class="restart start-mission" ${state.skills.length === game.maxSkills ? "" : "disabled"}>${lang.startMission}</button>
            </div>
            ${runIdentity ? `
              <section class="draft-run-preview draft-run-preview--${escapeHtml(runIdentity.key)}" aria-label="Run Identity Preview">
                <p class="mini-label">${lang.runIdentity}</p>
                <h3>${escapeHtml(runIdentity.label)}</h3>
                <p>${escapeHtml(runIdentity.helper)}</p>
                <strong>${escapeHtml(runIdentity.reward)}</strong>
              </section>
            ` : ""}
          </section>
        </section>
      </section>
      ${selectedSkillHandMarkup()}
    </main>
  `;
}

function renderTitle() {
  root.innerHTML = `
    <main class="app phase-enter">
      ${heroMarkup()}
    </main>
  `;
}

function renderStep(step, isEmergency = false) {
  const options = getAvailableOptions(step);
  const characterLevel = Math.min(5, (state.index || 0) + 1);
  const isChaos = !!state.activeChaos;
  const issueLabel = `${step.title} Issue`;

  const characterSrc = isEmergency && state.emergencyCharacterFailed
    ? `/assets/catfail/lv${characterLevel}fail.gif`
    : `/assets/cathappy/lv${characterLevel}.gif`;
  const characterFallback = isEmergency && state.emergencyCharacterFailed
    ? `/assets/catfail/lv${characterLevel}fail.gif`
    : `/assets/cathappy/lv${characterLevel}.png`;

  const eventContent = isChaos ? `
    <section class="event event--active event--issue ${isChaos ? 'chaos-active' : ''}">
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
    <section class="event event--active event--chaos ${isEmergency ? 'emergency-active' : ''}">
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
    <div class="overlay-emergency ${isEmergency ? 'active' : ''}"></div>
    <div class="overlay-chaos ${isChaos ? 'active' : ''}"></div>
    <main class="app phase-enter">
      <div class="phase-character ${characterLevel === 4 ? 'phase-character--lv4' : ''}" aria-hidden="true" style="${getCharacterInlineStyle()}">
        <img src="${characterSrc}" alt="Hero Lv${characterLevel}" class="phase-character-img" draggable="false" onerror="this.onerror=null; this.src='${characterFallback}';" />
        <div class="character-hitbox" style="${getCharacterHitboxStyle(characterLevel, isEmergency && state.emergencyCharacterFailed)}"></div>
      </div>
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
            ${eventContent}

            <div class="choices choices--adaptive action-grid">
              ${options.map((option, index) => choiceCardMarkup(option, index)).join("")}
            </div>

            <p class="panel-footer"></p>
          </section>
        </section>
      </section>
      ${selectedSkillHandMarkup()}
    </main>
  `;

  if (isEmergency && !state.emergencyCharacterFailed) {
    setTimeout(() => {
      state.emergencyCharacterFailed = true;
      const img = root.querySelector('.phase-character-img');
      if (img) {
        img.classList.add('character-glitch-active');
        img.src = `/assets/catfail/lv${characterLevel}fail.gif`;
        img.onerror = () => { img.src = `/assets/catfail/lv${characterLevel}fail.gif`; };
      }
    }, 1500);
  }
}

function resolutionChoiceMeaningMarkup(result) {
  if (!result?.purpose && !result?.solves && !result?.misses) return "";
  const lang = i18n[currentLang];

  return `
              <details class="resolution-card resolution-card--meaning">
                <summary class="mini-label" style="cursor:pointer; display:list-item;">${lang.choiceMeaning}</summary>
                <div style="margin-top: 8px;">
                  ${result.purpose ? `<p><strong>${lang.importantBecause}</strong> ${escapeHtml(result.purpose)}</p>` : ""}
                  ${result.solves ? `<p><strong>${lang.solves}:</strong> ${escapeHtml(result.solves)}</p>` : ""}
                  ${result.misses ? `<p><strong>${lang.tradeoff}:</strong> ${escapeHtml(result.misses)}</p>` : ""}
                </div>
              </details>
  `;
}

function resolutionHintMarkup(result) {
  if (!result?.hint) return "";
  const lang = i18n[currentLang];

  return `
              <details class="resolution-card resolution-card--hint">
                <summary class="mini-label" style="cursor:pointer; display:list-item;">${lang.inPlayHint}</summary>
                <p style="margin-top: 8px;">${escapeHtml(result.hint)}</p>
              </details>
  `;
}

function renderResolution() {
  const result = state.resolution;
  if (!result) return;
  const lang = i18n[currentLang];
  const resolutionLabel = result.isRandomModifier ? lang.externalSignal : result.isMicroEvent ? lang.systemSignal : lang.decisionResult;
  const resolutionToneClass = result.isRandomModifier
    ? `resolution-panel--random resolution-panel--${result.reaction?.tone || "warn"}`
    : result.countered ? "resolution-panel--safe" : "resolution-panel--warn";

  const characterLevel = Math.min(5, (state.index || 0) + 1);
  const isEmergency = state.screen === "emergency_resolution";
  const characterSrc = isEmergency
    ? `/assets/catfail/lv${characterLevel}fail.gif`
    : `/assets/cathappy/lv${characterLevel}.gif`;
  const characterFallback = isEmergency
    ? `/assets/catfail/lv${characterLevel}fail.gif`
    : `/assets/cathappy/lv${characterLevel}.png`;

  root.innerHTML = `
    <main class="app">
      <div class="phase-character ${characterLevel === 4 ? 'phase-character--lv4' : ''}" aria-hidden="true" style="${getCharacterInlineStyle()}">
        <img src="${characterSrc}" alt="Hero Lv${characterLevel}" class="phase-character-img" draggable="false" onerror="this.onerror=null; this.src='${characterFallback}';" />
        <div class="character-hitbox" style="${getCharacterHitboxStyle(characterLevel, isEmergency)}"></div>
      </div>
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
            <div class="resolution-layout">
              <div class="resolution-card reaction-card reaction-card--${result.reaction.tone} resolution-card--primary">
                <p class="mini-label">${lang.reaction}</p>
                <h3>${result.reaction.title}</h3>
                <p>${result.reaction.copy}</p>
              </div>

              <div class="resolution-card resolution-card--event">
                <p class="mini-label">${lang.event}</p>
                <h3>${result.eventTitle}</h3>
                <ul>
                  ${result.lines.map((line) => `<li>${line}</li>`).join("")}
                </ul>
              </div>

              <div class="resolution-card">
                <p class="mini-label">${lang.whatHappened}</p>
                <p>${result.outcome}</p>
                <div class="choice-tags resolution-tags">${tagMarkup(result.tags)}</div>
              </div>

              <div class="resolution-card resolution-card--lesson">
                <p class="mini-label">${lang.lesson}</p>
                <p>${result.lesson}</p>
              </div>
              ${resolutionHintMarkup(result)}
              ${resolutionChoiceMeaningMarkup(result)}
            </div>

            <button class="restart continue-button">${lang.continue}</button>
          </section>
        </section>
      </section>
      ${selectedSkillHandMarkup()}
    </main>
  `;

  if (resolutionToneClass.includes("--warn") && !isEmergency) {
    setTimeout(() => {
      const img = root.querySelector('.phase-character-img');
      if (img) {
        img.classList.add('character-glitch-active');
        img.src = `/assets/catfail/lv${characterLevel}fail.gif`;
        img.onerror = () => { img.src = `/assets/catfail/lv${characterLevel}fail.gif`; };
      }
    }, 600);
  }
}

function getTitleBadge({ failed, protectedEvents, riskyChoices, skillUses, problemsTriggered, overBudget, overtime, workflowScore }) {
  const lang = i18n[currentLang];
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
      label: lang.titleBadgeWorkflowMaster,
      helper: lang.titleBadgeWorkflowMasterHelper,
    };
  }

  if (problemsTriggered.includes("Hardcoded Secrets Leak") && state.risk >= 6) {
    return {
      label: lang.titleBadgeSecurityOops,
      helper: lang.titleBadgeSecurityOopsHelper,
    };
  }

  if (problemsTriggered.includes("Shadow IT Discovery") && (failed || state.risk >= 6)) {
    return {
      label: lang.titleBadgeShadowIT,
      helper: lang.titleBadgeShadowITHelper,
    };
  }

  if (problemsTriggered.includes("Reprompting Loop Trap") && state.time >= 12) {
    return {
      label: lang.titleBadgeDebuggingVictim,
      helper: lang.titleBadgeDebuggingVictimHelper,
    };
  }

  if (!failed && !overBudget && !overtime && skillUses >= 3 && tokenSpent >= 7 && state.risk <= 5) {
    return {
      label: lang.titleBadgeAIConductor,
      helper: lang.titleBadgeAIConductorHelper,
    };
  }

  if (state.time <= 8 && riskyChoices >= 2) {
    return {
      label: lang.titleBadgeSloppySpeedster,
      helper: lang.titleBadgeSloppySpeedsterHelper,
    };
  }

  if (state.time <= 10 && state.risk >= 6) {
    return {
      label: lang.titleBadgeFastButFragile,
      helper: lang.titleBadgeFastButFragileHelper,
    };
  }

  if (tokenSpent >= 12) {
    return {
      label: lang.titleBadgeAIDependent,
      helper: lang.titleBadgeAIDependentHelper,
    };
  }

  if (failed) {
    return {
      label: lang.titleBadgeVictimOfChaos,
      helper: lang.titleBadgeVictimOfChaosHelper,
    };
  }

  if (state.emergencyTriggered) {
    return {
      label: lang.titleBadgeProjectSurvivorEmergency,
      helper: lang.titleBadgeProjectSurvivorEmergencyHelper,
    };
  }

  return {
    label: lang.titleBadgeProjectSurvivor,
      helper: lang.titleBadgeProjectSurvivorHelper,
  };
}

function getWorkflowPattern({ failed, protectedEvents, riskyChoices, skillUses }) {
  const lang = i18n[currentLang];
  const tokenSpent = getTokenSpent();

  if (failed && riskyChoices >= 2) {
    return {
      label: lang.patternRiskHeavy,
      helper: lang.patternRiskHeavyHelper,
    };
  }

  if (protectedEvents >= 2 && riskyChoices <= 1 && getTokenDebt() === 0) {
    return {
      label: lang.patternGuarded,
      helper: lang.patternGuardedHelper,
    };
  }

  if (skillUses >= 3 && tokenSpent >= 9) {
    return {
      label: lang.patternToolHeavy,
      helper: lang.patternToolHeavyHelper,
    };
  }

  if (state.time <= 8 && riskyChoices >= 2) {
    return {
      label: lang.titleBadgeFastButFragile,
      helper: lang.patternFastButFragileHelper,
    };
  }

  return {
    label: lang.patternBalanced,
      helper: lang.patternBalancedHelper,
  };
}

function getScoreVerdict(score, failed, pressure = {}) {
  const lang = i18n[currentLang];
  const tier = getScoreTier(score);
  if (pressure.overBudget && pressure.overtime) {
    return lang.verdictOverBudgetAndTime;
  }
  if (pressure.overBudget) {
    return lang.verdictOverBudget;
  }
  if (pressure.overtime) {
    return lang.verdictOverTime;
  }
  if (state.risk >= game.caps.risk * 0.8) {
    return lang.verdictHighRisk;
  }
  if (failed && score <= 50) return tier.helper;
  return tier.helper;
}

function getScoreTier(score) {
  const lang = i18n[currentLang];
  if (score <= 30) {
    return {
      label: lang.tierWorkflowBreakdown,
      range: "0-30",
      tone: "danger",
      helper: lang.tierWorkflowBreakdownHelper,
      focus: lang.tierWorkflowBreakdownFocus,
    };
  }

  if (score <= 50) {
    return {
      label: lang.tierBarelySurvived,
      range: "31-50",
      tone: "danger",
      helper: lang.tierBarelySurvivedHelper,
      focus: lang.tierBarelySurvivedFocus,
    };
  }

  if (score <= 70) {
    return {
      label: lang.tierWorkingButFragile,
      range: "51-70",
      tone: "warn",
      helper: lang.tierWorkingButFragileHelper,
      focus: lang.tierWorkingButFragileFocus,
    };
  }

  if (score <= 85) {
    return {
      label: lang.tierSolidWorkflow,
      range: "71-85",
      tone: "safe",
      helper: lang.tierSolidWorkflowHelper,
      focus: lang.tierSolidWorkflowFocus,
    };
  }

  return {
    label: lang.titleBadgeWorkflowMaster,
    range: "86-100",
    tone: "safe",
    helper: lang.tierWorkflowMasterHelper,
    focus: lang.tierWorkflowMasterFocus,
  };
}

function getScoreCeilingDetails({ failed, overBudget, overtime, riskyChoices, skillUses }) {
  const lang = i18n[currentLang];
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
    reasons.push(lang.ceilingFailed);
  }

  if (state.risk >= 8) {
    capScore(70, lang.ceilingRisk8);
  } else if (state.risk >= 6) {
    capScore(82, lang.ceilingRisk6);
  }

  if (state.risk >= game.caps.risk) {
    capScore(45, lang.ceilingRiskCap);
  } else if (state.risk >= game.caps.risk * 0.8) {
    capScore(68, lang.ceilingRiskCritical);
  }

  if (overBudget && overtime) {
    capScore(76, lang.ceilingBudgetAndTime);
  } else if (overBudget || overtime) {
    capScore(84, overBudget ? lang.ceilingBudget : lang.ceilingTime);
  }

  if (tokenDebt >= 10) {
    capScore(68, lang.ceilingToken10);
  } else if (tokenDebt >= 5) {
    capScore(76, lang.ceilingToken5);
  } else if (tokenDebt >= 1) {
    capScore(84, lang.ceilingToken1);
  }

  if (timeOverflow >= Math.ceil(game.caps.time * 0.6)) {
    capScore(68, lang.ceilingTimeHeavy);
  } else if (timeOverflow >= Math.ceil(game.caps.time * 0.25)) {
    capScore(76, lang.ceilingTimeModerate);
  } else if (timeOverflow >= 3) {
    capScore(84, lang.ceilingTimeLight);
  }

  if (state.quality < 6) {
    capScore(80, lang.ceilingQuality);
  }

  if (riskyChoices >= 3) {
    capScore(75, lang.ceilingRiskyChoices);
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
    capScore(85, lang.ceilingMasterReady);
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
  const lang = i18n[currentLang];
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
  const crashed = state.risk >= game.caps.risk && state.index < game.steps.length;
  const failed = crashed || state.risk >= game.caps.risk || state.quality < 1 || shippedRiskyShortcut;

  const title = crashed ? lang.resultTitleCrashed : failed ? lang.resultTitleDamaged : lang.resultTitleSurvived;
  const summary = crashed
    ? lang.resultSummaryCrashed
    : failed
      ? lang.resultSummaryDamaged
      : lang.resultSummarySurvived;

  const lesson = crashed
    ? lang.resultLessonCrashed
    : failed
      ? lang.resultLessonDamaged
      : lang.resultLessonSurvived;

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
        label: lang.randomModifierBadgeLabel,
        helper: lang.randomModifierBadgeHelper.replace("{count}", randomModifiers.length),
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
  const lang = i18n[currentLang];
  const items = summaries.map((summary) => `${summary.phase}: ${summary.grade.label} - ${summary.focus}`);
  return reportListMarkup(lang.phaseLearnings, items, lang.noPhaseLearnings);
}

function randomModifiersMarkup(modifiers, lang = i18n[currentLang]) {
  const items = modifiers.map((modifier) => `${modifier.phase}: ${modifier.title} (${formatRandomEffectDelta(modifier.effects)})`);
  return reportListMarkup(lang.randomModifiers, items, lang.noRandomModifiers);
}

function decisionHistoryMarkup(history) {
  const lang = i18n[currentLang];
  if (!history || history.length === 0) return "";
  const items = history.map((item, i) => {
    const label = item.optionLabel || item.title || "Unknown Decision";
    const desc = item.outcome || item.copy || "";
    return `<li><strong>${i + 1}. ${escapeHtml(label)}</strong><br><small>${escapeHtml(desc)}</small></li>`;
  });
  return `
    <article class="report-list-card decision-history-card">
      <span class="mini-label">${lang.playLogTitle}</span>
      <ul style="max-height: 200px; overflow-y: auto;">
        ${items.join("")}
      </ul>
    </article>
  `;
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

function scoreAndGradeMarkup(score, verdict, tier) {
  const digits = String(score).padStart(3, "0").split("");
  return `
    <article class="score-slot score-slot--combined score-slot--${tier.tone}" data-score="${score}">
      <div class="score-slot__left">
        <span class="score-slot__label">Workflow Score</span>
        <div class="score-slot__reels" aria-label="Workflow Score ${score} out of 100">
          ${digits.map((digit) => `<span class="score-slot__digit" data-final="${digit}">0</span>`).join("")}
          <span class="score-slot__max">/100</span>
        </div>
      </div>
      <div class="score-slot__right">
        <span class="score-tier__range">${tier.range}</span>
        <strong>${tier.label}</strong>
        <p>${verdict}</p>
        ${tier.focus ? `<em>${tier.focus}</em>` : ""}
      </div>
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
  const lang = i18n[currentLang];
  const result = getFinalResult();
  const timeTone = getUsageTone(state.time, game.caps.time);
  const tokenFill = game.caps.token > 0
    ? clamp(Math.round((result.tokenRemaining / game.caps.token) * 100), 0, 100)
    : 0;
  const tokenTone = result.overBudget ? "danger" : getTokenResourceTone(tokenFill);
  const riskTone = getRiskTone(state.risk);
  const tokenHelper = result.overBudget
    ? lang.aiBudgetExceededBy.replace("{amount}", result.tokenDebt)
    : lang.aiBudgetWithinLimits;

  const characterLevel = Math.min(5, (state.index || 0) + 1);
  const characterSrc = result.failed
    ? `/assets/catfail/lv${characterLevel}fail.gif`
    : `/assets/cathappy/lv${characterLevel}.gif`;
  const characterFallback = result.failed
    ? `/assets/catfail/lv${characterLevel}fail.gif`
    : `/assets/cathappy/lv${characterLevel}.png`;

  const bgClass = result.failed ? "result-lose-bg" : "result-win-bg";
  const auraClass = result.failed ? "result-lose-aura" : "result-win-aura";

  root.innerHTML = `
    <main class="app phase-enter ${bgClass}">
      <div class="phase-character ${characterLevel === 4 ? 'phase-character--lv4' : ''}" aria-hidden="true" style="${getCharacterInlineStyle()}">
        <img src="${characterSrc}" alt="Hero Lv${characterLevel}" class="phase-character-img ${auraClass}" draggable="false" onerror="this.onerror=null; this.src='${characterFallback}';" />
        <div class="character-hitbox" style="${getCharacterHitboxStyle(characterLevel, result.failed)}"></div>
      </div>
      <section class="${shellClass()}">
        <section class="phasebar" style="display: flex; align-items: center; justify-content: space-between;">
          <ol class="phases" style="flex: 1;">${phaseMarkup(game.steps.length)}</ol>
          ${soundButtonMarkup()}
        </section>
        <section class="playfield">
          <section class="result mission-report ${result.failed ? "fail" : ""}">
            <div class="mission-report__header">
              <div class="header-title-row" style="display: flex; gap: 8px; justify-content: center; align-items: center; margin-top: 4px; flex-wrap: wrap;">
                <span class="title-badge">${result.titleBadge.label}</span>
                <span class="phase-tag" style="margin: 0;">${lang.workflowReport}</span>
                ${result.randomModifierBadge ? `<span class="title-badge title-badge--chaos">${result.randomModifierBadge.label}</span>` : ""}
              </div>
              <h2 class="result-title" style="margin-top: 4px;">${result.title}</h2>
              <p>${result.summary}</p>
              ${scoreAndGradeMarkup(result.workflowScore, result.scoreVerdict, result.scoreTier)}
            </div>

            <div class="mission-report__body">
              <aside class="mission-report__summary">
                <div class="summary-left" style="display: flex; flex-direction: column; gap: 10px; min-width: 0;">
                  <article class="run-pattern run-pattern--${result.failed ? "danger" : "safe"}">
                    <span class="mini-label">${lang.runStyle}</span>
                    <strong>${result.workflowPattern.label}</strong>
                    <p>${result.workflowPattern.helper}</p>
                  </article>

                  <div class="report-signals mission-report__meters">
                    ${reportSignalMarkup({
    icon: "CLK",
    label: lang.time,
    value: `${state.time} / ${game.caps.time}`,
    helper: result.overtime ? lang.deadlineExceededPlan : lang.timeKeptUnderControl,
    tone: timeTone,
  })}
                    ${reportSignalMarkup({
    icon: "AI",
    label: lang.tokenLeft,
    value: `${result.tokenRemaining} / ${game.caps.token}`,
    helper: tokenHelper,
    tone: tokenTone,
  })}
                    ${reportSignalMarkup({
    icon: "RISK",
    label: lang.risk,
    value: `${state.risk} / ${game.caps.risk}`,
    helper: state.risk >= 8 ? lang.projectIsFragile : lang.risksKeptUnderControl,
    tone: riskTone,
  })}
                  </div>

                  <div class="report-evidence-row mission-report__evidence">
                    ${reportEvidenceMarkup(lang.guardrails, result.protectedEvents, lang.evidenceGuardrailsHelper, result.protectedEvents > 0 ? "safe" : "neutral")}
                    ${reportEvidenceMarkup(lang.riskyCalls, result.riskyChoices, lang.evidenceRiskyCallsHelper, result.riskyChoices >= 2 ? "danger" : "neutral")}
                    ${reportEvidenceMarkup(lang.toolUses, result.skillUses, lang.evidenceToolUsesHelper, result.skillUses >= 2 ? "safe" : "neutral")}
                  </div>
                </div>

                <div class="report-lists">
                  ${reportListMarkup(lang.draftedSuperpowers, result.draftedSuperpowers, lang.noDraftedSuperpowers)}
                  ${reportListMarkup(lang.superpowersUsed, result.superpowersUsed, lang.noSuperpowersUsed)}
                  ${reportListMarkup(lang.problemsTriggered, result.problemsTriggered, lang.noProblemsTriggered)}
                  ${phaseLearningsMarkup(result.phaseSummaries)}
                </div>
              </aside>
            </div>

            <div class="mission-report__footer">
              <p class="result-lesson">${result.lesson}</p>
              <button class="restart">${lang.playAgain}</button>
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
  if (state.screen !== "step" || state.activeChaos || state.pendingPhaseMoment) return "";

  const lang = i18n[currentLang];
  const step = getCurrentStep();
  if (!step?.goal || state.seenPhaseGoals.includes(step.id)) return "";
  const runIdentity = getCurrentRunIdentity();

  const guidance = Array.isArray(step.goal.guidance) ? step.goal.guidance.slice(0, 5) : [];
  return `
    <div class="hero-popup-overlay phase-goal-overlay">
      <section class="phase-goal-popup" role="dialog" aria-modal="true" aria-labelledby="phase-goal-title">
        <div class="phase-goal-popup__head">
          <p class="phase-tag">${lang.phaseGoal}</p>
          <span>${lang.phase} ${state.index + 1} ${lang.of} ${getTotalPhaseCount()} · ${escapeHtml(step.title)}</span>
        </div>
        <h2 id="phase-goal-title">${escapeHtml(step.goal.title)}</h2>
        <p class="phase-goal-popup__copy">${escapeHtml(step.goal.copy)}</p>
        ${state.skills.length ? `
          <div class="phase-goal-popup__identity">
            <p class="mini-label">${lang.runIdentity}</p>
            <strong>${escapeHtml(runIdentity.label)}</strong>
            <p>${escapeHtml(runIdentity.reward)}</p>
          </div>
        ` : ""}
        ${guidance.length
      ? `
            <div class="phase-goal-popup__guidance">
              <p class="mini-label">${lang.guidance}</p>
              <ol>
                ${guidance.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ol>
            </div>
          `
      : ""}
        <button class="restart phase-goal-start" type="button">${lang.continue}</button>
      </section>
    </div>
  `;
}

function phaseMomentPopupMarkup() {
  if (state.screen !== "step" || !state.pendingPhaseMoment) return "";

  const lang = i18n[currentLang];
  const moment = state.pendingPhaseMoment;
  return `
    <div class="hero-popup-overlay phase-goal-overlay phase-moment-overlay">
      <section class="phase-goal-popup phase-moment-popup phase-moment-popup--${escapeHtml(moment.tone || "safe")}" role="dialog" aria-modal="true" aria-labelledby="phase-moment-title">
        <div class="phase-goal-popup__head">
          <p class="phase-tag">${lang.phaseClear}</p>
          <span>${escapeHtml(moment.phase)} · ${lang.grade} ${escapeHtml(moment.grade?.label || "-")}</span>
        </div>
        <h2 id="phase-moment-title">${escapeHtml(moment.badge || lang.phaseClear)}</h2>
        <p class="phase-goal-popup__copy">${escapeHtml(moment.copy || "")}</p>
        <div class="phase-goal-popup__identity">
          <p class="mini-label">${escapeHtml(moment.title || lang.continue)}</p>
          <p>${escapeHtml(moment.focus || lang.carryRhythm)}</p>
        </div>
        <button class="restart phase-moment-start" type="button">${lang.continue}</button>
      </section>
    </div>
  `;
}

function tutorialMarkup() {
  if (!state.showTutorial) return "";
  const lang = i18n[currentLang];
  const pages = currentLang === 'th' ? [
    { title: "ยินดีต้อนรับสู่ Project Survival", content: "คุณคือผู้พัฒนาที่ต้องรับผิดชอบโปรเจกต์สำคัญ การตัดสินใจของคุณจะชี้ชะตาว่าโปรเจกต์นี้จะรอดหรือจะร่วง" },
    { title: "บริหารจัดการทรัพยากร", content: "สังเกตแถบสถานะของคุณให้ดี:<br><br><b>เวลา (Time):</b> จะลดลงเมื่อคุณทำงาน หากใช้เวลาเกินกำหนด ความเสี่ยงจะเพิ่มขึ้น<br><b>Token:</b> งบประมาณ AI ของคุณ หากใช้มากเกินไป คุณภาพโค้ดจะแย่ลง<br><b>ความเสี่ยง (Risk):</b> หากความเสี่ยงถึง 100% โปรเจกต์จะล่มทันที" },
    { title: "ตัดสินใจให้ถูกต้อง", content: "แต่ละเฟสจะมีความท้าทายที่แตกต่างกัน คุณจะต้องเลือก 3 skills ก่อนเริ่มงาน จงใช้มันอย่างฉลาดเพื่อบริหารทรัพยากรและปกป้องโปรเจกต์ของคุณ" }
  ] : [
    { title: "Welcome to Project Survival", content: "You are a developer handling a critical project. Your choices will determine whether the project ships successfully or crashes and burns." },
    { title: "Managing Resources", content: "Pay attention to your Resource Bar:<br><br><b>Time:</b> Runs out as you work. Overtime increases Risk.<br><b>Token:</b> Your AI Budget. Using too much reduces code Quality.<br><b>Risk:</b> If Risk reaches 100%, the project fails." },
    { title: "Make the Right Decisions", content: "Each phase presents different challenges. You will select 3 skills before starting. Use them wisely to manage your resources and protect the project." }
  ];
  const page = pages[state.tutorialPage];

  return `
    <div class="hero-popup-overlay tutorial-overlay">
      <div class="hero-popup-content tutorial-popup">
        <div class="tutorial-header">
          <p class="phase-tag">${lang.tutorial} ${state.tutorialPage + 1}/3</p>
          <h2>${page.title}</h2>
        </div>
        <div class="tutorial-body">
          <p>${page.content}</p>
        </div>
        <div class="tutorial-actions">
          ${state.tutorialPage > 0 ? `<button class="restart tutorial-prev" type="button">${lang.back}</button>` : ''}
          <button class="restart tutorial-next" type="button">${state.tutorialPage === 2 ? lang.startDraft : lang.next}</button>
        </div>
      </div>
    </div>
  `;
}
function renderEvolution() {
  const lang = i18n[currentLang];
  const getEvolutionSpriteLayout = (lv) => {
    const spriteMetrics = {
      1: { width: 1774, height: 887, bbox: [350, 300, 689, 681] },
      2: { width: 1774, height: 887, bbox: [587, 289, 1038, 694] },
      3: { width: 1774, height: 887, bbox: [757, 210, 1062, 719] },
      4: { width: 1774, height: 887, bbox: [410, 135, 1009, 819] },
      5: { width: 1419, height: 709, bbox: [512, 148, 906, 615] },
    };
    const metrics = spriteMetrics[lv];
    if (!metrics) {
      return { height: 360, shiftX: 0, shiftY: 0 };
    }

    const [left, top, right, bottom] = metrics.bbox;
    const spriteWidth = right - left;
    const spriteHeight = bottom - top;
    const targetVisibleHeight = 210;
    const scale = targetVisibleHeight / spriteHeight;
    const renderHeight = metrics.height * scale;
    const spriteCenterX = left + spriteWidth / 2;
    const spriteCenterY = top + spriteHeight / 2;
    const canvasCenterX = metrics.width / 2;
    const canvasCenterY = metrics.height / 2;

    return {
      height: renderHeight,
      shiftX: (canvasCenterX - spriteCenterX) * scale,
      shiftY: (canvasCenterY - spriteCenterY) * scale,
    };
  };

  const oldLayout = getEvolutionSpriteLayout(state.evolutionOldLevel);
  const newLayout = getEvolutionSpriteLayout(state.evolutionNewLevel);

  root.innerHTML = `
    <main class="app evolution-scene">
      <div class="evolution-container">
        <div class="evolution-flash" aria-hidden="true"></div>
        <div class="evolution-character old-character" aria-hidden="true" style="--evo-shift-x:${oldLayout.shiftX.toFixed(2)}px; --evo-shift-y:${oldLayout.shiftY.toFixed(2)}px; --evo-height:${oldLayout.height.toFixed(2)}px;">
          <img src="/assets/cathappy/lv${state.evolutionOldLevel}.gif" alt="Evolving..." onerror="this.onerror=null; this.src='/assets/cathappy/lv${state.evolutionOldLevel}.png';" />
        </div>
        <div class="evolution-character new-character" aria-hidden="true" style="--evo-shift-x:${newLayout.shiftX.toFixed(2)}px; --evo-shift-y:${newLayout.shiftY.toFixed(2)}px; --evo-height:${newLayout.height.toFixed(2)}px;">
          <img src="/assets/cathappy/lv${state.evolutionNewLevel}.gif" alt="Evolution Complete!" onerror="this.onerror=null; this.src='/assets/cathappy/lv${state.evolutionNewLevel}.png';" />
        </div>
      </div>
      <div class="evolution-text" style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
        <h2>${lang.evolving}</h2>
        <button class="evolution-next-btn btn primary-btn" style="display:none; z-index: 100;">${lang.continueNextWorkflow}</button>
      </div>
    </main>
  `;

  // Start sequence
  setTimeout(() => {
    const flash = root.querySelector('.evolution-flash');
    if (flash) flash.classList.add('flash-active');

    setTimeout(() => {
      // Swap midway through flash
      const oldChar = root.querySelector('.old-character');
      const newChar = root.querySelector('.new-character');
      if (oldChar) oldChar.style.opacity = '0';
      if (newChar) {
        newChar.style.opacity = '1';
        newChar.classList.add('pop-active');
      }

      const title = root.querySelector('.evolution-text h2');
      if (title) {
        title.innerText = lang.levelReached.replace("{level}", state.evolutionNewLevel);
        title.classList.add('glow-text');
      }

      const btn = root.querySelector('.evolution-next-btn');
      if (btn) btn.style.display = 'block';
    }, 1000); // 1s into the flash
  }, 2000); // 2s of shaking before flash

  root.querySelector('.evolution-next-btn')?.addEventListener('click', () => {
    state.characterPos = null;
    state.screen = state.index >= game.steps.length ? "result" : "step";
    render();
  });
}

function render() {
  if (state.screen === "title") {
    renderTitle();
  } else if (state.screen === "stage_select") {
    renderStageSelect();
  } else if (state.screen === "setup") {
    renderSetup();
  } else if (state.screen === "resolution") {
    renderResolution();
  } else if (state.screen === "result") {
    renderResult();
  } else if (state.screen === "evolution") {
    renderEvolution();
  } else if (state.screen === "emergency_step") {
    renderStep(game.emergencyStep, true);
  } else if (state.screen === "emergency_resolution") {
    renderResolution();
  } else {
    const step = getCurrentStep();
    if (!step) {
      state.characterPos = null;
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

  const tutorialHtml = tutorialMarkup();
  if (tutorialHtml) {
    root.insertAdjacentHTML("beforeend", tutorialHtml);
  }

  const phaseGoalPopup = phaseGoalPopupMarkup();
  if (phaseGoalPopup) {
    root.insertAdjacentHTML("beforeend", phaseGoalPopup);
  }

  const phaseMomentPopup = phaseMomentPopupMarkup();
  if (phaseMomentPopup) {
    root.insertAdjacentHTML("beforeend", phaseMomentPopup);
  }

  renderSkillDetailPopup();
}

export function mountLegacyGame(container) {
  root = container;
  state = createInitialState();
  window.__game = {
    state,
    render,
    renderResult
  };

  // --- TOYS PHYSICS ENGINE ---
  let toyLayer = document.getElementById("toy-layer");
  if (!toyLayer) {
    toyLayer = document.createElement("div");
    toyLayer.id = "toy-layer";
    document.body.appendChild(toyLayer);
  } else {
    toyLayer.innerHTML = "";
  }

  let toys = [];
  let physicsRaf = null;
  let draggedToy = null;
  let lastMouse = { x: window.innerWidth/2, y: window.innerHeight/2, vx: 0, vy: 0 };

  const spawnToy = (x, y, typeClass, innerText = "") => {
    if (toys.length > 50) {
      const oldToy = toys.shift();
      if (oldToy.el && oldToy.el.parentNode) oldToy.el.parentNode.removeChild(oldToy.el);
    }
    const el = document.createElement("div");
    el.className = `game-toy ${typeClass}`;
    el.innerText = innerText;
    toyLayer.appendChild(el);
    const size = typeClass === "toy-yarn" ? 60 : 32;
    toys.push({
      el, x, y, size,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      angle: 0,
      va: (Math.random() - 0.5) * 20
    });
  };

  spawnToy(window.innerWidth / 2, 50, "toy-yarn");

  const physicsLoop = () => {
    toys.forEach(toy => {
      if (draggedToy === toy) return;
      
      toy.vy += 0.8; // Gravity
      toy.x += toy.vx;
      toy.y += toy.vy;
      toy.angle += toy.va;
      
      // Friction
      toy.vx *= 0.98;
      toy.vy *= 0.98;
      toy.va *= 0.98;

      // Floor collision
      if (toy.y + toy.size > window.innerHeight) {
        toy.y = window.innerHeight - toy.size;
        toy.vy *= -0.65; // Bounce
        toy.vx *= 0.9; // Ground friction
        toy.va *= 0.9;
      }
      
      // Wall collision
      if (toy.x < 0) {
        toy.x = 0;
        toy.vx *= -0.8;
      } else if (toy.x + toy.size > window.innerWidth) {
        toy.x = window.innerWidth - toy.size;
        toy.vx *= -0.8;
      }

      toy.el.style.transform = `translate(${toy.x}px, ${toy.y}px) rotate(${toy.angle}deg)`;
    });

    physicsRaf = requestAnimationFrame(physicsLoop);
  };
  physicsRaf = requestAnimationFrame(physicsLoop);
  // ---------------------------

  let isDraggingCat = false;
  let catDragOffsetX = 0;
  let catDragOffsetY = 0;
  let draggedElement = null;

  const onPointerDown = (e) => {
    const target = e.target;
    
    // Check if dragging a toy
    if (target.classList.contains("game-toy")) {
      const toy = toys.find(t => t.el === target);
      if (toy) {
        draggedToy = toy;
        target.setPointerCapture(e.pointerId);
        return;
      }
    }

    if (target.classList.contains("character-hitbox")) {
      isDraggingCat = true;
      draggedElement = target.parentElement;
      const rect = draggedElement.getBoundingClientRect();

      if (!state.characterPos) {
        state.characterPos = { x: rect.left, y: rect.top };
      }

      catDragOffsetX = e.clientX - state.characterPos.x;
      catDragOffsetY = e.clientY - state.characterPos.y;
      draggedElement.setPointerCapture(e.pointerId);

      draggedElement.style.position = "fixed";
      draggedElement.style.left = state.characterPos.x + "px";
      draggedElement.style.top = state.characterPos.y + "px";
      draggedElement.style.zIndex = "9999";
      draggedElement.style.margin = "0";
      draggedElement.style.transform = "none";
      draggedElement.style.transition = "none";
      draggedElement.style.setProperty("cursor", "var(--cursor-grabbing)", "important");
      document.body.style.setProperty("cursor", "var(--cursor-grabbing)", "important");
    }
  };

  const onPointerMove = (e) => {
    lastMouse.vx = e.clientX - lastMouse.x;
    lastMouse.vy = e.clientY - lastMouse.y;
    lastMouse.x = e.clientX;
    lastMouse.y = e.clientY;

    if (draggedToy) {
      draggedToy.x = e.clientX - draggedToy.size / 2;
      draggedToy.y = e.clientY - draggedToy.size / 2;
      draggedToy.el.style.transform = `translate(${draggedToy.x}px, ${draggedToy.y}px) rotate(${draggedToy.angle}deg)`;
      return;
    }

    if (isDraggingCat && draggedElement) {
      let newX = e.clientX - catDragOffsetX;
      let newY = e.clientY - catDragOffsetY;

      const hitbox = draggedElement.querySelector(".character-hitbox");
      let W = 200, H = 200; // defaults
      if (hitbox) {
        const rect = draggedElement.getBoundingClientRect();
        W = rect.width;
        H = rect.height;

        const hitboxLeftPct = parseFloat(hitbox.style.left) || 0;
        const hitboxTopPct = parseFloat(hitbox.style.top) || 0;
        const hitboxWidthPct = parseFloat(hitbox.style.width) || 0;
        const hitboxHeightPct = parseFloat(hitbox.style.height) || 0;

        const hLeft = (hitboxLeftPct / 100) * W;
        const hTop = (hitboxTopPct / 100) * H;
        const hWidth = (hitboxWidthPct / 100) * W;
        const hHeight = (hitboxHeightPct / 100) * H;

        const minX = -hLeft;
        const maxX = window.innerWidth - hWidth - hLeft;
        const minY = -hTop;
        const maxY = window.innerHeight - hHeight - hTop;

        newX = clamp(newX, minX, maxX);
        newY = clamp(newY, minY, maxY);
      }

      state.characterPos = { x: newX, y: newY };

      // Cat hits toys!
      toys.forEach(toy => {
        const dx = (toy.x + toy.size/2) - (newX + W/2);
        const dy = (toy.y + toy.size/2) - (newY + H/2);
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < toy.size/2 + 100) {
          toy.vx += dx * 0.05;
          toy.vy += dy * 0.05;
          toy.va += (Math.random() - 0.5) * 30;
        }
      });

      const catEls = document.querySelectorAll(".phase-character, .start-character");
      catEls.forEach(el => {
        el.style.position = "fixed";
        el.style.left = newX + "px";
        el.style.top = newY + "px";
        el.style.zIndex = "9999";
        el.style.margin = "0";
        el.style.transform = "none";
        el.style.transition = "none";
        el.style.setProperty("cursor", "var(--cursor-grabbing)", "important");
      });
    }
  };

  const onPointerUp = (e) => {
    if (draggedToy) {
      draggedToy.vx = clamp(lastMouse.vx * 0.8, -40, 40);
      draggedToy.vy = clamp(lastMouse.vy * 0.8, -40, 40);
      try { draggedToy.el.releasePointerCapture(e.pointerId); } catch(err){}
      draggedToy = null;
    }

    if (isDraggingCat) {
      isDraggingCat = false;
      document.body.style.cursor = "";
      if (draggedElement) {
        if (draggedElement.releasePointerCapture) {
          try {
            draggedElement.releasePointerCapture(e.pointerId);
          } catch (err) { }
        }
        draggedElement = null;
      }
      const catEls = document.querySelectorAll(".phase-character, .start-character");
      catEls.forEach(el => {
        el.style.cursor = "var(--cursor-grab)";
      });
    }
  };

  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);

  const enhancedRootClick = (event) => {
    const target = event.target;
    const isInteractive = target.closest("button, .choice, .stage-card, .skill-card, .superpower-hand__card, .phase-goal-start, .lang-btn, .game-toy, .playfield");
    if (!isInteractive && !(target instanceof HTMLImageElement)) {
      const emojis = ["☕", "🐟", "🐛", "📄", "📎", "📦"];
      spawnToy(event.clientX - 16, event.clientY - 16, "toy-emoji", emojis[Math.floor(Math.random() * emojis.length)]);
    }
    handleRootClick(event);
  };

  root.addEventListener("click", enhancedRootClick);
  render();

  return () => {
    document.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);

    if (physicsRaf) cancelAnimationFrame(physicsRaf);
    if (toyLayer) toyLayer.innerHTML = "";

    if (root === container) {
      root.removeEventListener("click", enhancedRootClick);
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
