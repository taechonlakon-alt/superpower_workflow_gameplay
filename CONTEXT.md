# SUPERPOWER WORKFLOW Context

## Project Summary

`SUPERPOWER WORKFLOW` is a single-screen browser game about managing AI-assisted work through a structured workflow instead of raw vibe coding.

The player acts as a developer guiding AI through a short decision-based stage. Each choice changes project resource state:

- `Time`
- `Token`
- `Risk`
- `Quality`

`Token` is not score. It represents remaining AI usage budget and cognitive review capacity. The Resource Bar shows `Time / Token / Risk` clearly during play. `Time` means remaining deadline room and uses the stage time cap, so low Time means the deadline is squeezing the team. Lower `Token` means AI budget is running out, token debt means the team has overused AI, and higher `Risk` means the project is closer to breaking. `Quality` remains internal and is expressed through consequences and the final report.

## Product Goal

The game should help players understand:

- why workflow matters when using AI
- when speed creates risk
- how AI can help or hurt depending on context
- why review, planning, and structured execution reduce failure
- why tools, scanners, reviews, and scaffolds still need human direction

The experience should feel:

- easy to understand
- readable
- game-like
- replayable
- lightweight
- visually playful without being childish

The current design goal is no longer just “teach workflow clearly.” It should feel more like a `workflow survival game`: players learn through consequences, pressure, emergency events, and final archetype feedback.

## Technical Constraints

The project has been migrated from a static file app to a React/Vite frontend.
Keep the runtime simple and preserve the legacy gameplay behavior while the UI is migrated incrementally.

- `index.html`
- `package.json`
- `vite.config.js`
- `src/main.jsx`
- `src/App.jsx`
- `src/components/LegacyGameHost.jsx`
- `src/data/gameData.js`
- `src/legacyGame.js`
- `src/styles.css`

Use React + Vite + JavaScript. Do not add TypeScript or a state library unless the legacy engine is being actively decomposed into React components and the extra structure is justified.

Current file split:

- `src/data/gameData.js` owns gameplay content and data: title, caps, skills, stages, choices, effects, lessons, chaos events, and emergency options.
- `src/legacyGame.js` currently owns the legacy game engine and generated UI behavior: state, rendering, choice handling, reports, sounds, and interactions.
- `src/components/LegacyGameHost.jsx` mounts the legacy engine inside React while the UI is migrated incrementally.
- `src/styles.css` owns the global visual system and resolves assets through Vite.

Run locally with:

- `npm install`
- `npm run dev`
- `npm run build`

The game no longer supports opening `index.html` directly as the primary runtime path because Vite now owns module resolution and asset bundling.

## React Migration State

This checkout is now a React/Vite frontend named `superpower_workflow_game`.

The current migration keeps the proven gameplay engine intact inside `src/legacyGame.js` and mounts it through React. Future work should move rendering into React components phase by phase, but must preserve current gameplay behavior before deleting the legacy renderer.

Start-flow invariant:

- The player should first see the title/start screen with the `เริ่มภารกิจ` button.
- Pressing `เริ่มภารกิจ` should show the Superpower Draft skill-selection screen.
- The Superpower Draft starts with no skills selected.
- Players inspect skill details and choose exactly 3 skills before pressing `Start Mission`.
- Pressing `Start Mission` with exactly 3 skills should enter `Brainstorm`; before that it should stay disabled.
- `Brainstorm` should first show its `Phase Goal` popup; pressing `เริ่มต่อไป` reveals the `Brief` and choices.
- In code, initial `screen` should remain `"title"` and `starterWorkflowSkills` should remain `[]` unless a deliberate redesign changes the start flow.

## Current Gameplay Structure

The current demo is one stage:

- `Booking MVP Rush`

The stage brief is a Booking MVP for a service business:

- user selects a service
- user selects date/time
- user enters contact details
- user confirms the booking
- team can see a basic booking list

Out of scope for the MVP: payment, auth, marketplace, notification automation, CRM, and a full staff platform.

The stage has 4 main decision phases:

1. `Brainstorm`
2. `Plan`
3. `Execute`
4. `Review`

The phase bar also includes:

- `Report`

Each phase presents:

- a one-time `Phase Goal` popup
- a short briefing
- an event
- base choices
- optional skill choices unlocked by drafted skills
- optional synergy choices unlocked by specific skill combinations

## Phase Labels And Briefs

The phase bar should clearly show all 5 labels:

- `Phase 1` Brainstorm
- `Phase 2` Plan
- `Phase 3` Execute
- `Phase 4` Review
- `Phase 5` Report

The `Phase Goal` popup explains what the phase is for and shows up to five guidance items. After the player presses `เริ่มต่อไป`, the main panel should show only the `Brief` for phase context. `Brief` should be a compact task statement, not a repeated workflow checklist.

## Phase Issues

Phase issues are deterministic and must belong to the current phase. Do not use random chance to pull unrelated issues into the wrong phase.

Phase issues are pressure-based, not just `progress < requiredProgress`. A normal decision can reveal the phase issue when the latest choice adds high risk (`risk >= 4`), creates heavy quality debt (`quality <= -2`), or the player has made 2 normal decisions in the same phase and still has not reached required progress. A completed phase should advance before any issue, micro-event, or random modifier can interrupt it.

Current phase issue mapping uses hybrid edge cases:

- `Brainstorm` -> `Brief Missing Booking Rules`, mapped to the broader vulnerable/unclear brief problem
- `Plan` -> `AI Expands Booking MVP Into Platform`, mapped to the broader scope/complexity problem
- `Execute` -> `Calendar API Key Lands In Config`, mapped to the broader implementation/security problem
- `Review` -> `Ops Asks For Booking Evidence`, mapped to the broader audit/trust/review problem

The event label should name the current phase, such as `Brainstorm Issue`, so the player can connect the problem to the workflow step.

## External Signals

The game has an always-on light external-pressure gimmick. It is not a Hard Mode toggle.

External signals can appear after a normal decision result and before the game continues back into the phase flow. They should not replace or randomize phase issues.

Current rules:

- roll only after normal decision results, never during setup, emergency, or final report
- base chance is 22%
- maximum is 2 external signals per run
- cooldown is 1 decision after a signal triggers
- if no signal has appeared by `Execute`, the first Execute decision can force the first signal
- do not repeat the same modifier in one run
- do not stack external signals on the same transition as phase completion, phase issue, or micro-event
- harmful signals can only appear when the run already has pressure from risky choices, quality debt, time pressure, or AI budget pressure
- clean routes can receive a safe/forecast signal instead of a punishment

External signals use normal resource effects, so they affect score through `Time`, `Token`, `Risk`, and internal `Quality`. They are still reported separately as `Random Modifiers` and must not be counted as `Problems Triggered`.

## Phase Goal And Completion

There is no `Phase Summary` screen during play.

After a normal phase reaches its required progress and the player continues from the decision result, the game moves directly to the next phase. The completed phase evaluation is still stored in `state.phaseSummaries[]` for final report feedback and tuning.

When a normal phase is entered for the first time, the game shows a `Phase Goal` popup with the phase meaning and up to five guidance items. The player presses `เริ่มต่อไป` before seeing the `Brief`, Resource Bar, Superpower Hand, and choices. The popup appears once per normal phase and does not appear for Emergency.

Each main phase should define:

```js
goal: {
  title: string,
  copy: string,
  guidance?: string[]
}
```

The goal `copy` should explain what the phase does and why it matters. `guidance` renders as a concise list of no more than five items in the popup.

The `briefing` field should stay short and situational:

- `Brainstorm`: what app the client needs.
- `Plan`: what deliverable must be planned.
- `Execute`: what must be built.
- `Review`: what must be verified before delivery.

Current phase goals:

- `Brainstorm`: define the app goal from the brief.
- `Plan`: turn the goal into files, tests, order, verify, risks, and scope guard.
- `Execute`: execute the plan one task at a time with guardrails.
- `Review`: review against evidence before delivery.

Current phase guidance:

- `Brainstorm`: read docs/brief, summarize goal, propose core flow, explain trade-offs, ask remaining unknowns.
- `Plan`: files/new files, tests, task order, verify, risks, and scope guard.
- `Execute`: read plan, choose task, summarize, edit relevant files, run focused test, summarize result, then stop or ask before the next task.
- `Review`: spec/acceptance, file scope/docs/evidence, tests/security/data integrity, hallucination, duplication, and naming.

## Execute Flow

Execute is `Executing Plans`, not raw coding speed.

The correct flow is:

1. read the plan
2. choose the next task
3. summarize what will be done
4. edit only relevant files
5. run a focused test
6. summarize the result
7. stop or ask before the next task

Execute choices and skill choices should teach this flow. Risky options should represent realistic shortcuts such as running the whole plan in one prompt, patching without root cause, generating without focused tests, or skipping scope checks.

## TDD Loop

`TDD` skill and TDD-related choices should teach this exact loop:

1. เขียน test ให้พังก่อน
2. เขียนโค้ดให้น้อยที่สุดให้ test ผ่าน
3. ปรับโค้ดให้ดีขึ้น
4. รัน test ซ้ำ
5. ไป task ถัดไป

This is a gameplay copy/data rule only. Do not change option ids, skill bindings, synergy requirements, progress, or effects when aligning TDD copy unless the task explicitly asks for rebalance.

## Review Checklist

Review should test whether the Booking MVP is truly ready, not whether it merely looks finished.

Code Review should check this exact list:

- ทำตรง spec ไหม
- acceptance criteria ครบไหม
- มีไฟล์ที่แก้เกินไหม
- test ครอบคลุมไหม
- มี security risk ไหม
- data integrity โอเคไหม
- docs update ตรงไหม
- มี hallucination หรือข้อมูลที่เดาเองไหม
- code ซ้ำไหม
- naming สื่อความหมายไหม

Code Review-related choices should use this same checklist. Do not change option ids, skill bindings, synergy requirements, progress, or effects when aligning review copy unless the task explicitly asks for rebalance.

The game loop is:

1. Open the start scene.
2. Draft 3 Superpowers.
3. Read the phase event.
4. Choose a response.
5. See reaction, consequence, in-play hint, and lesson.
6. Continue directly to the next phase when phase progress is complete.
7. Handle emergency if risk becomes critical.
8. Review final report with final stats, phase learnings, Superpowers used, Problems triggered, Random Modifiers, and title badge.

## Superpower Draft

The game currently shows a short Superpower Draft before the mission. It starts with no skills selected. The player inspects skill cards, chooses exactly 3 Superpowers, and those choices unlock contextual options during `Brainstorm`, `Plan`, `Execute`, `Review`, and emergency recovery.

After the mission starts, the selected skills should stay visible as a compact `Superpower Hand`. This is a visual reminder that the player is carrying those skill cards like tools/weapons. It must not create a new skill-use mechanic; skill effects still happen through unlocked choices.

Current Superpowers:

- `Grill with Docs`
- `CONTEXT.md`
- `Spec Doc`
- `Implementation Plan`
- `TDD`
- `Code Review`
- `Code Walkthrough`
- `Real-time Risk Scanner`
- `Scaffolds`
- `Terraform`

Removed from the core skill list:

- `Git Worktree`
- `Subagents`
- `Plugins`
- `Task Breakdown`

Superpowers expose special choices in related phases. They are not free wins. A strong tool usually carries a cost such as time, token usage, review overhead, or deliberate planning effort.

## Skill Card UI

Skill cards should stay compact. Each card shows only a short `summary`, clamped to a small number of lines, so the Superpower Draft does not become a wall of text.

Full skill detail lives in the Skill Detail popup opened by clicking a skill card. The popup shows the skill icon, type, name, summary, full description, teaching point, and warning when present. Selection happens inside the popup:

- `เลือกสกิล` when the skill is not selected and fewer than 3 skills are selected.
- `ถอดสกิล` when the skill is already selected.
- `เลือกครบ 3 ใบแล้ว` disabled when the player tries to add a fourth skill.

The card itself should remain clickable even after 3 skills are selected so players can still inspect other skill details.

During the mission, clicking a `Superpower Hand` card can open the same Skill Detail popup for reading, but it should not allow changing the drafted skills mid-run.

## Terraform Skill Rule

`Terraform` is a playable Superpower selected as 1 of the 3 cards. It unlocks IaC-focused choices for Plan, Execute, and Review.

This skill covers Terraform testing, module patterns, CI/CD, production patterns, backend/state, variables/secrets, and direct Terraform best practices.

Safety rule: Terraform copy must never imply that AI should auto-run `terraform apply` or `destroy`. Infra skills are riskier than docs skills because they can involve commands that create or delete real resources. Gameplay copy should always frame this skill as plan-only, review-first, and approval-gated before any resource-changing command.

## Skill Synergy

Specific combinations of skills can unlock powerful synergy options.

Current example:

- `Spec Doc + TDD` unlocks `Automated Guardrails` during Execute.
- `Terraform + Real-time Risk Scanner` unlocks `IaC Safety Gate` during Execute.

Synergy options should feel special and powerful, but still have a cost. The current `Automated Guardrails` option increases token usage while strongly reducing risk.

## Choice Wording Direction

Choices should not be too obvious. Avoid labels that instantly reveal “this is wrong.”

Every playable choice should have tactical meaning. The data layer hydrates these optional fields for base, skill, synergy, issue, and emergency choices:

```js
{
  purpose: string,
  solves: string,
  misses: string
}
```

Choice cards show `solves` only so the screen stays lighter while still explaining what pressure the option can answer. Do not put `purpose` / `สำคัญเพราะ` back on the choice card. Decision results can show `purpose`, `solves`, `misses`, and an `In-Play Hint` so partial choices feel useful without pretending they solve everything.

Recent wording changes:

- `Build From Guess` became `Prototype From Team Instinct`
- `Rush To Execute` became `Execute From Latest Chat`
- `Single AI Pass` became `Full Booking Sprint`
- `Ship Now` became `Send Polished Demo`

The goal is to make choices sound like plausible real decisions, not quiz answers.

Risky choices may still reveal risk through tags and tradeoff text, but the label should not be a caricature.

Choice labels should avoid obvious red-flag wording. Prefer plausible shortcuts that a real team might choose under pressure.

## Consequence-first Learning

The game now uses a `reaction` field on important choices.

Shape:

```js
reaction: {
  tone: "safe" | "warn" | "danger" | "recovery",
  title: string,
  copy: string
}
```

Decision result screens should teach in this order:

1. `Reaction`: what visibly happened because of the choice
2. `What happened`: the concrete consequence
3. `Lesson`: the short learning takeaway

This is intentional. The player should learn from the consequence first, not from a lecture.

If a choice does not define `reaction`, the game generates a fallback reaction based on risk, quality, token use, and whether the event was countered.

## Micro-events

The game includes deterministic micro-events based on accumulated state. They are not random and should not feel unfair.

Only one micro-event can happen per run.

Current micro-events:

- `AI Context Drift`: can trigger when token usage is high.
- `Client Trust Shakes`: can trigger when risk is high.
- `Deadline Squeeze`: can trigger when time is high.

Micro-events are recorded in the Decision Timeline as `System Signal`.

Purpose:

- add pressure between normal choices
- make resource pressure feel alive
- increase replay value
- teach that consequences can emerge from accumulated behavior, not only one bad choice

## Emergency Phase

If `Risk` reaches critical level (`>= 8`) and the emergency has not already triggered, the game interrupts the normal flow with an emergency phase.

Current emergency:

- `EMERGENCY: Vulnerable Developer Incident`

The emergency asks the player to choose between:

- `Manual Hotfix`
- `AI Quick Patch`

After resolving emergency, the game advances to the next normal phase. It should not loop back to the same phase.

Emergency should feel dramatic, but not use heavy infinite animation.

## End Report

The final Workflow Report reveals:

- `Time Used`
- `Token Left`
- `Risk`
- `Workflow Score`
- score tier feedback
- Decision Timeline
- Final lesson
- Title badge / archetype

Score tier feedback uses five levels:

- `0-30`: `Workflow Breakdown`
- `31-50`: `Barely Survived`
- `51-70`: `Working but Fragile`
- `71-85`: `Solid Workflow`
- `86-100`: `Workflow Master`

Each tier should explain what the player did well or badly and what to focus on next.

Score ceilings prevent easier issue pacing from inflating grades:

- `risk >= 8`: max `70`
- `risk >= 6`: max `82`
- token debt `1-4`: max `84`
- token debt `5-9`: max `76`
- token debt `10+`: max `68`
- `quality < 6`: max `80`
- risky choices `>= 3`: max `75`

`Workflow Master` requires score `86-100`, `risk <= 3`, `quality >= 12`, no token debt, no more than 1 risky choice, and at least 3 skill/synergy uses. Final report should show score ceiling reasons when they apply.

The title badge is now an archetype object, not just a string.

Shape:

```js
{
  label: string,
  helper: string
}
```

Current archetypes include:

- `Workflow Master`
- `AI Conductor`
- `Fast but Fragile`
- `เดอะแฟลชงานหยาบ`
- `AI Simp`
- `Victim of Chaos`
- `Project Survivor`

Archetype purpose:

- increase replay value
- make the player remember their play style
- make the report feel like a game result, not a dashboard summary

## Balance Direction

The game should be more demanding than before, but still fair.

Recent simulation result:

- fail rate is about `37.9%`
- target fail rate is roughly `35-45%`
- optimal routes still win clearly

Recent balance changes:

- `Spec Doc`, `Implementation Plan`, and `Code Review` cost time because they create real guardrails.
- `Code Walkthrough` and `Real-time Risk Scanner` cost token because they add review and tool overhead.
- `Scaffolds` reduce risk for beginner-heavy decisions but still spend time.
- Fast choices such as `Full Booking Sprint`, `Copy Error To AI Again`, and `Send Polished Demo` now map directly to the updated problem set.

Design rule:

- no option should be good for free
- safe options should usually cost time or token
- fast options should usually increase risk or reduce quality
- tool-heavy options should spend token budget and can create token debt
- workflow-heavy options should reduce risk but feel like deliberate investment

## UX Direction

This is not a SaaS dashboard.

The intended direction is:

- `game UI first`
- `workflow sim second`

The interface should feel like:

- a mission screen
- a quest board
- a stage-based decision game
- a project survival board

It should not feel like:

- a clean admin dashboard
- a productivity app
- a web form with cards

## Visual Style

Target visual style:

- `Minecraft x Terraria inspired`
- pixel landscape background
- chunky menu-like UI
- readable body text
- mission board / quest board layout

Current implementation rule:

- use a scenic-only generated pixel landscape as the full-screen background
- build the gameplay UI, HUD, progress, panel, choices, and report as real HTML/CSS/JS on top

The page should read as:

- scenic pixel landscape in the back
- framed mission board in front
- game HUD layered above the scenery

## Font Direction

The project currently uses the `9 Pradit` font from ThaiFaces.

Current behavior:

- `9 Pradit` is loaded through `@font-face`
- it applies to Thai and English
- `index.html` uses `lang="th"`

Watch for readability issues because English game title text like `SUPERPOWER WORKFLOW` may lose some punch in `9 Pradit`. If it looks weak or overflows, adjust size, spacing, or font stack for display text only.

## Header Rules

The header is a mission banner, not a product navbar.

It includes:

- title glyph
- game title
- stage label
- stage description
- HUD-style Resource Bar
- sound toggle

## Resource Bar

The HUD shows raw resource numbers clearly during play.

During play, the Resource Bar should display:

- `Time: 20`
- `Token: 14`
- `Risk: 80`

Each value affects player decisions:

- low `Time` means the deadline is close and decisions are under pressure
- low `Token` means AI budget is running out and tool-heavy decisions are becoming expensive
- high `Risk` means the project is becoming fragile and may break

Resource meters can show visual warning states:

- stable
- warn
- danger

Relevant CSS classes:

- `.resource-meter--warn`
- `.resource-meter--danger`

## Main Panel Rules

The center panel is the gameplay focus.

It should feel like a compact pixel RPG mission board:

- large phase title with a small warning/quest badge
- visible event strip before choices
- orange/red event label and impact box
- compact choice rows
- icon block on the left
- decision text in the middle
- consequence/tradeoff badge on the right
- parchment surface inside a chunky stone/wood frame

The desktop-first target viewports are `1280x800` and `1440x900`. On desktop and laptop screens, the primary gameplay state should fit in one viewport without requiring vertical scrolling.

If the layout needs to compress, prefer reducing:

- spacing
- decorative height
- secondary text scale
- HUD density

Do not solve normal desktop gameplay by forcing scrolling.

Mobile should remain usable even when desktop is the primary target. At minimum there must be no horizontal scroll, buttons must remain tappable, and choice cards must stack instead of overlapping.

## Choices

Choices must feel:

- pressable
- chunky
- game-like

Choice hover should:

- lift slightly
- increase visual weight
- brighten the consequence tag
- make the icon feel more active

Choice hover should not:

- become glossy SaaS cards
- use soft premium-dashboard motion
- rely on heavy continuous animation

## Visual Feedback

The game now has state-based visual feedback.

Relevant CSS classes:

- `.shell--tense`
- `.shell--critical`
- `.resource-meter--warn`
- `.resource-meter--danger`
- `.reaction-card--safe`
- `.reaction-card--warn`
- `.reaction-card--danger`
- `.reaction-card--recovery`
- `.timeline-item.is-signal`

Purpose:

- risk should feel visually heavier when it climbs
- low token remaining or token debt should make the Token meter feel less stable
- reaction cards should make consequences more readable
- emergency should feel urgent without becoming visually noisy

## Motion Rules

The project should avoid always-on heavy motion because it increases CPU/GPU work.

Allowed motion:

- hover feedback
- click feedback
- reveal feedback for event/result/state changes
- short emergency pulse

Avoid:

- infinite ambient animations across the whole screen
- parallax that continuously repaints everything
- flashy transitions between phases

Current emergency pulse is finite, not infinite.

## Design Priorities

When improving the UI, optimize in this order:

1. readability
2. game feel
3. visual cohesion between UI and world
4. lightweight rendering
5. pixel richness

## Current Validation

Latest validation completed:

- `node --check script.js` passed
- `node --check game-data.js` passed
- Node smoke render passed after loading `game-data.js` before `script.js`
- Node smoke flow passed for visible `Phase 1` through `Phase 5` labels, visible `Brief` header, and deterministic `Brainstorm Issue`
- Node smoke flow should verify one `Phase Goal` popup per normal phase, no popup for Emergency or repeat decisions, stored `state.phaseSummaries[]`, final score tier card, `Phase Learnings`, and preserved `Problems Triggered`
- starter workflow balance simulation passed
- current starter route fail rate about `31.9%`
- optimal route still wins

Known limitation:

- in-app browser visual verification failed because the browser runtime sandbox crashed during setup
- manual browser check is still recommended by opening `index.html`

## Current Open Directions

Useful future polish directions:

- stronger visual difference between safe, risky, recovery, and emergency states
- richer pixel cloud shapes
- stronger hill shading and layering
- better integration between the background world and the mission board
- more distinctive event states
- more stage variety later, but not before the first stage feels polished
- make skill builds feel more distinct, such as safe build, fast build, AI-heavy build, review-heavy build

Avoid:

- turning the page back into a dashboard
- adding ambient animation loops everywhere
- over-decorating the interface at the cost of clarity
- adding a new stage before the core loop feels fun and replayable
