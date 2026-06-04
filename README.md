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

The initial gameplay flow is: title/start screen, Superpower Draft skill selection, then the first `Phase Goal` before `Brainstorm` choices.
