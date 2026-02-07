/*
Week 4 — Example 1: Grid + Static Maze
Course: GBDA302
Instructors: Dr. Karen Cochrane and David Han
Date: Feb. 5, 2026

PURPOSE: This is the simplest possible p5.js sketch that demonstrates:
1. How a 2D array represents a maze/game level
2. Nested loops to iterate through grid rows/columns
3. Converting grid coordinates (r,c) → screen coordinates (x,y)
4. Tile-based rendering (every cell = one rectangle)
*/

const TS = 32; // TILE SIZE: pixels per grid cell (32x32 squares)

/*
GRID LEGEND (how numbers map to visuals):
- 0 = floor (walkable, light gray)
- 1 = wall (blocked, dark teal)
*/
const levels = [
  {
    name: "Level 1",
    spawn: { r: 1, c: 1 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },

  {
    name: "Level 2",
    spawn: { r: 9, c: 14 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
];
let currentLevel = 0;
let player = { r: 1, c: 1 };
let grid = [];
let rows = 0;
let cols = 0;

function loadLevel(index) {
  currentLevel = index;
  grid = levels[currentLevel].grid;
  rows = grid.length;
  cols = grid[0].length;

  resizeCanvas(cols * TS, rows * TS);
  player.r = levels[currentLevel].spawn.r;
  player.c = levels[currentLevel].spawn.c;
}
/*
p5.js SETUP: Runs once when sketch loads
*/
function setup() {
  createCanvas(16 * TS, 11 * TS);
  noStroke();
  textFont("sans-serif");
  textSize(14);

  loadLevel(0);
}
function tryMove(dr, dc) {
  const nr = player.r + dr;
  const nc = player.c + dc;

  if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return;

  if (grid[nr][nc] === 1) return;

  player.r = nr;
  player.c = nc;
}

/*
p5.js DRAW: Runs 60 times per second (game loop)
*/
function draw() {
  background(240);

  // grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      fill(grid[r][c] === 1 ? color(30, 50, 60) : 230);
      rect(c * TS, r * TS, TS, TS);
    }
  }

  // player
  fill(255, 180, 0);
  rect(player.c * TS + 6, player.r * TS + 6, TS - 12, TS - 12);
  // --- HUD (draw LAST so it stays on top) ---
  noStroke();
  fill(220);
  rect(0, 0, width, 26);

  fill(0);
  textAlign(LEFT, TOP);
  text(
    `${levels[currentLevel].name} — player: (${player.r}, ${player.c})`,
    10,
    6,
  );
}

function keyPressed() {
  if (key === "1") loadLevel(0);
  if (key === "2") loadLevel(1);

  if (keyCode === LEFT_ARROW) tryMove(0, -1);
  if (keyCode === RIGHT_ARROW) tryMove(0, 1);
  if (keyCode === UP_ARROW) tryMove(-1, 0);
  if (keyCode === DOWN_ARROW) tryMove(1, 0);
}
