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
let grid = [];
let rows = 0;
let cols = 0;

function loadLevel(index) {
  currentLevel = index;
  grid = levels[currentLevel].grid;
  rows = grid.length;
  cols = grid[0].length;

  resizeCanvas(cols * TS, rows * TS);
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

/*
p5.js DRAW: Runs 60 times per second (game loop)
*/
function draw() {
  // Clear screen with light gray background each frame
  background(240);

  /*
  CORE RENDERING LOOP: Draw every tile in the grid
  
  Nested loops:
  - Outer loop: iterate ROWS (r = 0 to 10)
  - Inner loop: iterate COLUMNS in each row (c = 0 to 15)
  */
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) fill(30, 50, 60);
      else fill(230);

      rect(c * TS, r * TS, TS, TS);
    }
  }

  // UI LABEL: Explain what students are seeing
  // HUD bar
  noStroke();
  fill(220);
  rect(0, 0, width, 26);

  fill(0);
  textAlign(LEFT, TOP);
  text(`${levels[currentLevel].name} — grid render`, 10, 6);
}

function keyPressed() {
  if (key === "1") loadLevel(0);
  if (key === "2") loadLevel(1);
}
