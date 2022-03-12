import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import Node from "./Node/Node";
import NavBar from "./NavBar/NavBar";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithms/Dijkstras";
import { generateRandomObstacles } from "./RandObstacles/RandomDraw";
import { generateMaze } from "./RandObstacles/Maze";
import {
  aStar,
  euclidianDistance,
  manhattanDistance,
  maxComponentDistance,
} from "./Algorithms/Astar";
import { algorithm, algorithmButtonText } from "./NavBar/NavBar";

const SLOW_SPEED = 60;
const MEDIUM_SPEED = 30;
const FAST_SPEED = 10;
const START_NODE_ROW = 15;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 35;
const ROWS = 25;
const COLS = 60;

export default function App() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseState] = useState(false);
  const [mainNode, setMainNode] = useState("");
  const [obstacles, setObstacles] = useState(false);
  const [startNodeRow, setStartNodeRow] = useState(15);
  const [startNodeCol, setStartNodeCol] = useState(10);
  const [finishNodeRow, setFinishNodeRow] = useState(15);
  const [finishNodeCol, setFinishNodeCol] = useState(35);
  const [speed, setSpeed] = useState(60);
  const [maze, setMaze] = useState("Random");
  const [isBlockedVisualize, setIsBlockedVisualize] = useState(false);
  const setNumberSpeed = (speedAsText) => {
    let speedAsNumber = SLOW_SPEED;
    switch (speedAsText) {
      case "Fast":
        speedAsNumber = FAST_SPEED;
        break;
      case "Medium":
        speedAsNumber = MEDIUM_SPEED;
        break;
      case "Slow":
        speedAsNumber = SLOW_SPEED;
        break;
      default:
        throw new Error(`${speedAsText} is unknown`);
    }
    setSpeed(speedAsNumber);
  };

  const setMazeAsWalls = (mazeAsText) => {
    switch (mazeAsText) {
      case "Draw Obstacles":
        setObstacles(true);
        setMaze(false);
        break;
      case "Random Draw":
        setObstacles(false);
        setMaze("Random Draw");
        addRandomWalls();
        break;
      case "Generate Maze":
        setObstacles(false);
        setMaze("Generate Maze");
        drawMaze();
        break;
      default:
        throw new Error(`${mazeAsText} is unknown`);
    }
  };

  const getAlgorithm = (algorithmAsText) => {
    switch (algorithmAsText) {
      case algorithmButtonText(algorithm.dijkstra):
        return dijkstra;
      case algorithmButtonText(algorithm.aStarEuclidianDistance):
        return (grid, startNode, finishNode) => {
          return aStar(grid, startNode, finishNode, euclidianDistance);
        };
      case algorithmButtonText(algorithm.aStarManhattanDistamce):
        return (grid, startNode, finishNode) => {
          return aStar(grid, startNode, finishNode, manhattanDistance);
        };
      case algorithmButtonText(algorithm.aStarMaxComponentDistance):
        return (grid, startNode, finishNode) => {
          return aStar(grid, startNode, finishNode, maxComponentDistance);
        };
      default:
        throw new Error(`${algorithmAsText} is unknown`);
    }
  };
  const clearBoard = () => {
    const newGrid = [];
    for (let row of grid) {
      const newRow = [];
      for (let oldNode of row) {
        newRow.push({
          ...oldNode,
          isVisited: false,
          isOnPath: false,
          distance: Infinity,
          previousNode: null,
        });
        const extraClassName = oldNode.isFinish
          ? "node-finish"
          : oldNode.isStart
          ? "node-start"
          : oldNode.isWall
          ? "node-wall"
          : "";
        document.getElementById(`node-${oldNode.row}-${oldNode.col}`).className =
          "node " + extraClassName;
      }
      newGrid.push(newRow);
    }
    setGrid(newGrid);
    setMouseState(false);
    setIsBlockedVisualize(false);
    setObstacles(false);
  };

  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseState(true);
  };

  const handleMouseUp = () => {
    setMouseState(false);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const onDragStart = (e, row, col) => {
    const nodeClassName = e.target.className;
    const includes = nodeClassName.includes("node-start");
    if (includes) {
      setMainNode("node-start");
      getNewGridWithStartToggled(grid, row, col);
    } else {
      setMainNode("node-finish");
      getNewGridWithFinishToggled(grid, row, col);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    const nodeId = e.target.id;
    const nodeRowsCols = nodeId.split("-");
    const row = nodeRowsCols[1];
    const col = nodeRowsCols[2];
    if (mainNode === "node-start") {
      setStartNodeRow(row);
      setStartNodeCol(col);
      getNewGridWithStartToggled(grid, row, col);
    } else {
      setFinishNodeRow(row);
      setFinishNodeCol(col);
      getNewGridWithFinishToggled(grid, row, col);
    }
  };

  const animateAlgorithm = (visitedNodesInOrder, NodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(NodesInShortestPathOrder);
        }, speed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        node.isVisited = true;
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, speed * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        node.isOnPath = true;
        node.isVisited = false;
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
        if (i === nodesInShortestPathOrder.length - 1) {
          setTimeout(() => {
            setGrid(grid);
          }, 30);
        }
      }, 50 * i);
    }
  };

  const visualizeAlgorithm = (algorithmAsText) => {
    const algorithm = getAlgorithm(algorithmAsText);
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = algorithm(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const timeout = (delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, delay);
    });
  };
  const addRandomWalls = async () => {
    const walls = generateRandomObstacles(ROWS, COLS);
    setIsBlockedVisualize(true);
    let doneWith = 0;
    let empties = Array(walls.length).fill(false);
    while (doneWith !== walls.length) {
      let newGrid = null;
      for (let i = 0; i < walls.length; i++) {
        if (walls[i].length === 0) {
          if (!empties[i]) {
            empties[i] = true;
            doneWith++;
          }
          continue;
        }
        let cell = walls[i].pop();
        newGrid = getNewGridWithWallToggled(grid, cell.row, cell.col);
      }
      if (newGrid !== null) {
        setGrid(newGrid);
      }
      await timeout(300);
    }
    setIsBlockedVisualize(false);
  };

  const drawMaze = () => {
   generateMaze(grid, grid[startNodeRow][startNodeCol], grid[finishNodeRow][finishNodeCol]);
   console.log("reaches drawMaze after generating");
   setGrid(grid);
   console.log(grid);
  }

  return (
    <>
      <NavBar
        visualizeAlgorithm={visualizeAlgorithm}
        setObstacles={setObstacles}
        setSpeed={setNumberSpeed}
        setMaze={setMazeAsWalls}
        disableVisualizeButton={isBlockedVisualize}
        clearBoard={clearBoard}
      />
      <div className="grid">
        {grid.map((row, rowInx) => {
          return (
            <div key={rowInx}>
              {row.map((node, nodeIdx) => {
                const {
                  row,
                  col,
                  isFinish,
                  isStart,
                  isWall,
                  isOnPath,
                  isVisited,
                } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    row={row}
                    draggable={isFinish || isStart}
                    onDragStart={(e, row, col) => onDragStart(e, row, col)}
                    onDragOver={(e) => onDragOver(e)}
                    onDrop={(e) => onDrop(e)}
                    obstacles={obstacles}
                    isVisited={isVisited}
                    isOnPath={isOnPath}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < COLS; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isOnPath: false,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithStartToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];

  const newNode = {
    ...node,
    isStart: !node.isStart,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithFinishToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];

  const newNode = {
    ...node,
    isFinish: !node.isFinish,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
