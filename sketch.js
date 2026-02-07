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
GRID LEGEND:
- 0 = floor (walkable)
- 1 = wall (blocked)
- 2 = word / collectible
*/

const levels = [
  {
    name: "Level 1",
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 2, 0, 1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },

  {
    name: "Level 2",
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
let words = [];
let grid = [];
let rows = 0;
let cols = 0;
let collected = 0;
let totalWords = 0;

function loadLevel(index) {
  currentLevel = index;
  grid = levels[currentLevel].grid;
  rows = grid.length;
  cols = grid[0].length;

  resizeCanvas(cols * TS, rows * TS);

  // random player spawn
  const spawn = randomSpawn();
  player.r = spawn.r;
  player.c = spawn.c;

  // build words list from grid
  words = [];
  collected = 0;
  totalWords = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) {
        words.push({
          r: r,
          c: c,
          text: "WORD",
        });
        totalWords++;
      }
    }
  }
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

  // wall blocked
  if (grid[nr][nc] === 1) return;

  // if stepping on a word, collect it
  if (grid[nr][nc] === 2) {
    grid[nr][nc] = 0; // remove from map
    collected++;

    // remove from words array so it stops drawing
    words = words.filter((w) => !(w.r === nr && w.c === nc));
  }

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
    `${levels[currentLevel].name} — player: (${player.r}, ${player.c}) — words: ${collected}/${totalWords}`,
    10,
    6,
  );

  // --- draw words ---
  fill(120, 80, 200);
  textAlign(CENTER, CENTER);

  for (let w of words) {
    text(w.text, w.c * TS + TS / 2, w.r * TS + TS / 2);
  }
}

function keyPressed() {
  if (key === "1") loadLevel(0);
  if (key === "2") loadLevel(1);

  if (keyCode === LEFT_ARROW) tryMove(0, -1);
  if (keyCode === RIGHT_ARROW) tryMove(0, 1);
  if (keyCode === UP_ARROW) tryMove(-1, 0);
  if (keyCode === DOWN_ARROW) tryMove(1, 0);
}
function randomSpawn() {
  let r, c;

  do {
    r = floor(random(rows));
    c = floor(random(cols));
  } while (grid[r][c] !== 0);

  return { r, c };
}
