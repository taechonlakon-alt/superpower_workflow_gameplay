function getTexts(text = {}) {
  return {
    runIdentityGuardrailLabel: text.runIdentityGuardrailLabel || "Guardrail Build",
    runIdentityGuardrailHelper: text.runIdentityGuardrailHelper || "Win through clarity, review speed, and early risk control.",
    runIdentityGuardrailReward: text.runIdentityGuardrailReward || "Chase Perfect Clear and Clean Review rewards.",
    runIdentityClarityLabel: text.runIdentityClarityLabel || "Clarity First",
    runIdentityClarityHelper: text.runIdentityClarityHelper || "Clear the problem first, then accelerate from solid ground.",
    runIdentityClarityReward: text.runIdentityClarityReward || "Try to finish each phase without scope drift.",
    runIdentitySafetyLabel: text.runIdentitySafetyLabel || "Safety Net Run",
    runIdentitySafetyHelper: text.runIdentitySafetyHelper || "Spot trouble before it breaks and catch edge cases in time.",
    runIdentitySafetyReward: text.runIdentitySafetyReward || "Chase counter rewards and reduce hidden damage.",
    runIdentitySteadyLabel: text.runIdentitySteadyLabel || "Steady Builder",
    runIdentitySteadyHelper: text.runIdentitySteadyHelper || "Control sequence and scope so the run stays steady.",
    runIdentitySteadyReward: text.runIdentitySteadyReward || "Keep Time and Token balanced through every phase.",
    runIdentityInfraLabel: text.runIdentityInfraLabel || "Infra Caution",
    runIdentityInfraHelper: text.runIdentityInfraHelper || "Play carefully and do not touch real systems without evidence.",
    runIdentityInfraReward: text.runIdentityInfraReward || "Chase a low-risk run and avoid emergency mode.",
    runIdentityBalancedLabel: text.runIdentityBalancedLabel || "Balanced Run",
    runIdentityBalancedHelper: text.runIdentityBalancedHelper || "Play the middle line and survive without rushing too hard.",
    runIdentityBalancedReward: text.runIdentityBalancedReward || "Find a win while keeping resources stable.",
    phaseMomentPerfectCounterBadge: text.phaseMomentPerfectCounterBadge || "Perfect Counter",
    phaseMomentPerfectCounterCopy: text.phaseMomentPerfectCounterCopy || "You cleared this phase cleanly and stopped the pressure before it spread.",
    phaseMomentWorkflowLockedBadge: text.phaseMomentWorkflowLockedBadge || "Workflow Locked",
    phaseMomentWorkflowLockedCopy: text.phaseMomentWorkflowLockedCopy || "The team is starting to click. Tools were used at the right weight and resources stayed under control.",
    phaseMomentShakyClearBadge: text.phaseMomentShakyClearBadge || "Shaky Clear",
    phaseMomentShakyClearCopy: text.phaseMomentShakyClearCopy || "You got through this phase, but cracks are starting to show. If you rush the next one, the late game may punish it.",
    phaseMomentDangerBadge: text.phaseMomentDangerBadge || "Danger Spike",
    phaseMomentDangerCopy: text.phaseMomentDangerCopy || "This phase hurt badly. The next phase should focus on damage control, not hope.",
    phaseMomentDefaultBadge: text.phaseMomentDefaultBadge || "Phase Clear",
    phaseMomentDefaultCopy: text.phaseMomentDefaultCopy || "You made it through this phase and still have room to shape the run from here.",
    phaseMomentLockedInSuffix: text.phaseMomentLockedInSuffix || "locked in",
    phaseMomentUnderControlSuffix: text.phaseMomentUnderControlSuffix || "under control",
    phaseMomentBarelyHeldSuffix: text.phaseMomentBarelyHeldSuffix || "barely held",
    phaseMomentSlippedHardSuffix: text.phaseMomentSlippedHardSuffix || "slipped hard",
    phaseMomentCompleteSuffix: text.phaseMomentCompleteSuffix || "complete",
    runMoodStableLabel: text.runMoodStableLabel || "Stable Tempo",
    runMoodStableCopy: text.runMoodStableCopy || "The run is holding together and still has room to plan ahead.",
    runMoodTenseLabel: text.runMoodTenseLabel || "Pressure Rising",
    runMoodTenseCopy: text.runMoodTenseCopy || "Resources are tightening. The next call needs to be cleaner.",
    runMoodCriticalLabel: text.runMoodCriticalLabel || "Critical Mode",
    runMoodCriticalCopy: text.runMoodCriticalCopy || "The run is close to collapse. One more sloppy shortcut may break it.",
    runMoodSurgingLabel: text.runMoodSurgingLabel || "Run Surging",
    runMoodSurgingCopy: text.runMoodSurgingCopy || "Momentum is building. This is the time to chain a clean phase into the next one.",
    evolutionPerkGuardrailLabel: text.evolutionPerkGuardrailLabel || "Review Shield",
    evolutionPerkGuardrailCopy: text.evolutionPerkGuardrailCopy || "Next phase gets a calmer landing because your guardrails are already doing work.",
    evolutionPerkBalancedLabel: text.evolutionPerkBalancedLabel || "Steady Tempo",
    evolutionPerkBalancedCopy: text.evolutionPerkBalancedCopy || "Next phase starts smoother because the run stayed balanced.",
    evolutionPerkClarityLabel: text.evolutionPerkClarityLabel || "Clear Briefing",
    evolutionPerkClarityCopy: text.evolutionPerkClarityCopy || "A clearer run gives the next phase less noise and less needless drift.",
    evolutionPerkSafetyLabel: text.evolutionPerkSafetyLabel || "Safety Buffer",
    evolutionPerkSafetyCopy: text.evolutionPerkSafetyCopy || "Your next phase gets a little breathing room against hidden problems.",
    evolutionPerkSteadyLabel: text.evolutionPerkSteadyLabel || "Plan Momentum",
    evolutionPerkSteadyCopy: text.evolutionPerkSteadyCopy || "The next phase inherits your controlled pace and wastes less energy.",
    evolutionPerkInfraLabel: text.evolutionPerkInfraLabel || "Approval Gate",
    evolutionPerkInfraCopy: text.evolutionPerkInfraCopy || "Your next phase begins more cautiously, reducing the chance of a messy spike.",
    phasePresentationBrainstormLabel: text.phasePresentationBrainstormLabel || "Clear the fog",
    phasePresentationBrainstormCopy: text.phasePresentationBrainstormCopy || "Use this phase to reduce unknowns before you commit.",
    phasePresentationPlanLabel: text.phasePresentationPlanLabel || "Lock the route",
    phasePresentationPlanCopy: text.phasePresentationPlanCopy || "This phase should feel like commitment, not exploration.",
    phasePresentationExecuteLabel: text.phasePresentationExecuteLabel || "Push with control",
    phasePresentationExecuteCopy: text.phasePresentationExecuteCopy || "Speed matters here, but mistakes snowball faster too.",
    phasePresentationReviewLabel: text.phasePresentationReviewLabel || "Catch the cracks",
    phasePresentationReviewCopy: text.phasePresentationReviewCopy || "The final check should feel tense, careful, and evidence-driven.",
  };
}

export function getRunIdentity(skillIds = [], text = {}) {
  const ids = Array.isArray(skillIds) ? skillIds : [];
  const has = (id) => ids.includes(id);
  const t = getTexts(text);

  if (has("spec") && has("tdd") && has("code_review")) {
    return {
      key: "guardrail",
      label: t.runIdentityGuardrailLabel,
      helper: t.runIdentityGuardrailHelper,
      reward: t.runIdentityGuardrailReward,
    };
  }

  if (has("grill") && has("context") && has("spec")) {
    return {
      key: "clarity",
      label: t.runIdentityClarityLabel,
      helper: t.runIdentityClarityHelper,
      reward: t.runIdentityClarityReward,
    };
  }

  if (has("walkthrough") && has("risk_scanner") && has("scaffolds")) {
    return {
      key: "safety",
      label: t.runIdentitySafetyLabel,
      helper: t.runIdentitySafetyHelper,
      reward: t.runIdentitySafetyReward,
    };
  }

  if (has("plan_doc") && has("scaffolds") && has("context")) {
    return {
      key: "steady",
      label: t.runIdentitySteadyLabel,
      helper: t.runIdentitySteadyHelper,
      reward: t.runIdentitySteadyReward,
    };
  }

  if (has("terraform_skill") && has("risk_scanner")) {
    return {
      key: "infra",
      label: t.runIdentityInfraLabel,
      helper: t.runIdentityInfraHelper,
      reward: t.runIdentityInfraReward,
    };
  }

  return {
    key: "balanced",
    label: t.runIdentityBalancedLabel,
    helper: t.runIdentityBalancedHelper,
    reward: t.runIdentityBalancedReward,
  };
}

export function getPhaseMoment(summary, text = {}) {
  if (!summary) {
    return null;
  }

  const t = getTexts(text);
  const { phase, grade, riskyChoices = 0, counteredEvents = 0, skillUses = 0, effects = {} } = summary;
  const cleanPhase = riskyChoices === 0 && (effects.risk || 0) <= 0;
  const efficientPhase = (effects.time || 0) <= 3 && (effects.token || 0) <= 3;

  if (grade?.label === "A" && cleanPhase && counteredEvents > 0) {
    return {
      tone: "safe",
      badge: t.phaseMomentPerfectCounterBadge,
      title: `${phase} ${t.phaseMomentLockedInSuffix}`,
      copy: t.phaseMomentPerfectCounterCopy,
    };
  }

  if ((grade?.label === "A" || grade?.label === "B") && skillUses >= 1 && efficientPhase) {
    return {
      tone: "safe",
      badge: t.phaseMomentWorkflowLockedBadge,
      title: `${phase} ${t.phaseMomentUnderControlSuffix}`,
      copy: t.phaseMomentWorkflowLockedCopy,
    };
  }

  if (grade?.label === "C") {
    return {
      tone: "warn",
      badge: t.phaseMomentShakyClearBadge,
      title: `${phase} ${t.phaseMomentBarelyHeldSuffix}`,
      copy: t.phaseMomentShakyClearCopy,
    };
  }

  if (grade?.label === "D" || grade?.label === "F") {
    return {
      tone: "danger",
      badge: t.phaseMomentDangerBadge,
      title: `${phase} ${t.phaseMomentSlippedHardSuffix}`,
      copy: t.phaseMomentDangerCopy,
    };
  }

  return {
    tone: "safe",
    badge: t.phaseMomentDefaultBadge,
    title: `${phase} ${t.phaseMomentCompleteSuffix}`,
    copy: t.phaseMomentDefaultCopy,
  };
}

export function getRunMood({ risk = 0, tokenDebt = 0, time = 0, lastSignalTone = "stable", pendingPhaseMomentTone = null } = {}, text = {}) {
  const t = getTexts(text);

  if (pendingPhaseMomentTone === "safe" && risk <= 2 && tokenDebt === 0 && time <= 8) {
    return {
      key: "surging",
      label: t.runMoodSurgingLabel,
      copy: t.runMoodSurgingCopy,
    };
  }

  if (lastSignalTone === "critical" || risk >= 8 || tokenDebt > 0 || time >= 16) {
    return {
      key: "critical",
      label: t.runMoodCriticalLabel,
      copy: t.runMoodCriticalCopy,
    };
  }

  if (lastSignalTone === "tense" || risk >= 4 || time >= 10) {
    return {
      key: "tense",
      label: t.runMoodTenseLabel,
      copy: t.runMoodTenseCopy,
    };
  }

  return {
    key: "stable",
    label: t.runMoodStableLabel,
    copy: t.runMoodStableCopy,
  };
}

export function getEvolutionPerk(identityKey = "balanced", newLevel = 1, text = {}) {
  const t = getTexts(text);
  const levelBonus = newLevel >= 4 ? 2 : 1;

  const perkByIdentity = {
    guardrail: {
      key: "guardrail",
      label: t.evolutionPerkGuardrailLabel,
      copy: t.evolutionPerkGuardrailCopy,
      effects: { risk: -levelBonus, quality: 1, token: 0, time: 0 },
    },
    clarity: {
      key: "clarity",
      label: t.evolutionPerkClarityLabel,
      copy: t.evolutionPerkClarityCopy,
      effects: { risk: -1, quality: 1, token: 0, time: 0 },
    },
    safety: {
      key: "safety",
      label: t.evolutionPerkSafetyLabel,
      copy: t.evolutionPerkSafetyCopy,
      effects: { risk: -1, quality: levelBonus, token: 0, time: 0 },
    },
    steady: {
      key: "steady",
      label: t.evolutionPerkSteadyLabel,
      copy: t.evolutionPerkSteadyCopy,
      effects: { risk: -1, quality: 0, token: 0, time: -1 },
    },
    infra: {
      key: "infra",
      label: t.evolutionPerkInfraLabel,
      copy: t.evolutionPerkInfraCopy,
      effects: { risk: -levelBonus, quality: 0, token: 0, time: 0 },
    },
    balanced: {
      key: "balanced",
      label: t.evolutionPerkBalancedLabel,
      copy: t.evolutionPerkBalancedCopy,
      effects: { risk: -1, quality: 1, token: 0, time: 0 },
    },
  };

  return perkByIdentity[identityKey] || perkByIdentity.balanced;
}

export function getPhasePresentation(stepId = "", text = {}) {
  const t = getTexts(text);
  const key = String(stepId || "").toLowerCase();
  const map = {
    brainstorm: {
      key: "brainstorm",
      label: t.phasePresentationBrainstormLabel,
      copy: t.phasePresentationBrainstormCopy,
    },
    plan: {
      key: "plan",
      label: t.phasePresentationPlanLabel,
      copy: t.phasePresentationPlanCopy,
    },
    execute: {
      key: "execute",
      label: t.phasePresentationExecuteLabel,
      copy: t.phasePresentationExecuteCopy,
    },
    review: {
      key: "review",
      label: t.phasePresentationReviewLabel,
      copy: t.phasePresentationReviewCopy,
    },
  };

  return map[key] || map.brainstorm;
}
