// SUPERPOWER WORKFLOW gameplay data. Cleaned localization file.
const stage01 = {
  "id": "stage_01",
  "status": "available",
  "title": "SUPERPOWER WORKFLOW",
  "stage": "Stage 01: Booking MVP Rush",
  "intro": "The client needs a Booking MVP for a service business: select a service, pick a time slot, enter contact info, confirm booking, and view basic booking list. This game tests if you can use AI to survive with Workflow, not just generate code quickly.",
  "randomModifiers": [
    {
      "id": "token_leak",
      "title": "Prompt Noise",
      "icon": "AI",
      "tone": "warn",
      "copy": "Prompt noise from a previous task requires more AI budget to filter out hallucinations.",
      "hint": "Triggered when AI usage is high. Mitigate with specific scope checks, not longer reprompts.",
      "tags": [
        "external",
        "token pressure"
      ]
    },
    {
      "id": "deadline_jitter",
      "title": "Deadline Jitter",
      "icon": "CLK",
      "tone": "warn",
      "copy": "Deadline moves up because the previous task dragged on or scope expanded.",
      "hint": "Use this signal to cut scope or choose focused checks, rather than rushing everything.",
      "tags": [
        "external",
        "time pressure"
      ]
    },
    {
      "id": "risk_spike",
      "title": "Hidden Edge",
      "icon": "RISK",
      "tone": "danger",
      "copy": "A hidden edge case appears while workflow is under pressure. Needs immediate proof of mitigation.",
      "hint": "Choose guardrails that specifically target the edge case, rather than just pushing for progress.",
      "tags": [
        "external",
        "risk +1"
      ]
    },
    {
      "id": "lucky_guardrail",
      "title": "Lucky Guardrail",
      "icon": "SHD",
      "tone": "safe",
      "copy": "Previously established workflow guardrails caught an unintentional mistake.",
      "hint": "This is the payoff of setting guardrails early: not free points, but protecting your route from bad luck.",
      "tags": [
        "external",
        "shield"
      ]
    },
    {
      "id": "context_static",
      "title": "Context Static",
      "icon": "CTX",
      "tone": "warn",
      "copy": "Context noise from previous decisions forces the team to review more thoroughly before proceeding.",
      "hint": "When context gets noisy, return to the brief/spec as an anchor before having AI generate more code.",
      "tags": [
        "external",
        "review tax"
      ]
    }
  ],
  "skills": [
    {
      "id": "grill",
      "name": "Grill with Docs",
      "type": "Clarify",
      "icon": "GWD",
      "summary": "Clarify booking rules before letting AI guess",
      "description": "Ask for explicit booking rules like service types, slots, cancellation policies, and confirmation.",
      "teaches": "Before AI writes code, the booking rules must be clear to prevent AI from inventing its own flow."
    },
    {
      "id": "context",
      "name": "CONTEXT.md",
      "type": "Context",
      "icon": "CTX",
      "summary": "Lock in goals, users, scope, and non-goals",
      "description": "Define the app goal, target users, scope, and non-goals for the Booking MVP.",
      "teaches": "Without context, AI easily over-expands the booking app into a massive system."
    },
    {
      "id": "spec",
      "name": "Spec Doc",
      "type": "Guardrail",
      "icon": "DOC",
      "summary": "Define verifiable must-haves and out-of-scope items",
      "description": "Establish must-haves and out-of-scope features like payment, auth, marketplace, and CRM.",
      "teaches": "Without a Spec, there's no baseline to check if the booking flow is actually done or bloated."
    },
    {
      "id": "plan_doc",
      "name": "Implementation Plan",
      "type": "Plan",
      "icon": "PLAN",
      "summary": "Sequence tasks and verification before Executing",
      "description": "Determine the task sequence for building the booking flow before letting AI write code.",
      "teaches": "Before Execute, you must know the order of building service picker, slot picker, form, and confirmation."
    },
    {
      "id": "tdd",
      "name": "TDD",
      "type": "Quality",
      "icon": "TDD",
      "summary": "Use TDD Loop to pass tests before moving on",
      "description": "TDD Loop: write failing test, write minimal code to pass, refactor, rerun, move to next task.",
      "teaches": "TDD Loop prevents AI from writing excess code because every task must start with a failing test."
    },
    {
      "id": "code_review",
      "name": "Code Review",
      "type": "Review",
      "icon": "CHK",
      "summary": "Check spec, scope, tests, security, data, and quality",
      "description": "Review work before delivery: matches spec? AC met? file scope? test coverage? security risks? data integrity? hallucination? duplicate code?",
      "teaches": "Code Review must cover spec, AC, file scope, tests, security, data integrity, docs, hallucination, and naming."
    },
    {
      "id": "walkthrough",
      "name": "Code Walkthrough",
      "type": "Explain",
      "icon": "WALK",
      "summary": "Have AI explain state and validation step-by-step",
      "description": "Force AI to explain state, validation, and handoffs of the booking flow.",
      "teaches": "Never trust that a flow is good just because the AI says it's done."
    },
    {
      "id": "risk_scanner",
      "name": "Real-time Risk Scanner",
      "type": "Passive",
      "icon": "SCAN",
      "summary": "Alerts on secrets, missing tests, fragile logic",
      "description": "Warns when the booking state lacks tests, contains secrets, or uses fragile logic.",
      "teaches": "The speed of AI requires a risk warning system before the booking flow breaks."
    },
    {
      "id": "scaffolds",
      "name": "Scaffolds",
      "type": "Support",
      "icon": "KIT",
      "summary": "Use checklists and DoD to catch edge cases",
      "description": "Apply checklists, templates, escalation paths, and Definition of Done for the Booking MVP.",
      "teaches": "Juniors shouldn't fight AI alone; structural support is needed to remember states and edge cases."
    },
    {
      "id": "terraform_skill",
      "name": "Terraform",
      "type": "Infra",
      "icon": "IAC",
      "summary": "Set IaC guardrails: tests, modules, CI/CD, prod practices",
      "description": "Used strictly for Terraform: testing, module patterns, state/backend, variables/secrets, and IaC best practices.",
      "teaches": "Infra skills are riskier than docs because they involve real resources. Always plan-only, review-first, and require explicit approval.",
      "warning": "Never allow AI to auto-run terraform apply or destroy. Always review the plan and risks first."
    }
  ],
  "steps": [
    {
      "id": "brainstorm",
      "title": "Brainstorm",
      "goal": {
        "title": "Make The Goal Clear",
        "copy": "Brainstorming is the phase to make the Booking MVP requirement clear enough for decisions and planning.",
        "guidance": [
          "Read the docs/brief first",
          "Summarize the booking goal",
          "Propose the core flow",
          "Identify trade-offs",
          "Ask clarifying questions about user, service, slot rules, cancellation, and confirmation"
        ]
      },
      "briefing": [
        "The client needs a Booking MVP for a service business: users can book slots, and the team can view a basic booking list."
      ],
      "chaosEvents": [
        {
          "id": "vulnerable_brief",
          "title": "Brief Missing Booking Rules",
          "problem": "The Vulnerable Developer Incident",
          "copy": "The client only says 'I want a booking system fast,' but the team doesn't know who books what services, if slots can overlap, what confirmation type is needed, and what the MVP non-goals are.",
          "danger": "Skipping the workflow causes the AI to guess the requirements.",
          "options": [
            {
              "id": "chaos_vibe_brief",
              "label": "Let AI Fill The Gaps",
              "icon": "AI",
              "tone": "gray",
              "tags": [
                "Fast",
                "Skip Workflow"
              ],
              "helper": "Let the AI interpret the short brief and guess the booking flow on its own.",
              "tradeoff": "Fast, but service types, slot rules, confirmation, and other questions remain unanswered.",
              "resolveMsg": "AI fills in the blanks until the brief looks complete, but the team still cannot explain what the actual booking rules are and what questions remain.",
              "lesson": "AI proposes booking flows effectively when given goals and context, not when forced to guess blank spaces.",
              "problem": "The Vulnerable Developer Incident"
            }
          ],
          "skillOptions": [
            {
              "skill": "grill",
              "id": "chaos_grill_docs",
              "label": "Grill with Docs",
              "icon": "GWD",
              "tone": "blue",
              "tags": [
                "Ask remaining questions",
                "Close unknowns"
              ],
              "helper": "Use the docs/brief to formulate questions about target user, service type, slot rules, cancellation, and confirmation.",
              "tradeoff": "Takes time to ask, but the booking flow does not rely on guesses.",
              "resolveMsg": "You closed critical questions, identifying that the goal is successful booking with confirmation evidence, not just a mock interface.",
              "lesson": "Grill with Docs supports the final step of Brainstorming: clarifying remaining questions before having AI guess."
            },
            {
              "skill": "context",
              "id": "chaos_context_seed",
              "label": "Write CONTEXT.md Seed",
              "icon": "CTX",
              "tone": "mint",
              "tags": [
                "Read docs",
                "Summarize goal"
              ],
              "helper": "Create a shared brief summarizing the app goal, user, booking flow, scope, non-goals, and constraints.",
              "tradeoff": "Takes a bit of time, but aligns everyone on the same goal.",
              "resolveMsg": "The team establishes a central brief with booking goals and out-of-scope items for AI reference, avoiding fragmented assumptions.",
              "lesson": "CONTEXT.md helps the Brainstorming phase summarize the Booking MVP goal as a shared context."
            },
            {
              "skill": "scaffolds",
              "id": "chaos_brief_scaffold",
              "label": "Requirement Scaffold",
              "icon": "KIT",
              "tone": "mint",
              "tags": [
                "Full workflow",
                "No missed steps"
              ],
              "helper": "Use a checklist to cover docs, booking goal, core flow, trade-offs, and open questions.",
              "tradeoff": "Slower than guessing, but prevents skipping critical steps.",
              "resolveMsg": "The checklist forces the team to cover booking goals, core flows, trade-offs, slot rules, confirmation, and open questions.",
              "lesson": "Scaffolds help beginners follow the full Brainstorming workflow without skipping steps."
            }
          ]
        }
      ],
      "baseOptions": [
        {
          "id": "warm_template",
          "label": "Read Brief, Summarize Goal",
          "icon": "DOC",
          "tone": "mint",
          "tags": [
            "+35%",
            "Goal first"
          ],
          "helper": "Read the brief and summarize the booking goal, target user, and success signal before proposing a flow.",
          "tradeoff": "Starts in the right direction, but does not close the remaining questions.",
          "outcome": "The team understands the core goals and users before discussing the flow, but slot rules and confirmation remain unknown.",
          "lesson": "Brainstorming should begin by reading docs and summarizing goals, not jumping straight to a solution."
        },
        {
          "id": "ai_persona",
          "label": "AI Approach Before Questions",
          "icon": "AI",
          "tone": "blue",
          "tags": [
            "+45%",
            "Approach first"
          ],
          "helper": "Have AI propose user personas, booking screens and approach before closing unknowns from the brief.",
          "tradeoff": "Gets ideas quickly, but spends tokens and increases risk since remaining questions are not clarified.",
          "outcome": "AI proposes an interesting flow, but guesses slot rules, confirmation, and admin needs beyond what the client specified.",
          "lesson": "AI can propose approaches, but this should happen after reading docs, summarizing goals, and understanding trade-offs."
        },
        {
          "id": "skip_discovery",
          "label": "Prototype From Team Assumptions",
          "icon": "RUN",
          "tone": "gray",
          "tags": [
            "+40%",
            "Fast experience"
          ],
          "helper": "The team uses patterns from similar past projects to draft the booking flow before closing all unknowns.",
          "tradeoff": "Saves tokens and starts fast, but accumulates risk if assumptions about user/slot/confirmation are incorrect.",
          "outcome": "The initial prototype shows direction, but relies heavily on team assumptions rather than evidence from the brief.",
          "lesson": "Past experience helps kickstart things, but you must distinguish between actual evidence and assumptions.",
          "problem": "Misleading Confidence"
        }
      ],
      "skillOptions": [
        {
          "skill": "grill",
          "id": "grill_client",
          "label": "Grill with Docs",
          "icon": "GWD",
          "tone": "blue",
          "tags": [
            "+40%",
            "Ask remaining"
          ],
          "helper": "Use the docs/brief to raise questions about service type, slot length, conflict rules, cancellation, and confirmation.",
          "tradeoff": "Takes more time, but closes unknowns before letting the AI propose an approach.",
          "outcome": "You obtain the missing answers from the brief to evaluate against the AI's approach.",
          "lesson": "Grill with Docs helps the 'Ask remaining questions' step of Brainstorming."
        },
        {
          "skill": "context",
          "id": "context_doc",
          "label": "Create CONTEXT.md",
          "icon": "CTX",
          "tone": "mint",
          "tags": [
            "+40%",
            "Docs + Goal"
          ],
          "helper": "Read the brief and create a context seed: app goal, target user, booking flow, scope, non-goals, and definition of done.",
          "tradeoff": "Invests time so both the team and AI align on the same goal from the beginning.",
          "outcome": "All subsequent prompts have goals, users, and non-goals to refer back to.",
          "lesson": "CONTEXT.md helps the 'Read docs' and 'Summarize goal' steps of Brainstorming."
        },
        {
          "skill": "scaffolds",
          "id": "brief_scaffold",
          "label": "Requirement Scaffold",
          "icon": "KIT",
          "tone": "mint",
          "tags": [
            "+35%",
            "Full 5 steps"
          ],
          "helper": "Use a checklist to force completion of docs, booking goal, core flow, trade-offs, and open questions.",
          "tradeoff": "Slower than guessing, but reduces the chance of skipping critical steps.",
          "outcome": "The team doesn't miss core flows and clearly sees which questions must be closed before Planning.",
          "lesson": "Scaffolds keep Brainstorming aligned with the workflow even for beginner teams."
        }
      ],
      "synergyOptions": [
        {
          "id": "shared_brief_packet",
          "label": "Brief Alignment Packet",
          "icon": "DOC",
          "tone": "blue",
          "tags": [
            "+90%",
            "Solid brief"
          ],
          "helper": "Combine docs, booking goal summary, core flow, trade-offs, and open questions into a single brief.",
          "tradeoff": "Spends a little time and tokens, but still requires scoping/testing choices in the Plan phase rather than instantly winning.",
          "outcome": "The team obtains a brief clear enough to Plan: knowing the booking goal, core flow, trade-offs, and remaining questions.",
          "lesson": "Brief Alignment Packet represents a complete Brainstorming workflow before letting the AI build."
        }
      ]
    },
    {
      "id": "plan",
      "title": "Plan",
      "goal": {
        "title": "Plan The Build",
        "copy": "Planning is the phase to translate the Booking MVP goals into an actionable implementation plan that defines task sequence and guards scope.",
        "guidance": [
          "Identify files to modify / not modify, and necessary new files",
          "Specify tests to write beforehand or use as acceptance checks",
          "Arrange task order based on booking path dependencies",
          "Define verification methods after completing each task",
          "Identify risks and scope guards to prevent over-editing"
        ]
      },
      "briefing": [
        "You must plan the Booking MVP to fulfill the core booking path without inflating into a system larger than an MVP."
      ],
      "chaosEvents": [
        {
          "id": "escape_complexity",
          "title": "AI Expands Booking MVP Into Platform",
          "problem": "Escape Complexity Trap",
          "copy": "The plan has not locked in files, tests, task order, or scope guards. As a result, the AI proposes adding a marketplace, payments, auth, CRM, staff dashboard, and notifications.",
          "danger": "Incomplete planning leads to massive scope creep.",
          "options": [
            {
              "id": "chaos_trim_after",
              "label": "Trim After AI Draft",
              "icon": "CUT",
              "tone": "gray",
              "tags": [
                "Trim later",
                "Skip guard"
              ],
              "helper": "Let the AI draft broadly first, even without clearly defined files, tests, order, and verification.",
              "tradeoff": "Appears fast, but wastes time tearing down and checking what fell out of scope.",
              "resolveMsg": "You get a massive plan but have to backtrack to cut out files, features, and tasks not requested by the client.",
              "lesson": "Planning must define scope guards and verification before execution, rather than letting AI inflate scope and trimming it later.",
              "problem": "Escape Complexity Trap"
            }
          ],
          "skillOptions": [
            {
              "skill": "spec",
              "id": "chaos_spec_scope",
              "label": "Spec Doc Scope Gate",
              "icon": "DOC",
              "tone": "blue",
              "tags": [
                "Files/Scope",
                "Prevent leaks"
              ],
              "helper": "Use the spec to decide which files to modify, whether to create new files, and what is out-of-scope.",
              "tradeoff": "Uses the document to enforce scope rather than feelings or AI suggestions.",
              "resolveMsg": "The Spec allows the team to cut marketplace/payments/auth/CRM immediately, locking down which files the Booking MVP should touch.",
              "lesson": "Spec helps the Planning phase define files, new files, scope, and scope guards before Execution."
            },
            {
              "skill": "plan_doc",
              "id": "chaos_impl_plan",
              "label": "Implementation Plan Reset",
              "icon": "PLAN",
              "tone": "mint",
              "tags": [
                "Order/Verify",
                "Reduce complexity"
              ],
              "helper": "Order tasks sequentially with checkpoints on how to verify each task.",
              "tradeoff": "Slower than issuing all tasks at once, but controls dependencies and checkpoints.",
              "resolveMsg": "The Implementation Plan resets the task list back to the core Booking MVP with sequential tasks and checkpoints.",
              "lesson": "The Planning phase must define task order and verification after each task, not just state that it will be done."
            }
          ]
        }
      ],
      "baseOptions": [
        {
          "id": "light_outline",
          "label": "Files + Task Outline",
          "icon": "OUT",
          "tone": "mint",
          "tags": [
            "+35%",
            "partial plan"
          ],
          "helper": "Identify files to inspect and core tasks: service picker, slot picker, contact form, confirmation, and booking list.",
          "tradeoff": "Starts in line with actual files, but lacks tests, verification, risks, and scope guards.",
          "outcome": "The team knows which files and tasks to start with, but lacks answers on what to test first or how to verify completed tasks.",
          "lesson": "An outline helps kickstart the Plan, but is insufficient without tests, verification, and risk guards."
        },
        {
          "id": "rush_execute",
          "label": "Execute From Latest Chat",
          "icon": "GO",
          "tone": "gray",
          "tags": [
            "+55%",
            "Skip Plan"
          ],
          "helper": "Skip writing an explicit plan and just ask AI to build based on conversational memory.",
          "tradeoff": "Incredibly fast progress upfront. But the AI has no scope guards or test requirements.",
          "outcome": "AI builds a massive feature set based on the latest chat. Fast, but includes things the client never asked for.",
          "lesson": "Chat history is not an Implementation Plan. Skipping the plan leads to unmaintainable code.",
          "problem": "Sloppy Maintainability"
        },
        {
          "id": "prototype_ready_scope",
          "label": "Flexible Prototype Plan",
          "icon": "MVP",
          "tone": "gray",
          "tags": [
            "+45%",
            "Loose Scope"
          ],
          "helper": "Write a high-level plan giving AI total freedom. No files, tests, or verification steps locked in.",
          "tradeoff": "Easy to write and keeps momentum going, but risks massive scope creep.",
          "outcome": "The plan sounds great but lacks detail. AI builds a prototype that looks nice but is a nightmare to maintain.",
          "lesson": "A plan that is too flexible allows scope creep disguised as progress.",
          "problem": "Escape Complexity Trap"
        }
      ],
      "skillOptions": [
        {
          "skill": "spec",
          "id": "spec_doc",
          "label": "Spec Doc",
          "icon": "DOC",
          "tone": "blue",
          "tags": [
            "+50%",
            "files/scope"
          ],
          "helper": "Clarify which files to edit, whether to create new files, and define must-haves versus out-of-scope items.",
          "tradeoff": "Slower, but provides documented evidence to prevent scope creep.",
          "outcome": "The team knows exactly which files the Booking MVP must touch, what to build, and what is out-of-scope.",
          "lesson": "Spec Doc helps the Planning phase answer files, new files, scope, and scope guards."
        },
        {
          "skill": "plan_doc",
          "id": "implementation_plan",
          "label": "Implementation Plan",
          "icon": "PLAN",
          "tone": "blue",
          "tags": [
            "+50%",
            "order/verify"
          ],
          "helper": "Establish task order, dependency order, and verification methods after each task.",
          "tradeoff": "Takes more time, but reduces reprompt loops during Execution.",
          "outcome": "The team visualizes the flow from files to tests to reviews, and knows what to verify after each task.",
          "lesson": "Implementation Plan helps Planning define order and verification before letting the AI start."
        },
        {
          "skill": "terraform_skill",
          "id": "terraform_module_plan",
          "label": "IaC Module Plan",
          "icon": "IAC",
          "tone": "mint",
          "tags": [
            "+35%",
            "plan-only"
          ],
          "helper": "Plan the Terraform module pattern, environment boundaries, tests, CI/CD gates, and production guardrails without running apply.",
          "tradeoff": "Takes extra time, but reduces risk from infra scope and live resources.",
          "outcome": "The team has an IaC plan specifying modules, state/backend, inputs, tests, and approvals before executing resource-changing commands.",
          "lesson": "Terraform must start with planning and guardrails, not letting AI apply infra directly from prompts."
        },
        {
          "skill": "context",
          "id": "context_constraints",
          "label": "CONTEXT.md Constraints",
          "icon": "CTX",
          "tone": "mint",
          "tags": [
            "+35%",
            "Actual status"
          ],
          "helper": "Cross-check the plan with current context: goal, existing files, constraints, and definition of done.",
          "tradeoff": "Not the fastest option, but prevents hallucinating repository states that do not exist.",
          "outcome": "The plan remains anchored to the goal, users, existing files, and documented constraints, rather than becoming a wish list.",
          "lesson": "CONTEXT.md helps align the Plan with the actual status of the project."
        },
        {
          "skill": "scaffolds",
          "id": "dod_scaffold",
          "label": "Plan Checklist Scaffold",
          "icon": "KIT",
          "tone": "mint",
          "tags": [
            "+35%",
            "test/risk guard"
          ],
          "helper": "Use a checklist to enforce tests, DoD, risks, verification, and scope guards before Execution.",
          "tradeoff": "Adds some process, but reduces false confidence and forgotten tests.",
          "outcome": "The team has a checklist of what to test first, what the risks are, how to verify, and what is out-of-bounds.",
          "lesson": "Scaffolds help Planning remember tests, risks, and scope guards."
        }
      ],
      "synergyOptions": [
        {
          "id": "spec_to_plan",
          "label": "Implementation Readiness Draft",
          "icon": "FLOW",
          "tone": "blue",
          "tags": [
            "+90%",
            "ready to execute"
          ],
          "helper": "Combine files, new files, tests, order, verification, risks, and scope guards into a single plan.",
          "tradeoff": "Spends a little time and tokens; the plan is ready, but you still have to decide on the first task in Execution.",
          "outcome": "AI obtains an actionable plan: knowing files to edit, files to protect, booking path tests, task order, verification, risks, and scope guards.",
          "lesson": "Implementation Readiness Plan represents a Plan that fully answers what to do, where, in what order, how to verify, and what to protect."
        }
      ]
    },
    {
      "id": "execute",
      "title": "Execute",
      "goal": {
        "title": "Executing Plans",
        "copy": "Execution is the phase to build the Booking MVP task-by-task according to the plan, keeping the AI within checkpoints.",
        "guidance": [
          "Read the plan and select the next task",
          "Summarize what to build and which files to modify",
          "Modify only files related to this task",
          "Run focused tests and summarize results",
          "Stop or ask before starting the next task"
        ]
      },
      "briefing": [
        "You must execute the Booking MVP according to the plan, making the core booking path functional piece-by-piece."
      ],
      "chaosEvents": [
        {
          "id": "hardcoded_secret",
          "title": "Calendar API Key Lands In Config",
          "problem": "Hardcoded Secrets Leak",
          "copy": "AI puts a dummy calendar/provider API key in the config to make the booking demo appear functional, even though this file might be checked in.",
          "danger": "Secrets or provider credentials leaked in the demo config.",
          "options": [
            {
              "id": "chaos_remove_secret_later",
              "label": "Remove It Later",
              "icon": "KEY",
              "tone": "gray",
              "tags": [
                "Remove later",
                "Risky"
              ],
              "helper": "Make a mental note to remove the key later.",
              "tradeoff": "Fast for now, but risks leaking during review.",
              "resolveMsg": "The code runs, but the secret becomes a security debt that you must remember to clean up.",
              "lesson": "Code that runs is not necessarily code that is secure.",
              "problem": "Hardcoded Secrets Leak"
            }
          ],
          "skillOptions": [
            {
              "skill": "risk_scanner",
              "id": "chaos_risk_secret_alert",
              "label": "Risk Scanner Alert",
              "icon": "SCAN",
              "tone": "mint",
              "tags": [
                "Passive guard",
                "Early warning"
              ],
              "helper": "The system warns that a token/secret pattern is found in the code.",
              "tradeoff": "Requires time to inspect, but reduces damage.",
              "resolveMsg": "Risk Scanner alerts before code is submitted, enabling the team to fix it before secrets leak.",
              "lesson": "The speed of AI demands a real-time risk warning system."
            },
            {
              "skill": "scaffolds",
              "id": "chaos_security_scaffold",
              "label": "Security Checklist",
              "icon": "KIT",
              "tone": "mint",
              "tags": [
                "Checklist",
                "Prevent memory slips"
              ],
              "helper": "Use a checklist forbidding hardcoded secrets and requiring environment variables.",
              "tradeoff": "Adds inspection steps, but keeps junior developers from making mistakes.",
              "resolveMsg": "The checklist helps the team identify secrets and provider configs before merging the booking demo code.",
              "lesson": "Scaffolds help prevent security slips caused by rushing."
            }
          ]
        }
      ],
      "baseOptions": [
        {
          "id": "single_ai_pass",
          "label": "Batch The Planned Tasks",
          "icon": "ONE",
          "tone": "gray",
          "tags": [
            "+50%",
            "batch work"
          ],
          "helper": "Combine tasks that appear related to let AI execute them in a batch covering service, slot, form, and confirmation.",
          "tradeoff": "Fast and looks natural when the plan is clear, but checkpoints per task will be lost.",
          "outcome": "Work progresses fast and appears successful, but it is difficult for the team to identify which task introduced a bug or over-edit.",
          "lesson": "Batch work makes sense when tasks are small and tests are clear, but without checkpoints, it easily turns into rework."
        },
        {
          "id": "reprompt_loop",
          "label": "Patch From Latest Error",
          "icon": "LOOP",
          "tone": "gray",
          "tags": [
            "+35%",
            "Fast debug"
          ],
          "helper": "Use the latest error as context to let AI patch the failure immediately.",
          "tradeoff": "Helps when stuck, but without reviewing scope/tests, you start coding for symptoms.",
          "outcome": "AI overwrites code repeatedly; some bugs vanish but new bugs and over-edits start showing up.",
          "lesson": "The latest error is a good signal, but should not replace root-cause analysis and focused testing.",
          "problem": "Reprompting Loop Trap"
        },
        {
          "id": "manual_build",
          "label": "Execute Next Planned Task",
          "icon": "HND",
          "tone": "mint",
          "tags": [
            "+55%",
            "Next task"
          ],
          "helper": "Read the plan, select the next task, summarize what to do, and edit only the relevant files.",
          "tradeoff": "Slower than a single large prompt, but the team retains control over scope and code comprehension.",
          "outcome": "The team follows the plan task-by-task and leverages AI speed without losing control.",
          "lesson": "AI is a great multiplier when humans control tasks, files, and checkpoints."
        },
        {
          "id": "tool_rush_no_check",
          "label": "Generate UI Slice First",
          "icon": "GEN",
          "tone": "gray",
          "tags": [
            "+40%",
            "visual first"
          ],
          "helper": "Use tools to generate the booking UI slice first, then check where validation/state needs to be added.",
          "tradeoff": "Helps visualize the flow quickly, but validation, conflicts, and accessibility remain broken without focused tests.",
          "outcome": "The app looks ready very fast, but evidence that the completed task actually passes is lacking.",
          "lesson": "Visual slices help discuss requirements, but must be backed by focused tests and evidence.",
          "problem": "Delegated QA to AI"
        }
      ],
      "skillOptions": [
        {
          "skill": "tdd",
          "id": "tdd_guard",
          "label": "TDD Loop",
          "icon": "TDD",
          "tone": "blue",
          "tags": [
            "+55%",
            "focused test"
          ],
          "helper": "Write a failing test first, write minimal code to pass, refactor, rerun tests, and only then proceed to the next task.",
          "tradeoff": "Takes more time, but catches bugs before crossing to the next task.",
          "outcome": "The team observes the red -> green -> refactor -> rerun flow of this task before moving to the next part.",
          "lesson": "TDD Loop forces the AI to work on one task at a time, providing proof that tests actually pass, not just that the UI looks nice."
        },
        {
          "skill": "risk_scanner",
          "id": "risk_scanner_watch",
          "label": "Real-time Risk Scanner",
          "icon": "SCAN",
          "tone": "mint",
          "tags": [
            "+50%",
            "Risk alert"
          ],
          "helper": "Alerts when editing files out of scope, missing tests, exposing secrets, or risking data integrity.",
          "tradeoff": "Has overhead, but halts risks before they propagate to the next task.",
          "outcome": "The team sees warnings as soon as the code becomes fragile, without waiting for the booking flow to crash.",
          "lesson": "The speed of AI requires early warning systems for scope, security, and data integrity."
        },
        {
          "skill": "terraform_skill",
          "id": "terraform_plan_only_gate",
          "label": "Plan-Only IaC Gate",
          "icon": "IAC",
          "tone": "blue",
          "tags": [
            "+50%",
            "no apply"
          ],
          "helper": "Run Terraform plan-only: fmt, validate, test, and plan, stopping before apply or destroy.",
          "tradeoff": "Slower than generating and deploying directly, but protects live resources from damage.",
          "outcome": "The team obtains evidence from plan/test without creating or deleting live resources.",
          "lesson": "Infra workflow must require human approval before executing apply or destroy commands."
        },
        {
          "skill": "scaffolds",
          "id": "debug_scaffold",
          "label": "Executing Plan Checklist",
          "icon": "KIT",
          "tone": "mint",
          "tags": [
            "+50%",
            "All 7 steps"
          ],
          "helper": "Use a checklist: read plan, choose task, summarize, relevant files, focused test, summarize result, stop/ask.",
          "tradeoff": "Slower than copying errors, but fixes the root cause and respects checkpoints.",
          "outcome": "The team executes based on evidence rather than repeatedly feeding raw errors back to the AI.",
          "lesson": "Scaffolds prevent Executing Plans from turning into a reprompt loop."
        },
        {
          "skill": "walkthrough",
          "id": "walkthrough_explain",
          "label": "Code Walkthrough",
          "icon": "WALK",
          "tone": "mint",
          "tags": [
            "+35%",
            "Understand code"
          ],
          "helper": "Force AI to explain state, validation and handoffs step-by-step.",
          "tradeoff": "Spends extra time and token, but reduces code confusion.",
          "outcome": "The team understands the logic behind the booking flow rather than hoping it works.",
          "lesson": "Explain helps junior developers inspect the actual code path."
        }
      ],
      "synergyOptions": [
        {
          "id": "synergy_guardrails",
          "label": "Spec-Test Guardrails",
          "icon": "SHD",
          "tone": "blue",
          "tags": [
            "+90%",
            "spec + test"
          ],
          "helper": "Use Spec + TDD Loop to verify that the task matches the spec: write a failing test -> write minimal code to pass -> refactor -> rerun tests -> proceed to the next task before accepting code.",
          "tradeoff": "Invests tokens and time to gather evidence, but you must still judge if the test scope is sufficient.",
          "outcome": "Work progresses fast, yet Spec remains the target, and TDD Loop provides proof that the task actually passes.",
          "lesson": "Spec defines what to build, while TDD Loop verifies that the task actually passes before proceeding."
        },
        {
          "id": "iac_safety_gate",
          "label": "IaC Safety Gate",
          "icon": "IAC",
          "tone": "blue",
          "tags": [
            "+90%",
            "plan + risk"
          ],
          "helper": "Combine Terraform plan-only evidence with risk scanner to check drift, secrets/state, destructive changes, and approval before apply/destroy.",
          "tradeoff": "Takes more time and tokens, but closes infra risks affecting live resources.",
          "outcome": "The team inspects destructive changes, secret/state risks, and approval gates before touching live resources.",
          "lesson": "Good Terraform workflows demand plan, risk scans, and explicit approval before any resource-changing command."
        }
      ]
    },
    {
      "id": "review",
      "title": "Review",
      "goal": {
        "title": "Review Against Evidence",
        "copy": "Review is the phase to verify evidence that the Booking MVP is truly ready to ship, not just accepting AI's claim that it's done.",
        "guidance": [
          "Verify that the spec and acceptance criteria are fully met",
          "Check for files modified out of scope, documentation updates, and evidence",
          "Assess test coverage, security risks, and data integrity",
          "Catch hallucinations or assumptions invented by the AI",
          "Inspect for duplicate code and meaningful naming conventions"
        ]
      },
      "briefing": [
        "You must verify that the Booking MVP is truly ready to ship, rather than just taking the AI's word for it."
      ],
      "chaosEvents": [
        {
          "id": "shadow_it",
          "title": "Ops Asks For Booking Evidence",
          "problem": "Shadow IT Discovery",
          "copy": "Before delivery, the client reports that ops/IT must inspect evidence that the booking path matches the spec, acceptance criteria are complete, no files were modified out of scope, and tests, security, data integrity, documentation, and code quality actually pass.",
          "danger": "No audit evidence available.",
          "options": [
            {
              "id": "chaos_prepare_excuse",
              "label": "Prepare A Demo Excuse",
              "icon": "NOTE",
              "tone": "gray",
              "tags": [
                "Use excuses",
                "Risky"
              ],
              "helper": "Explain that this is a quick demo and promise documentation later.",
              "tradeoff": "Saves time, but severely damages trust.",
              "resolveMsg": "The explanation buys a little time, but IT still demands concrete evidence.",
              "lesson": "Projects built extremely fast without standards often fail enterprise audits.",
              "problem": "Shadow IT Discovery"
            }
          ],
          "skillOptions": [
            {
              "skill": "code_review",
              "id": "chaos_review_pack",
              "label": "Code Review Evidence",
              "icon": "CHK",
              "tone": "blue",
              "tags": [
                "Evidence",
                "Pass audit"
              ],
              "helper": "Gather evidence: does it match spec? are AC met? are there out-of-scope files? test coverage? security risks? data integrity? docs updated? hallucinations or guesses? duplicate code? meaningful naming?",
              "tradeoff": "Takes time to review, but provides concrete evidence to discuss with ops/IT.",
              "resolveMsg": "The team presents review notes, evidence, and fix logs for ops/IT audit, not just verbal claims that the AI finished the task.",
              "lesson": "Work claimed to be completed by AI must be audited against specs, evidence, scope, risks, and code quality before delivery."
            },
            {
              "skill": "context",
              "id": "chaos_context_for_it",
              "label": "CONTEXT.md For Ops",
              "icon": "CTX",
              "tone": "mint",
              "tags": [
                "Docs",
                "Scope limits"
              ],
              "helper": "Open project context, booking scope, and definition of done for audit.",
              "tradeoff": "Documentation does not fix bugs, but prevents the project from appearing as shadow IT.",
              "resolveMsg": "ops/IT reviews the scope boundaries and standards utilized, allowing them to verify from evidence.",
              "lesson": "Documentation prevents fast-paced projects from looking like undocumented shadow IT."
            },
            {
              "skill": "scaffolds",
              "id": "chaos_audit_scaffold",
              "label": "Review Template",
              "icon": "KIT",
              "tone": "mint",
              "tags": [
                "Template",
                "Full check"
              ],
              "helper": "Use a template to audit: spec matching, AC completeness, out-of-scope files, test coverage, security risks, data integrity, docs, hallucinations, duplicate code, and naming.",
              "tradeoff": "Requires going through checklist items, but prevents memory slips.",
              "resolveMsg": "Review templates enable the team to answer ops/IT questions systematically.",
              "lesson": "Scaffolds ensure standards do not depend solely on individual memory."
            }
          ]
        }
      ],
      "baseOptions": [
        {
          "id": "manual_check",
          "label": "Manual Smoke Test",
          "icon": "EYE",
          "tone": "mint",
          "tags": [
            "+40%",
            "Visual check"
          ],
          "helper": "Launch the app, try selecting services, selecting slots, filling contact info, confirming, and inspecting the booking list on desktop/mobile.",
          "tradeoff": "Verifies the basic user flow, but does not cover specs, security, data integrity, docs, hallucinations, or code quality.",
          "outcome": "The team catches visible issues, but lacks evidence that requirements are fully met and no files were modified out of scope.",
          "lesson": "Manual checks are better than no testing, but cannot replace a comprehensive Code Review."
        },
        {
          "id": "ai_self_review",
          "label": "AI Self Review",
          "icon": "AI",
          "tone": "gray",
          "tags": [
            "+45%",
            "AI review"
          ],
          "helper": "Have the same AI model review the code it just created, without cross-checking specs, tests, or file diffs.",
          "tradeoff": "Fast, but risks the AI praising its own work and missing its own hallucinations.",
          "outcome": "AI claims the work is ready, but missing acceptance checks, over-edits, and invented assumptions remain unchecked against original sources.",
          "lesson": "Never let the same AI model be the sole reviewer of its own code and hallucinations.",
          "problem": "Delegated QA to AI"
        },
        {
          "id": "ship_now",
          "label": "Send Polished Demo",
          "icon": "NOW",
          "tone": "gray",
          "tags": [
            "+60%",
            "Looks done"
          ],
          "helper": "Ship immediately because AI reports no errors and the demo looks fine.",
          "tradeoff": "Fastest, but risks severe production incidents.",
          "outcome": "Code is shipped without any code review against specs, acceptance criteria, file scope, or security.",
          "lesson": "AI makes code look finished quickly, but that doesn't mean it is truly ready to ship.",
          "problem": "Misleading Confidence"
        }
      ],
      "skillOptions": [
        {
          "skill": "code_review",
          "id": "code_review_final",
          "label": "Code Review",
          "icon": "CHK",
          "tone": "blue",
          "tags": [
            "+60%",
            "Rigorous review"
          ],
          "helper": "Audit: spec matching, AC completeness, out-of-scope files, test coverage, security risks, data integrity, docs, hallucinations, duplicate code, and naming.",
          "tradeoff": "Slower, but catches leaked bugs and detects over-edits.",
          "outcome": "The team catches risks before shipping, fixing them based on evidence rather than pure confidence.",
          "lesson": "Code Review is the final gate validating specs, acceptance, scope, tests, security, data, docs, hallucinations, and code quality."
        },
        {
          "skill": "walkthrough",
          "id": "code_walkthrough",
          "label": "Code Walkthrough",
          "icon": "WALK",
          "tone": "mint",
          "tags": [
            "+50%",
            "Understand code"
          ],
          "helper": "Force AI to explain the booking state, validation, data integrity, and potential assumptions, while the team questions it.",
          "tradeoff": "Spends tokens, but prevents the team from shipping code they do not comprehend.",
          "outcome": "The team uncovers places where the AI wrote overly complex code or invented unnecessary requirements, refactoring them to be simpler.",
          "lesson": "Developers must understand the code and references used by AI, rather than believing it's done just because the AI claims so."
        },
        {
          "skill": "tdd",
          "id": "acceptance_rerun",
          "label": "Rerun TDD Loop",
          "icon": "TDD",
          "tone": "mint",
          "tags": [
            "+55%",
            "Matches spec"
          ],
          "helper": "Rerun TDD Loop evidence: write a failing test, code minimal fix, refactor, rerun tests, and advance, covering critical booking paths.",
          "tradeoff": "Straightforward, but requires investing time.",
          "outcome": "The team clearly observes that the core task loops actually pass, identifying what still needs fixes before delivery.",
          "lesson": "TDD Loop provides proof that the code functions as agreed upon after refactoring and rerunning."
        },
        {
          "skill": "risk_scanner",
          "id": "risk_review_pass",
          "label": "Risk Scanner Review",
          "icon": "SCAN",
          "tone": "blue",
          "tags": [
            "+55%",
            "risk pass"
          ],
          "helper": "Check for no secrets, tests, fragile booking logic, missing validation, conflict handling, and data integrity.",
          "tradeoff": "Has overhead, but minimizes late-game risk.",
          "outcome": "Scanner points out warnings the team missed during visual smoke testing.",
          "lesson": "Accumulated risk must be visible before delivery."
        },
        {
          "skill": "terraform_skill",
          "id": "terraform_open_tofu_review",
          "label": "Terraform Review",
          "icon": "IAC",
          "tone": "blue",
          "tags": [
            "+50%",
            "infra review"
          ],
          "helper": "Inspect Terraform testing, module patterns, backend/state, variables/secrets, CI/CD, and production safety before delivery.",
          "tradeoff": "Requires extra review time, but reduces live infra risks that are hard to revert.",
          "outcome": "The team uncovers risks in modules, state, and CI/CD, knowing which commands require approval before touching live resources.",
          "lesson": "IaC reviews must audit both the code and resource impact, not just verifying that syntax passes."
        }
      ],
      "synergyOptions": [
        {
          "id": "review_walkthrough_combo",
          "label": "Review Walkthrough Pass",
          "icon": "CHK",
          "tone": "blue",
          "tags": [
            "+90%",
            "Understand & Audit"
          ],
          "helper": "Perform complete Code Review checklist alongside a walkthrough: spec matching, AC met, out-of-scope files, test coverage, security risks, data integrity, docs, hallucinations, duplicate code, and naming.",
          "tradeoff": "Invests time and tokens, but still requires deciding how to resolve issues using tests, specs, or handoff evidence.",
          "outcome": "The team catches bugs and comprehends why the fixes are necessary.",
          "lesson": "Good reviews enable the team to deliver code based on comprehension, not just faith in AI."
        },
        {
          "id": "spec_review_gate",
          "label": "Spec Evidence Gate",
          "icon": "GATE",
          "tone": "blue",
          "tags": [
            "+85%",
            "Audit vs Spec"
          ],
          "helper": "Use Spec + Code Review to check: spec matching, AC completeness, out-of-scope files, test coverage, security risks, data integrity, docs, hallucinations, duplicate code, and naming.",
          "tradeoff": "Slower, but evaluates code based on real scope limits and concrete evidence.",
          "outcome": "The team closes gaps between what was built and what was agreed upon, catching out-of-scope files before shipping.",
          "lesson": "Spec prevents reviews from being subjective and helps catch feature creep added by AI."
        }
      ]
    }
  ],
  "emergencyStep": {
    "id": "emergency",
    "title": "EMERGENCY: Vulnerable Developer Incident",
    "briefing": [
      "The system starts breaking during the demo, but the team relied solely on AI and can barely debug it on their own.",
      "Without pre-established workflow discipline, this incident could immediately ruin client trust."
    ],
    "event": {
      "id": "emergency_crisis",
      "title": "Production Incident",
      "problem": "The Vulnerable Developer Incident",
      "copy": "The client asks what happened, but the team lacks the Spec, Tests, or Review notes necessary to isolate the cause.",
      "danger": "critical risk"
    },
    "baseOptions": [
      {
        "id": "emergency_hotfix",
        "label": "Manual Root-Cause Hotfix",
        "icon": "FIX",
        "tone": "mint",
        "tags": [
          "Reliable",
          "Consumes time",
          "Resolves crisis"
        ],
        "helper": "Reproduce, isolate, fix, and verify the issue on your own.",
        "tradeoff": "Consumes significant time, but truly mitigates the risk.",
        "outcome": "The team fixes the root cause in time, demonstrating to the client that you are in control.",
        "lesson": "Sometimes there are no shortcuts; you must invest time to put out the fire."
      },
      {
        "id": "emergency_ai_patch",
        "label": "AI Quick Patch",
        "icon": "AI",
        "tone": "gray",
        "tags": [
          "Fast",
          "Spends tokens",
          "Unsecured"
        ],
        "helper": "Feed the raw error to AI immediately to get the demo running again.",
        "tradeoff": "Saves time, but risks introducing new bugs.",
        "outcome": "AI makes the primary bug disappear quickly, but the team doesn't know if other systems were broken in the process.",
        "lesson": "Putting out fires with AI requires caution: watch out for spreading issues.",
        "problem": "Reprompting Loop Trap"
      }
    ],
    "skillOptions": [
      {
        "skill": "scaffolds",
        "id": "emergency_escalation_path",
        "label": "Escalation Scaffold",
        "icon": "KIT",
        "tone": "blue",
        "tags": [
          "Recovery",
          "Process-driven"
        ],
        "helper": "Use a runbook: reproduce, isolate, rollback, verify, explain.",
        "tradeoff": "Takes time, but keeps the team calm and structured.",
        "outcome": "The Runbook guides the team through resolving the incident step-by-step and communicating clearly with the client.",
        "lesson": "Scaffolds give beginners a clear path to follow when systems crash."
      },
      {
        "skill": "walkthrough",
        "id": "emergency_walkthrough",
        "label": "Walk Through The Patch",
        "icon": "WALK",
        "tone": "mint",
        "tags": [
          "Understand cause",
          "Reduce guesswork"
        ],
        "helper": "Have AI explain the patch, then check it line-by-line before accepting.",
        "tradeoff": "Spends tokens and time, but avoids blindly accepting code patches.",
        "outcome": "The team isolates the cause and prevents AI from overwriting code that already functions.",
        "lesson": "Do not trust a patch just because it runs; understand what it actually fixes."
      },
      {
        "skill": "tdd",
        "id": "emergency_test_guard",
        "label": "Emergency Acceptance Test",
        "icon": "TDD",
        "tone": "blue",
        "tags": [
          "Verify",
          "Prevent regression"
        ],
        "helper": "Write a short test check to verify the primary bug does not regress.",
        "tradeoff": "Slower than raw patching, but provides proof that the fire is extinguished.",
        "outcome": "The team fixes it and verifies with a check, rather than just believing it because the screen is back up.",
        "lesson": "Tests turn disaster recovery into a verified process instead of guesswork."
      },
      {
        "skill": "risk_scanner",
        "id": "emergency_risk_scan",
        "label": "Incident Risk Scan",
        "icon": "SCAN",
        "tone": "blue",
        "tags": [
          "Scan",
          "Prevent regressions"
        ],
        "helper": "Scan for regressions that the patch might have introduced elsewhere.",
        "tradeoff": "Spends extra tokens, but minimizes hidden risk.",
        "outcome": "The team uncovers side effects before they reach the client.",
        "lesson": "Risk Scanner halts rushed patches from turning into a second production incident."
      }
    ]
  }
};

const stage02 = {
  "id": "stage_02",
  "status": "coming_soon",
  "title": "SUPERPOWER WORKFLOW",
  "stage": "Stage 02: Legacy Code Crisis",
  "intro": "Coming Soon — a legacy codebase is breaking production. Can your AI workflow survive a refactor under fire?"
};

function choiceEffects(option) {
  return {
    time: Number.isFinite(option.effects?.time) ? option.effects.time : 0,
    token: Number.isFinite(option.effects?.token) ? option.effects.token : 0,
    risk: Number.isFinite(option.effects?.risk) ? option.effects.risk : 0,
    quality: Number.isFinite(option.effects?.quality) ? option.effects.quality : 0,
  };
}

function defaultChoiceSolves(option) {
  const effects = choiceEffects(option);
  const progress = Number.isFinite(option.progress) ? option.progress : 0;
  const solves = [];

  if (option.preventPenalty) solves.push("Resolve current Issue");
  if (option.requires?.length) solves.push("Use Combo to close multiple Gaps");
  else if (option.skill) solves.push("Use skill to resolve specific issues");
  if (effects.risk < 0) solves.push("Reduce Risk");
  if (effects.quality > 0) solves.push("Increase Quality & Evidence");
  if (progress >= 100) solves.push("Complete Phase");
  else if (progress >= 60) solves.push("Accelerate Progress");
  else if (progress >= 40) solves.push("Advance Work");
  if (!solves.length && effects.risk >= 3) solves.push("Accelerate work but increase Risk");

  return solves.slice(0, 3).join(" · ") || "Create a tactical choice for this situation";
}

function defaultChoiceMisses(option) {
  const effects = choiceEffects(option);
  const misses = [];

  if (effects.risk >= 4) misses.push("High risk can trigger a phase issue");
  else if (effects.risk >= 2) misses.push("Leaves risk that needs another guardrail");
  if (effects.quality <= -2) misses.push("Creates quality debt");
  else if (effects.quality < 0) misses.push("Lowers delivery quality");
  if (effects.token >= 3) misses.push("Spends a lot of AI budget");
  if (effects.time >= 3) misses.push("Consumes deadline room");

  return misses.join(" / ") || option.tradeoff || "Still needs verification in a later decision";
}

function hydrateChoiceMeaning(options = []) {
  options.forEach((option) => {
    option.purpose ??= option.helper || "Pick this to respond to the current workflow pressure";
    option.solves ??= defaultChoiceSolves(option);
    option.misses ??= defaultChoiceMisses(option);
  });
}

function hydrateGameplayChoiceMeaning(data) {
  data.steps.forEach((step) => {
    hydrateChoiceMeaning(step.baseOptions);
    hydrateChoiceMeaning(step.skillOptions);
    hydrateChoiceMeaning(step.synergyOptions);
    step.chaosEvents?.forEach((event) => {
      hydrateChoiceMeaning(event.options);
      hydrateChoiceMeaning(event.skillOptions);
    });
  });

  if (data.emergencyStep) {
    hydrateChoiceMeaning(data.emergencyStep.baseOptions);
    hydrateChoiceMeaning(data.emergencyStep.skillOptions);
  }
}

const allStages = [stage01, stage02];

allStages.forEach((stage) => {
  if (stage.steps) hydrateGameplayChoiceMeaning(stage);
});

export default allStages;
