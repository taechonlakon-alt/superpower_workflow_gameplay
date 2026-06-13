import test from "node:test";
import assert from "node:assert/strict";

// Setup minimal DOM mock before importing legacyGame
global.document = {
  querySelectorAll: () => [],
  getElementById: () => null,
  addEventListener: () => {},
  removeEventListener: () => {},
  body: { style: { setProperty: () => {} } }
};
global.window = {
  localStorage: {
    getItem: () => "th",
    setItem: () => {}
  },
  AudioContext: class {
    constructor() {
      this.currentTime = 0;
      this.state = "running";
    }
    resume() {}
    createOscillator() {
      return {
        type: "sine",
        frequency: { setValueAtTime: () => {} },
        connect: () => {},
        start: () => {},
        stop: () => {}
      };
    }
    createGain() {
      return {
        gain: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
        connect: () => {}
      };
    }
  },
  webkitAudioContext: class {}
};

// Mock timers to run synchronously
global.setTimeout = (fn) => { fn(); return 1; };
global.setInterval = (fn) => { fn(); return 2; };
global.clearInterval = () => {};

// Import game assets and modules
import { allStagesEN, allStagesTH } from "./data/gameData.js";
import {
  createInitialState,
  chooseOption,
  getCurrentStep,
  getCurrentRunIdentity,
  applyEffects,
  advanceAfterNormalDecision,
  selectStage,
  startMission,
  confirmPhaseGoal,
  continueAfterResolution,
  startMinigame,
  closeMinigameResult,
  getAvailableOptions,
  getFinalResult,
  getGameState,
  setGameState,
  getGameConfig,
} from "./legacyGame.js";
import { getEvolutionPerk } from "./gameFeel.js";

// 1. Localization Mechanical Equivalence Test
test("EN and TH versions have 100% mechanical equivalence (same steps, choices, effects, progress)", () => {
  assert.equal(allStagesEN.length, allStagesTH.length, "Both language packs must have the same number of stages");

  for (let i = 0; i < allStagesEN.length; i++) {
    const sEN = allStagesEN[i];
    const sTH = allStagesTH[i];

    assert.equal(sEN.id, sTH.id, "Stage IDs must match");
    if (sEN.status === "coming_soon" || sTH.status === "coming_soon") continue;

    assert.equal(sEN.maxSkills, sTH.maxSkills, "maxSkills must match");
    assert.deepEqual(sEN.caps, sTH.caps, "Stage caps must match");

    // Check steps
    assert.equal(sEN.steps.length, sTH.steps.length, `Stage ${sEN.id} must have same number of steps`);
    for (let j = 0; j < sEN.steps.length; j++) {
      const stepEN = sEN.steps[j];
      const stepTH = sTH.steps[j];

      assert.equal(stepEN.id, stepTH.id, "Step IDs must match");
      assert.equal(stepEN.requiredProgress, stepTH.requiredProgress, "Step required progress must match");

      // Verify base options
      assert.equal(stepEN.baseOptions.length, stepTH.baseOptions.length, `Step ${stepEN.id} baseOptions length mismatch`);
      for (let k = 0; k < stepEN.baseOptions.length; k++) {
        const optEN = stepEN.baseOptions[k];
        const optTH = stepTH.baseOptions[k];
        assert.equal(optEN.id, optTH.id);
        assert.equal(optEN.progress, optTH.progress);
        assert.deepEqual(optEN.effects, optTH.effects);
      }

      // Verify skill options
      assert.equal(stepEN.skillOptions.length, stepTH.skillOptions.length, `Step ${stepEN.id} skillOptions length mismatch`);
      for (let k = 0; k < stepEN.skillOptions.length; k++) {
        const optEN = stepEN.skillOptions[k];
        const optTH = stepTH.skillOptions[k];
        assert.equal(optEN.id, optTH.id);
        assert.equal(optEN.skill, optTH.skill);
        assert.equal(optEN.progress, optTH.progress);
        assert.deepEqual(optEN.effects, optTH.effects);
      }

      // Verify synergy options
      assert.equal(stepEN.synergyOptions.length, stepTH.synergyOptions.length, `Step ${stepEN.id} synergyOptions length mismatch`);
      for (let k = 0; k < stepEN.synergyOptions.length; k++) {
        const optEN = stepEN.synergyOptions[k];
        const optTH = stepTH.synergyOptions[k];
        assert.equal(optEN.id, optTH.id);
        assert.deepEqual(optEN.requires, optTH.requires);
        assert.equal(optEN.progress, optTH.progress);
        assert.deepEqual(optEN.effects, optTH.effects);
      }
    }
  }
});

// 2. Global uniqueness of IDs
test("System has no duplicate step, option, skill, or event IDs", () => {
  const allIds = new Set();
  const duplicateIds = [];

  function addId(id) {
    if (allIds.has(id)) {
      duplicateIds.push(id);
    } else {
      allIds.add(id);
    }
  }

  allStagesEN.forEach(stage => {
    addId(stage.id);
    if (stage.skills) stage.skills.forEach(sk => addId(sk.id));
    if (stage.randomModifiers) stage.randomModifiers.forEach(m => addId(m.id));

    if (stage.steps) {
      stage.steps.forEach(step => {
        addId(step.id);
        if (step.baseOptions) step.baseOptions.forEach(opt => addId(opt.id));
        if (step.skillOptions) step.skillOptions.forEach(opt => addId(opt.id));
        if (step.synergyOptions) step.synergyOptions.forEach(opt => addId(opt.id));
        if (step.chaosEvents) {
          step.chaosEvents.forEach(ev => {
            addId(ev.id);
            if (ev.options) ev.options.forEach(o => addId(o.id));
            if (ev.skillOptions) ev.skillOptions.forEach(o => addId(o.id));
          });
        }
      });
    }

    if (stage.emergencyStep) {
      if (stage.emergencyStep.baseOptions) stage.emergencyStep.baseOptions.forEach(opt => addId(opt.id));
      if (stage.emergencyStep.skillOptions) stage.emergencyStep.skillOptions.forEach(opt => addId(opt.id));
    }
  });

  assert.deepEqual(duplicateIds, [], "Should have no duplicate IDs across stage definition structure");
});

// 3. Emergency recovery logic (No Phase Skip)
test("Emergency resolution returns player to the original step index and original/adjusted progress", () => {
  selectStage("stage_01");
  const state = getGameState();
  state.index = 2; // execute phase
  state.progress = 45;
  state.screen = "emergency_step";
  state.emergencyTriggered = true;
  setGameState(state);

  const step = getGameConfig().emergencyStep;
  const opt = step.baseOptions[0]; // emergency_hotfix
  chooseOption(opt.id);

  assert.equal(getGameState().screen, "emergency_resolution");
  continueAfterResolution();

  const finalState = getGameState();
  assert.equal(finalState.screen, "step");
  assert.equal(finalState.index, 2, "Must remain on execute phase");
  assert.equal(finalState.emergencyTriggered, true, "Emergency triggered remains true");
});

test("Progress changes expand the jigsaw widget and reveal next-form tiles", () => {
  selectStage("stage_01");
  const state = getGameState();
  state.index = 0;
  state.progress = 0;
  state.screen = "step";
  state.showSkillDiminishingHint = false;
  state.hasSeenSkillDiminishingHint = true;
  setGameState(state);

  const step = getCurrentStep();
  const option = step.baseOptions[0];
  chooseOption(option.id);

  const nextState = getGameState();
  assert.equal(nextState.jigsawExpanded, true);
  assert.equal(nextState.jigsawPulse, "gain");
  assert.ok(nextState.progress > 0);
});

// 4. Choice farming and fallback protection
test("Prevents double skill/synergy plays, repeated base option scaling, and fallback rules", () => {
  selectStage("stage_01");
  const state = getGameState();
  state.skills = ["spec", "tdd", "code_review"];
  state.index = 2; // execute phase
  state.progress = 0;
  state.token = 10;
  state.screen = "step";
  setGameState(state);

  const step = getCurrentStep();

  // First play of a base option is allowed (reprompt_loop, base progress: 35)
  const baseOption = step.baseOptions.find(o => o.id === "reprompt_loop");
  chooseOption(baseOption.id);
  assert.equal(getGameState().screen, "resolution");
  continueAfterResolution();
  assert.equal(getGameState().progress, 35, "First base option play should apply normal progress");

  // Clear chaos state that was triggered by reprompt_loop's high risk/negative quality
  // (shouldTriggerPhaseIssue fires when effects.risk >= 4 || effects.quality <= -2).
  // This test is about farming prevention, not chaos triggering.
  const postChaos = getGameState();
  postChaos.activeChaos = null;
  postChaos.triggeredChaosByPhase = {};
  setGameState(postChaos);

  // Attempting to REPEAT baseOption immediately should be blocked because skill tdd_guard is unused in the phase
  chooseOption(baseOption.id);
  assert.equal(getGameState().progress, 35, "Repeat base option play must be blocked because skill is unused");

  // Play a skill option (affordable: tdd_guard, cost 1 token, progress 50)
  const tddSkillOption = step.skillOptions.find(o => o.id === "tdd_guard");
  chooseOption(tddSkillOption.id);
  assert.equal(getGameState().screen, "resolution");
  continueAfterResolution();
  assert.equal(getGameState().progress, 85, "Skill option should apply progress successfully (35 + 50 = 85)");

  // Try to play TDD skill option again (farming check)
  chooseOption(tddSkillOption.id);
  assert.equal(getGameState().progress, 85, "Repeated skill play should be blocked, progress stays 85");

  // Reset progress to 50 to test repeat base option scaling
  const s = getGameState();
  s.progress = 50;
  // Mark synergy as used so the anti-farming guard doesn't block base repeat.
  // (The engine blocks base repeats when there are unused skill/synergy options.)
  s.history.push({ phase: step.title, optionId: "synergy_guardrails", isSynergy: true, effects: { time: 0, token: 0, risk: 0, quality: 0 } });
  // Clear any chaos that was triggered during previous continues
  s.activeChaos = null;
  s.triggeredChaosByPhase = {};
  setGameState(s);

  // Repeat play of baseOption (repeat count = 1) -> Diminishing returns (scaled down progress by 0.5)
  // Expected base progress is 35. Scaled progress is Math.round(35 * 0.5) = 18.
  chooseOption(baseOption.id);
  assert.equal(getGameState().screen, "resolution");
  continueAfterResolution();
  const progressAfterSecondBase = getGameState().progress; // 50 + 18 = 68
  assert.equal(progressAfterSecondBase, 68);
});

// 5. 12,000 Game Runs Headless Simulator
test("Headless simulation runs 12,000 games and asserts Win Rate & Balance bounds", () => {
  const availableSkills = ["grill", "context", "spec", "plan_doc", "tdd", "code_review", "walkthrough", "risk_scanner", "scaffolds", "terraform_skill"];

  function getCombinations(array, k) {
    const result = [];
    function helper(start, combo) {
      if (combo.length === k) {
        result.push([...combo]);
        return;
      }
      for (let i = start; i < array.length; i++) {
        combo.push(array[i]);
        helper(i + 1, combo);
        combo.pop();
      }
    }
    helper(0, []);
    return result;
  }

  const combinations = getCombinations(availableSkills, 3);
  assert.equal(combinations.length, 120, "Should generate exactly 120 unique skill draft combinations");

  let totalRuns = 0;
  let totalWins = 0;
  const skillWins = {};
  const skillCount = {};
  let highScoreOvertimeCount = 0;

  // Initialize count objects
  availableSkills.forEach(skill => {
    skillWins[skill] = 0;
    skillCount[skill] = 0;
  });

  // Run the simulation: 120 combos * 100 seeds = 12,000 games
  for (let comboIdx = 0; comboIdx < combinations.length; comboIdx++) {
    const combo = combinations[comboIdx];

    for (let seed = 1; seed <= 100; seed++) {
      // Deterministic PRNG seeded by seed + comboIdx
      let sVal = seed * 1000 + comboIdx;
      Math.random = () => {
        sVal = (sVal * 9301 + 49297) % 233280;
        return sVal / 233280;
      };

      // Play game
      selectStage("stage_01");
      const currentState = getGameState();
      currentState.skills = [...combo];
      setGameState(currentState);
      startMission();

      let turns = 0;
      const maxTurns = 300;
      while (getGameState().screen !== "result" && turns < maxTurns) {
        turns++;
        const s = getGameState();

        if (s.screen === "step" || s.screen === "emergency_step") {
          const step = s.screen === "emergency_step" 
            ? getGameConfig().emergencyStep 
            : getCurrentStep();

          if (!s.seenPhaseGoals.includes(step.id)) {
            confirmPhaseGoal();
            continue;
          }

          const options = getAvailableOptions(step);

          // Simulate 12 seconds phase timer decrement per step decision
          s.phaseTimerValue -= 12;
          if (s.phaseTimerValue <= 0) {
            // Apply the timeout state changes directly:
            s.time = Math.max(0, s.time + 2);
            s.risk = Math.min(s.risk + 1, getGameConfig().caps.risk + 8);
            s.phaseTimerValue = 60;
            setGameState(s);
            continue;
          }

          if (s.minigameActive) {
            // Simulate matching 4 pairs (12 tokens gained, cost +3 time)
            s.minigameMatchedPairs = 4;
            setGameState(s);
            closeMinigameResult();
            continue;
          }

          const affordable = options.filter(opt => {
            const cost = opt.effects?.token || 0;
            return s.token >= cost;
          });

          if (affordable.length === 0) {
            if (!s.hasPlayedMinigameThisPhase) {
              startMinigame();
            } else {
              // Forced choice (taking token debt)
              const cheapest = options.reduce((prev, curr) => {
                const prevCost = prev.effects?.token || 0;
                const currCost = curr.effects?.token || 0;
                return currCost < prevCost ? curr : prev;
              });
              chooseOption(cheapest.id);
            }
          } else {
            // Play strategy:
            // 75% chance of playing optimal (skill/synergy), 25% chance of playing random affordable choice
            const optimalChoice = affordable.find(opt => opt.skill) || affordable.find(opt => opt.requires);
            const playOptimal = Math.random() < 0.75;
            
            const choice = (playOptimal && optimalChoice) 
              ? optimalChoice 
              : affordable[Math.floor(Math.random() * affordable.length)];

            chooseOption(choice.id);
          }
        } else if (s.screen === "resolution" || s.screen === "emergency_resolution") {
          continueAfterResolution();
        } else if (s.screen === "evolution") {
          const runIdentity = getCurrentRunIdentity();
          const perk = getEvolutionPerk(runIdentity.key, s.evolutionNewLevel, {});
          applyEffects(perk.effects);
          s.characterPos = null;
          s.screen = s.index >= getGameConfig().steps.length ? "result" : "step";
          if (s.screen === "step") {
            s.phaseTimerValue = 60;
          }
          setGameState(s);
        }
      }

      const report = getFinalResult();
      totalRuns++;
      const won = !report.failed;

      if (won) {
        totalWins++;
        combo.forEach(skill => {
          skillWins[skill]++;
        });
      }

      combo.forEach(skill => {
        skillCount[skill]++;
      });

      // Track if high score (>=86) games had overtime or token debt
      if (report.workflowScore >= 86) {
        if (report.overtime || report.overBudget) {
          highScoreOvertimeCount++;
        }
      }
    }
  }

  const winRate = totalWins / totalRuns;
  console.log(`Simulation complete: Total runs = ${totalRuns}, Total wins = ${totalWins}, Win rate = ${(winRate * 100).toFixed(2)}%`);

  // Assert balance bounds
  assert.ok(winRate >= 0.20 && winRate <= 0.80, `Average win rate should be balanced (between 20% and 80%, got ${(winRate * 100).toFixed(2)}%)`);

  // High score rules check (Score >= 86 must not have overtime or over budget)
  assert.equal(highScoreOvertimeCount, 0, "High scores (>=86) should not be achievable with overtime or over budget runs");

  // Individual skill dominance check
  const skillWinRates = {};
  availableSkills.forEach(skill => {
    const rate = skillWins[skill] / skillCount[skill];
    skillWinRates[skill] = rate;
  });

  console.log("Win rates by skill:", skillWinRates);

  availableSkills.forEach(skill => {
    const rate = skillWinRates[skill];
    const diff = Math.abs(rate - winRate);
    assert.ok(diff <= 0.15, `Skill '${skill}' win rate (${(rate*100).toFixed(2)}%) deviates from average win rate (${(winRate*100).toFixed(2)}%) by more than 15%`);
  });
});
