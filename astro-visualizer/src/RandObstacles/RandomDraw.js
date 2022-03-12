const threshold = 0.8;

const makeGrid = (rows, cols) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(false);
    }
    grid.push(currentRow);
  }
  return grid;
}

export const generateRandomObstacles = (rows, cols) => {
  const grid = makeGrid(rows, cols);
  const wallsInOrder = generateOnRandom(grid);
  return wallsInOrder;
};

const outOfBounds = (row, col, rows, cols) => {
  return row === rows || col === cols || row < 0 || col < 0
}

const randomIntUpToLimit = (limit) => {
  return Math.floor(Math.random() * limit);
}

const extractSizes = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;
  return {rows, cols};
}

const generateOnRandom = (grid) => {
  const wallsInOrder = [];
  const {rows, cols} = extractSizes(grid);
  const minSize = cols > rows ? rows : cols;
  const walls = Math.floor(randomIntUpToLimit(rows+cols) * threshold);
  for (let wall = 0; wall < walls; wall++) { 
    const startRow = randomIntUpToLimit(rows);
    const startCol = randomIntUpToLimit(cols);
    const directionX = randomDirection();
    const directionY = randomDirection();

    let currRow = startRow;
    let currCol = startCol;
    const length = Math.floor(Math.random() * minSize);
    let currPath = [];
    for (let i = 0; i <= length; i++) {
      if (outOfBounds(currRow, currCol, rows, cols)) {
        break;
      }
      currPath.push({row: currRow, col:currCol})
      grid[currRow][currCol] = true;
      currRow += directionX;
      currCol += directionY;
    }
    wallsInOrder.push(currPath);
  }
  return wallsInOrder;
};

const randomDirection = () => {
  const rand = Math.random();
  return rand < 0.33 ? -1 : rand > 0.66 ? 1 : 0;
};