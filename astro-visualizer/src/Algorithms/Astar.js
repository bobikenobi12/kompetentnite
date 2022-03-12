import PriorityQueue from "priorityqueuejs";
import { outOfBounds } from "../RandObstacles/RandomDraw";

export function euclidianDistance(node, targetNode) {
    const dx=node.row - targetNode.row;
    const dy=node.col - targetNode.col;

   return Math.sqrt((dx*dx)+(dy*dy));
}

export function manhattanDistance(node, targetNode) {
    const dx=Math.abs(node.row - targetNode.row);
    const dy=Math.abs(node.col - targetNode.col);

    return dx + dy;
}

export function maxComponentDistance(node, targetNode) {
    const dx=Math.abs(node.row - targetNode.row);
    const dy=Math.abs(node.col - targetNode.col);

    return Math.max(dx, dy);
}

export const aStar = (grid, startNode, finishNode, heuristic) => {
  const { rows, cols } = extractSizes(grid);
  const cells = rows * cols;
  grid.forEach((row) => {
      row.forEach((node) => {
          node.distance = cells+1;
      })
  })
  startNode.distance = 0;
  let queue = new PriorityQueue(function (leftNode, rightNode) {
    const totalDistanceToLeft =
      leftNode.distance + heuristic(leftNode, finishNode);
    const totalDistanceToRight =
      rightNode.distance + heuristic(rightNode, finishNode);
    return totalDistanceToRight - totalDistanceToLeft;
  });

  queue.enq(startNode);
  let nodesInOrder = [];
  while (queue.size() !== 0) {
    const currNode = queue.deq();
    if (currNode.isVisited || currNode.isWall) {
      continue;
    }
    currNode.isVisited = true;
    nodesInOrder.push(currNode);
    if(currNode===finishNode) {
        break;
    }
    const neighbors = getUnvisitedNeighbors(currNode, grid);
    neighbors.forEach((neighbor) => {
      let alternativeDistance = currNode.distance + 1;
      if (alternativeDistance < neighbor.distance) {
        neighbor.distance = alternativeDistance;
        neighbor.previousNode = currNode;
        queue.enq(neighbor);
      }
    });
  }
  return nodesInOrder;
};

function getUnvisitedNeighbors(node, grid) {
	const neighbors = [];
	const { col, row } = node
	if (row > 0) neighbors.push(grid[row - 1][col]);
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
	if (col > 0) neighbors.push(grid[row][col - 1]);
	if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
	return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function extractSizes(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  return { rows, cols };
}
