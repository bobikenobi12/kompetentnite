export const generateRandomObstacles = (rows, cols) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(false);
    }
    grid.push(currentRow);
  }
  generateOnRandom(grid);
  return grid;
};
const generateOnRandom = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const minSize = cols > rows ? rows : cols;
  const walls = Math.floor(Math.Random() * (rows * cols) * 0.25);
  for (let wall = 0; wall < walls; wall++) {
    const startRow = Math.floor(Math.Random() * (rows - 1));
    const startCol = Math.floor(Math.Random() * (cols - 1));
    const directionX = randomDirection();
    const directionY = randomDirection();

    let currRow = startRow;
    let currCol = startCol;
    const length = Math.floor(Math.Random() * minSize);

    for (let i = 0; i <= length; i++) {
      if (
        currRow === rows ||
        currCol === cols ||
        currRow < 0 ||
        currCol < 0
      ) {
        break;
      }
      grid[currRow][currCol] = true;
      currRow += directionX;
      currCol += directionY;
    }
  }
};

const randomDirection = () => {
  const rand = Math.random();
  return rand < 0.33 ? -1 : rand > 0.66 ? 1 : 0;
};