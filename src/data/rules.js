export const stageRules = {
  stage_01: {
    maxSkills: 3,
    caps: {
      time: 20,
      token: 11,
      risk: 10,
    },
    randomModifierConfig: {
      chance: 0.22,
      maxPerRun: 2,
      cooldownDecisions: 1,
      guaranteedFirstRandomByPhase: "execute",
    },
    randomModifiers: {
      token_leak: { weight: 2, effects: { time: 0, token: 1, risk: 0, quality: 0 } },
      deadline_jitter: { weight: 2, effects: { time: 1, token: 0, risk: 1, quality: 0 } },
      risk_spike: { weight: 1, effects: { time: 0, token: 0, risk: 1, quality: 0 } },
      lucky_guardrail: { weight: 3, effects: { time: 0, token: 0, risk: -1, quality: 1 } },
      context_static: { weight: 1, effects: { time: 1, token: 1, risk: 0, quality: 0 } },
    },
    steps: {
      brainstorm: {
        requiredProgress: 100,
        chaosEvents: {
          vulnerable_brief: {
            progressPenalty: 25,
            options: {
              chaos_vibe_brief: { effects: { time: 0, token: 2, risk: 3, quality: -1 } },
            },
            skillOptions: {
              chaos_grill_docs: { effects: { time: 1, token: 0, risk: -3, quality: 3 }, preventPenalty: true },
              chaos_context_seed: { effects: { time: 1, token: 0, risk: -2, quality: 2 }, preventPenalty: true },
              chaos_brief_scaffold: { effects: { time: 1, token: 1, risk: -1, quality: 1 }, preventPenalty: true },
            },
          },
        },
        baseOptions: {
          warm_template: { progress: 35, effects: { time: 3, token: 0, risk: 1, quality: 2 } },
          ai_persona: { progress: 45, effects: { time: 1, token: 3, risk: 3, quality: 1 } },
          skip_discovery: { progress: 40, effects: { time: 2, token: 0, risk: 6, quality: -1 } },
        },
        skillOptions: {
          grill_client: { progress: 40, effects: { time: 2, token: 0, risk: -3, quality: 3 } },
          context_doc: { progress: 40, effects: { time: 1, token: 0, risk: -2, quality: 3 } },
          brief_scaffold: { progress: 30, effects: { time: 1, token: 1, risk: -1, quality: 1 } },
        },
        synergyOptions: {
          shared_brief_packet: { requires: ["grill", "context"], progress: 70, effects: { time: 2, token: 1, risk: -3, quality: 3 } },
        },
      },
      plan: {
        requiredProgress: 100,
        chaosEvents: {
          escape_complexity: {
            progressPenalty: 30,
            options: {
              chaos_trim_after: { effects: { time: 3, token: 2, risk: 2, quality: -1 } },
            },
            skillOptions: {
              chaos_spec_scope: { effects: { time: 0, token: 0, risk: -2, quality: 1 }, preventPenalty: true },
              chaos_impl_plan: { effects: { time: 1, token: 0, risk: -3, quality: 2 }, preventPenalty: true },
            },
          },
        },
        baseOptions: {
          light_outline: { progress: 35, effects: { time: 3, token: 0, risk: 1, quality: 2 } },
          rush_execute: { progress: 55, effects: { time: -1, token: 2, risk: 4, quality: 0 } },
          prototype_ready_scope: { progress: 45, effects: { time: 0, token: 2, risk: 3, quality: -1 } },
        },
        skillOptions: {
          spec_doc: { progress: 50, effects: { time: 3, token: 1, risk: -2, quality: 3 } },
          implementation_plan: { progress: 50, effects: { time: 2, token: 1, risk: -3, quality: 4 } },
          terraform_module_plan: { progress: 35, effects: { time: 2, token: 1, risk: -3, quality: 3 } },
          context_constraints: { progress: 35, effects: { time: 1, token: 0, risk: -2, quality: 2 } },
          dod_scaffold: { progress: 30, effects: { time: 1, token: 1, risk: -1, quality: 1 } },
        },
        synergyOptions: {
          spec_to_plan: { requires: ["spec", "plan_doc"], progress: 70, effects: { time: 3, token: 1, risk: -3, quality: 3 } },
        },
      },
      execute: {
        requiredProgress: 100,
        chaosEvents: {
          hardcoded_secret: {
            progressPenalty: 30,
            options: {
              chaos_remove_secret_later: { effects: { time: 0, token: 0, risk: 4, quality: -1 } },
            },
            skillOptions: {
              chaos_risk_secret_alert: { effects: { time: 1, token: 1, risk: -4, quality: 2 }, preventPenalty: true },
              chaos_security_scaffold: { effects: { time: 1, token: 1, risk: -2, quality: 1 }, preventPenalty: true },
            },
          },
        },
        baseOptions: {
          vibe_write: { progress: 35, effects: { time: 1, token: 2, risk: 3, quality: -1 } },
          stack_overflow: { progress: 40, effects: { time: 2, token: 1, risk: 2, quality: 1 } },
          copilot_refactor: { progress: 45, effects: { time: 1, token: 3, risk: 3, quality: 0 } },
          single_ai_pass: { progress: 50, effects: { time: 0, token: 3, risk: 4, quality: 0 } },
          reprompt_loop: { progress: 35, effects: { time: 3, token: 4, risk: 4, quality: -2 } },
          manual_build: { progress: 55, effects: { time: 3, token: 1, risk: -1, quality: 2 } },
          tool_rush_no_check: { progress: 40, effects: { time: 0, token: 2, risk: 3, quality: 1 } },
        },
        skillOptions: {
          tdd_guard: { progress: 50, effects: { time: 3, token: 1, risk: -3, quality: 4 } },
          risk_scanner_watch: { progress: 50, effects: { time: 1, token: 2, risk: -3, quality: 3 } },
          terraform_plan_only_gate: { progress: 50, effects: { time: 2, token: 1, risk: -4, quality: 4 } },
          debug_scaffold: { progress: 40, effects: { time: 2, token: 2, risk: -2, quality: 2 } },
          walkthrough_explain: { progress: 35, effects: { time: 2, token: 1, risk: -2, quality: 3 } },
        },
        synergyOptions: {
          synergy_guardrails: { requires: ["spec", "tdd"], progress: 70, effects: { time: 2, token: 3, risk: -3, quality: 4 } },
          iac_safety_gate: { requires: ["terraform_skill", "risk_scanner"], progress: 70, effects: { time: 3, token: 2, risk: -3, quality: 4 } },
        },
      },
      review: {
        requiredProgress: 100,
        chaosEvents: {
          shadow_it: {
            progressPenalty: 30,
            options: {
              chaos_prepare_excuse: { effects: { time: 1, token: 0, risk: 4, quality: -1 } },
            },
            skillOptions: {
              chaos_review_pack: { effects: { time: 2, token: 1, risk: -4, quality: 3 }, preventPenalty: true },
              chaos_context_for_it: { effects: { time: 1, token: 0, risk: -3, quality: 2 }, preventPenalty: true },
              chaos_audit_scaffold: { effects: { time: 2, token: 1, risk: -2, quality: 2 }, preventPenalty: true },
            },
          },
        },
        baseOptions: {
          manual_check: { progress: 40, effects: { time: 4, token: 0, risk: 3, quality: 1 } },
          ai_self_review: { progress: 45, effects: { time: 1, token: 2, risk: 3, quality: 0 } },
          ship_now: { progress: 60, effects: { time: 0, token: 0, risk: 8, quality: -3 } },
        },
        skillOptions: {
          code_review_final: { progress: 60, effects: { time: 3, token: 1, risk: -5, quality: 5 } },
          code_walkthrough: { progress: 50, effects: { time: 2, token: 2, risk: -4, quality: 4 } },
          acceptance_rerun: { progress: 55, effects: { time: 1, token: 1, risk: -3, quality: 3 } },
          risk_review_pass: { progress: 55, effects: { time: 1, token: 2, risk: -4, quality: 4 } },
          terraform_open_tofu_review: { progress: 50, effects: { time: 2, token: 1, risk: -4, quality: 4 } },
          review_checklist_scaffold: { progress: 30, effects: { time: 1, token: 1, risk: -1, quality: 1 } },
        },
        synergyOptions: {
          review_walkthrough_combo: { requires: ["code_review", "walkthrough"], progress: 70, effects: { time: 3, token: 3, risk: -3, quality: 4 } },
          spec_review_gate: { requires: ["spec", "code_review"], progress: 70, effects: { time: 3, token: 2, risk: -3, quality: 4 } },
        },
      },
    },
    emergencyStep: {
      options: {
        emergency_hotfix: { effects: { time: 4, token: 0, risk: -4, quality: 1 } },
        emergency_ai_patch: { effects: { time: 0, token: 4, risk: -1, quality: -1 } },
      },
      skillOptions: {
        emergency_escalation_path: { effects: { time: 3, token: 2, risk: -3, quality: 1 } },
        emergency_walkthrough: { effects: { time: 2, token: 2, risk: -4, quality: 2 } },
        emergency_test_guard: { effects: { time: 2, token: 1, risk: -4, quality: 2 } },
        emergency_risk_scan: { effects: { time: 1, token: 3, risk: -4, quality: 2 } },
      },
    },
  },
};
