const TOTAL_TILES = 9;
const GRID_SIZE = 3;
const IMAGE_ASPECT_RATIO = 2;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function getJigsawTileStyle(index, gridSize = GRID_SIZE) {
  const safeIndex = clamp(Number(index) || 0, 0, gridSize * gridSize - 1);
  const row = Math.floor(safeIndex / gridSize);
  const col = safeIndex % gridSize;
  const maxOffset = gridSize > 1 ? 100 : 0;
  const step = gridSize > 1 ? maxOffset / (gridSize - 1) : 0;

  return `--tile-index: ${safeIndex}; --tile-x: ${col * step}%; --tile-y: ${row * step}%;`;
}

export function getJigsawProgressState({
  progress = 0,
  requiredProgress = 100,
  currentLevel = 1,
  maxLevel = 5,
  totalTiles = TOTAL_TILES,
} = {}) {
  const safeRequired = requiredProgress > 0 ? requiredProgress : 100;
  const ratio = clamp(progress / safeRequired, 0, 1);
  const nextLevel = clamp(currentLevel + 1, 1, maxLevel);
  const revealedCount = ratio <= 0 ? 0 : Math.min(totalTiles, Math.ceil(ratio * totalTiles));
  const pieces = Array.from({ length: totalTiles }, (_, index) => ({
    index,
    revealed: index < revealedCount,
    style: getJigsawTileStyle(index),
  }));

  return {
    currentLevel,
    nextLevel,
    ratio,
    percentage: Math.round(ratio * 100),
    imageAspectRatio: IMAGE_ASPECT_RATIO,
    totalTiles,
    revealedCount,
    hiddenCount: totalTiles - revealedCount,
    imageSrc: `/assets/cathappy/lv${nextLevel}.gif`,
    pieces,
  };
}
