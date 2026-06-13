import allStagesEN from "./gameDataEN.js";
import allStagesTH from "./gameDataTH.js";
import { stageRules } from "./rules.js";

function hydrateWithRules(stages, rules) {
  stages.forEach((stage) => {
    const stageRule = rules[stage.id];
    if (!stageRule) return;

    if (stageRule.maxSkills !== undefined) stage.maxSkills = stageRule.maxSkills;
    if (stageRule.caps) stage.caps = { ...stageRule.caps };
    if (stageRule.randomModifierConfig) {
      stage.randomModifierConfig = { ...stageRule.randomModifierConfig };
    }

    if (stage.randomModifiers && stageRule.randomModifiers) {
      stage.randomModifiers.forEach((modifier) => {
        const modRule = stageRule.randomModifiers[modifier.id];
        if (modRule) {
          if (modRule.weight !== undefined) modifier.weight = modRule.weight;
          if (modRule.effects) modifier.effects = { ...modRule.effects };
        }
      });
    }

    if (stage.steps && stageRule.steps) {
      stage.steps.forEach((step) => {
        const stepRule = stageRule.steps[step.id];
        if (!stepRule) return;

        if (stepRule.requiredProgress !== undefined) {
          step.requiredProgress = stepRule.requiredProgress;
        }

        if (step.baseOptions && stepRule.baseOptions) {
          step.baseOptions.forEach((option) => {
            const optRule = stepRule.baseOptions[option.id];
            if (optRule) {
              if (optRule.progress !== undefined) option.progress = optRule.progress;
              if (optRule.effects) option.effects = { ...optRule.effects };
            }
          });
        }

        if (step.skillOptions && stepRule.skillOptions) {
          step.skillOptions.forEach((option) => {
            const optRule = stepRule.skillOptions[option.id];
            if (optRule) {
              if (optRule.progress !== undefined) option.progress = optRule.progress;
              if (optRule.effects) option.effects = { ...optRule.effects };
            }
          });
        }

        if (step.synergyOptions && stepRule.synergyOptions) {
          step.synergyOptions.forEach((option) => {
            const optRule = stepRule.synergyOptions[option.id];
            if (optRule) {
              if (optRule.requires) option.requires = [...optRule.requires];
              if (optRule.progress !== undefined) option.progress = optRule.progress;
              if (optRule.effects) option.effects = { ...optRule.effects };
            }
          });
        }

        if (step.chaosEvents && stepRule.chaosEvents) {
          step.chaosEvents.forEach((event) => {
            const eventRule = stepRule.chaosEvents[event.id];
            if (!eventRule) return;

            if (eventRule.progressPenalty !== undefined) {
              event.progressPenalty = eventRule.progressPenalty;
            }

            if (event.options && eventRule.options) {
              event.options.forEach((option) => {
                const optRule = eventRule.options[option.id];
                if (optRule) {
                  if (optRule.effects) option.effects = { ...optRule.effects };
                }
              });
            }

            if (event.skillOptions && eventRule.skillOptions) {
              event.skillOptions.forEach((option) => {
                const optRule = eventRule.skillOptions[option.id];
                if (optRule) {
                  if (optRule.effects) option.effects = { ...optRule.effects };
                  if (optRule.preventPenalty !== undefined) {
                    option.preventPenalty = optRule.preventPenalty;
                  }
                }
              });
            }
          });
        }
      });
    }

    if (stage.emergencyStep && stageRule.emergencyStep) {
      const emergRule = stageRule.emergencyStep;
      if (stage.emergencyStep.baseOptions && emergRule.options) {
        stage.emergencyStep.baseOptions.forEach((option) => {
          const optRule = emergRule.options[option.id];
          if (optRule) {
            if (optRule.effects) option.effects = { ...optRule.effects };
          }
        });
      }
      if (stage.emergencyStep.skillOptions && emergRule.skillOptions) {
        stage.emergencyStep.skillOptions.forEach((option) => {
          const optRule = emergRule.skillOptions[option.id];
          if (optRule) {
            if (optRule.effects) option.effects = { ...optRule.effects };
          }
        });
      }
    }
  });
}

hydrateWithRules(allStagesEN, stageRules);
hydrateWithRules(allStagesTH, stageRules);

export { allStagesEN, allStagesTH };
