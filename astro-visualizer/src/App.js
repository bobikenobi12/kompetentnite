import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import Node from "./Node/Node";
import NavBar from "./NavBar/NavBar";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithms/Dijkstras";
const START_NODE_ROW = 15;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 35;

export default function App() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseState] = useState(false);
  const [mainNode, setMainNode] = useState("");
  const [obstacles, setObstacles] = useState(false);
  const [startNodeRow, setStartNodeRow] = useState(15);
  const [startNodeCol, setStartNodeCol] = useState(10);
  const [finishNodeRow, setFinishNodeRow] = useState(15);
  const [finishNodeCol, setFinishNodeCol] = useState(35);
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
    if(mainNode === "node-start") {
      setStartNodeRow(row);
      setStartNodeCol(col);
      getNewGridWithStartToggled(grid, row, col)
    }else {
      setFinishNodeRow(row);
      setFinishNodeCol(col);
      getNewGridWithFinishToggled(grid, row, col);
    }
  };

  const animateDijkstra = (visitedNodesInOrder, NodesInShortestPathOrder) => {
    for(let i=0;i<=visitedNodesInOrder.length;i++) {
      if(i===visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(NodesInShortestPathOrder);
        }, 10*i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, 10 * i);
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for(let i=0;i<nodesInShortestPathOrder.length;i++) {
      setTimeout(() => {
        const node=nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
      }, 50*i);
    }
  }

  const visualizeDijkstra = () =>{
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    console.log(startNode, finishNode);
    const visitedNodesInOrder=dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder=getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  return (
    <>
      <NavBar visualizeDijkstra={visualizeDijkstra} setObstacles={setObstacles}/>
      <div className="grid">
        {grid.map((row, rowInx) => {
          return (
            <div key={rowInx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
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
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 40; col++) {
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
