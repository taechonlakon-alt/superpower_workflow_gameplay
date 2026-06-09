import test from "node:test";
import assert from "node:assert/strict";

import {
  getEvolutionPerk,
  getPhaseMoment,
  getPhasePresentation,
  getRunIdentity,
  getRunMood,
} from "./gameFeel.js";

const thText = {
  runIdentityGuardrailLabel: "สายการ์ดหนา",
  phaseMomentPerfectCounterBadge: "สวนกลับเป๊ะ",
  phaseMomentShakyClearBadge: "ผ่านแบบสั่น ๆ",
  evolutionPerkGuardrailLabel: "โบนัสรีวิวแน่น",
  evolutionPerkGuardrailCopy: "เฟสถัดไปได้แรงใจจากการ์ดหนา ช่วยคุมปลายทางให้ไม่หลุดง่าย",
  evolutionPerkBalancedLabel: "โมเมนตัมสมดุล",
  evolutionPerkBalancedCopy: "เฟสถัดไปเล่นลื่นขึ้น เพราะรันยังไม่เอียงไปทางใดทางหนึ่งมากเกินไป",
  runMoodStableLabel: "นิ่งพอเดินเกม",
  runMoodStableCopy: "ยังคุมทรงได้ และมีพื้นที่ให้วางจังหวะต่อ",
  runMoodTenseLabel: "เริ่มกดดัน",
  runMoodTenseCopy: "ทรัพยากรเริ่มตึง ต้องเล่นแม่นขึ้น",
  runMoodCriticalLabel: "โหมดวิกฤต",
  runMoodCriticalCopy: "ถ้ายังเร่งต่อแบบเดิม มีสิทธิ์พังทั้งรัน",
  runMoodSurgingLabel: "กำลังเข้าฟอร์ม",
  runMoodSurgingCopy: "รันเริ่มติดเครื่อง เหมาะกับการต่อยอดจังหวะดี ๆ",
  phasePresentationBrainstormLabel: "อ่านเกมและเปิดหมอก",
  phasePresentationPlanLabel: "ล็อกแผนให้คม",
  phasePresentationExecuteLabel: "เร่งพร้อมคุมแตก",
  phasePresentationReviewLabel: "จับผิดก่อนส่ง",
};

test("getRunIdentity returns themed build for guardrail trio", () => {
  const result = getRunIdentity(["spec", "tdd", "code_review"], thText);

  assert.equal(result.key, "guardrail");
  assert.equal(result.label, "สายการ์ดหนา");
});

test("getRunIdentity falls back to balanced run", () => {
  const result = getRunIdentity(["grill"]);

  assert.equal(result.key, "balanced");
});

test("getPhaseMoment rewards a perfect counter phase", () => {
  const result = getPhaseMoment({
    phase: "Execute",
    grade: { label: "A" },
    riskyChoices: 0,
    counteredEvents: 1,
    skillUses: 1,
    effects: { risk: 0, time: 2, token: 1 },
  }, thText);

  assert.equal(result.badge, "สวนกลับเป๊ะ");
  assert.equal(result.tone, "safe");
});

test("getPhaseMoment warns on a shaky clear", () => {
  const result = getPhaseMoment({
    phase: "Review",
    grade: { label: "C" },
    riskyChoices: 1,
    counteredEvents: 0,
    skillUses: 0,
    effects: { risk: 2, time: 5, token: 4 },
  }, thText);

  assert.equal(result.badge, "ผ่านแบบสั่น ๆ");
  assert.equal(result.tone, "warn");
});

test("getRunMood marks stable runs as surging after a strong phase clear", () => {
  const result = getRunMood({
    risk: 1,
    tokenDebt: 0,
    time: 4,
    lastSignalTone: "stable",
    pendingPhaseMomentTone: "safe",
  }, thText);

  assert.equal(result.key, "surging");
  assert.equal(result.label, "กำลังเข้าฟอร์ม");
});

test("getRunMood marks high pressure runs as critical", () => {
  const result = getRunMood({
    risk: 8,
    tokenDebt: 2,
    time: 17,
    lastSignalTone: "critical",
    pendingPhaseMomentTone: null,
  }, thText);

  assert.equal(result.key, "critical");
  assert.equal(result.label, "โหมดวิกฤต");
});

test("getEvolutionPerk returns identity-specific perk copy", () => {
  const result = getEvolutionPerk("guardrail", 3, thText);

  assert.equal(result.key, "guardrail");
  assert.equal(result.label, "โบนัสรีวิวแน่น");
});

test("getPhasePresentation maps execute to a pressure-forward presentation", () => {
  const result = getPhasePresentation("execute", thText);

  assert.equal(result.key, "execute");
  assert.equal(result.label, "เร่งพร้อมคุมแตก");
});
