# SUPERPOWER WORKFLOW

React/Vite frontend for the `SUPERPOWER WORKFLOW` browser game.

## Development

```bash
npm install
npm run dev
```

Vite serves the app at the local URL printed in the terminal, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

The production build is written to `dist/`.

## Current Migration Notes

The project has a React entrypoint, while the proven legacy game engine is mounted through `src/components/LegacyGameHost.jsx`.

The initial gameplay flow is: title/start screen, Superpower Draft skill selection, then the first `Phase Goal` before `Brainstorm` choices. Players inspect skill cards and choose exactly 3 Superpowers before `Start Mission` is enabled.

## Random Modifier Gimmick

During a run, the game can now inject light always-on `Random Modifier` events after normal decision results. These are gamey pressure changes such as Token Leak, Deadline Jitter, Risk Spike, Lucky Guardrail, and Context Static.

Random modifiers are capped at 1-2 per run, do not replace phase issues, and are reported separately from `Problems Triggered` in the final report. They use a light 25% roll and should not stack on the same transition as phase completion, phase issues, or micro-events.

## Balance Notes

Phase issues are pressure-based. They appear when a normal choice creates high risk, creates heavy quality debt, or the player stalls in the same phase after multiple decisions. Good Execute/Review routes can now finish cleanly, while risky shortcuts can still trigger issue/emergency pressure.

Every playable choice is hydrated with tactical meaning fields (`purpose`, `solves`, `misses`). Choice cards stay compact by showing what the option fixes, while decision results can explain why it mattered and what remains uncovered.

Score tiers use ceilings from risk, token debt, quality, and risky choices. `Workflow Master` requires low risk, high quality, no token debt, limited risky choices, and repeated skill/synergy use.

## Desktop UX Notes

The current UI pass is desktop-first for `1280x800` and `1440x900`. Resource meters, Phase Goal popups, skill cards, and choice cards should stay scan-friendly on desktop; mobile should remain usable but is a follow-up optimization target.
