import { makeGrid, extractSizes, randomIntUpToLimit } from "./RandomDraw";

export const generateMaze = (grid, startNode, targetNode) => {
  for (let i = 0; i < 100000; i++) {
      console.log(i);
    const { rows, cols } = extractSizes(grid);
    const visited = makeGrid(rows, cols);

    for (let row of grid) {
      for (let node of row) {
        if (node.isStart || node.isFinish) {
          continue;
        }
        node.isWall = true;
      }
    }
    const hasPath = processNode(
      grid,
      visited,
      startNode.row,
      startNode.col,
      targetNode.row,
      targetNode.col
    );
    if (hasPath) {
      return;
    }
  }
  throw new Error("Could not generate maze with a path");
};

const processNode = (grid, visited, currRow, currCol, targetRow, targetCol) => {
  visited[currRow][currCol] = true;
  grid[currRow][currCol].isWall = false;
  if (currRow === targetRow && currCol === targetCol) {
    return true;
  }
  const unvisitedNeighbors = getUnvisitedNeighbors(
    grid[currRow][currCol],
    grid,
    visited
  );
  if (unvisitedNeighbors.length === 0) {
    return false;
  }
  
  const idx = randomIntUpToLimit(unvisitedNeighbors.length);
  const neighbor = unvisitedNeighbors[idx];
  let hasPath = processNode(
    grid,
    visited,
    neighbor.row,
    neighbor.col,
    targetRow,
    targetCol
  );
  if (hasPath || (unvisitedNeighbors.length > 2 && Math.random() < 0.2)) {
    const otherIdx = randomIntUpToLimit(unvisitedNeighbors.length);
    if (otherIdx === idx) {
      return hasPath;
    }
    const neighbor = unvisitedNeighbors[otherIdx];
    hasPath ||= processNode(
      grid,
      visited,
      neighbor.row,
      neighbor.col,
      targetRow,
      targetCol
    );
  }

  return hasPath;
};

function getUnvisitedNeighbors(node, grid, visited) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !visited[neighbor.row][neighbor.col]);
}
