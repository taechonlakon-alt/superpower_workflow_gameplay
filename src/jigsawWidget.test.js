import test from "node:test";
import assert from "node:assert/strict";

import { getJigsawProgressState, getJigsawTileStyle } from "./jigsawWidget.js";

test("getJigsawProgressState reveals more tiles as progress increases", () => {
  const start = getJigsawProgressState({ progress: 0, requiredProgress: 100, currentLevel: 1 });
  const mid = getJigsawProgressState({ progress: 44, requiredProgress: 100, currentLevel: 1 });
  const full = getJigsawProgressState({ progress: 100, requiredProgress: 100, currentLevel: 1 });

  assert.equal(start.revealedCount, 0);
  assert.equal(mid.revealedCount, 4);
  assert.equal(full.revealedCount, 9);
  assert.equal(full.nextLevel, 2);
});

test("getJigsawProgressState reduces revealed tiles when progress drops", () => {
  const high = getJigsawProgressState({ progress: 78, requiredProgress: 100, currentLevel: 2 });
  const low = getJigsawProgressState({ progress: 21, requiredProgress: 100, currentLevel: 2 });

  assert.equal(high.revealedCount, 8);
  assert.equal(low.revealedCount, 2);
});

test("getJigsawProgressState clamps next level at max level", () => {
  const result = getJigsawProgressState({ progress: 100, requiredProgress: 100, currentLevel: 5 });

  assert.equal(result.nextLevel, 5);
  assert.equal(result.imageSrc, "/assets/cathappy/lv5.gif");
});

test("getJigsawTileStyle maps tile index to stable background offsets", () => {
  assert.equal(getJigsawTileStyle(0), "--tile-index: 0; --tile-x: 0%; --tile-y: 0%;");
  assert.equal(getJigsawTileStyle(4), "--tile-index: 4; --tile-x: 50%; --tile-y: 50%;");
  assert.equal(getJigsawTileStyle(8), "--tile-index: 8; --tile-x: 100%; --tile-y: 100%;");
});
