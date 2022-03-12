import React from "react";
import "./NavBar.css";
import { useState } from "react";
import { Dropdown } from "./Dropdown/Dropdown";

export const algorithm = {
  dijkstra: "Dijkstra",
  aStarEuclidianDistance: "A* Euclidian",
  aStarManhattanDistamce: "A* Manhattan",
  aStarMaxComponentDistance: "A* MaxComponent"
}
const ALGORITHM_LABELS = Object.values(algorithm);
const SPEED_LABELS = ["Slow", "Medium", "Fast"];
const MAZE_LABELS = ["Draw Obstacles", "Random Draw", "Recursive Division"];
const ALGORITHMS_TITLE = "Algorithms";
const SPEED_TITLE = "Speed";
const MAZE_TITLE = "Draw";

export const algorithmButtonText = (algorithmAsText) => {
  return `Start Journey using ${algorithmAsText} algorithm`;
}

export default function NavBar({
  visualizeAlgorithm,
  setSpeed,
  setMaze,
  disableVisualizeButton,
  clearBoard
}) {
  const [selected, setSelected] = useState(algorithm.dijkstra);
  const refreshPage = () => {
    window.location.reload(false);
  };
  return (
    <>
      <div className="controls">
        <button className="controls-logo" onClick={refreshPage}>
          Astro Visualizer
        </button>
        <Dropdown
          className="controls-algorithms"
          setSelected={setSelected}
          labels={ALGORITHM_LABELS}
          title={ALGORITHMS_TITLE}
        />
        <Dropdown
          className="controls-algorithms"
          setSelected={setSpeed}
          labels={SPEED_LABELS}
          title={SPEED_TITLE}
        />
        <button
          className="controls-visualize"
          onClick={(e) => {
            visualizeAlgorithm(e.target.textContent);
          }}
          disabled={disableVisualizeButton}
        >
          {algorithmButtonText(selected)}
        </button>
        <Dropdown
          className="controls-algorithms"
          setSelected={setMaze}
          labels={MAZE_LABELS}
          title={MAZE_TITLE}
        />
        <button className="controls-clear" onClick={clearBoard}>
          Clear board
        </button>
      </div>
      <div className="labels">
        <div className="labels-start">
          <div className="labels-start--icon"></div>
          Starting Planet
        </div>
        <div className="labels-finish">
          <div className="labels-finish--icon"></div>
          Finish Planet
        </div>
        <div className="labels-unvisited">
          <div className="labels-unvisited--icon"></div>
          Unvisited Space Matter
        </div>
        <div className="labels-visited">
          <div className="labels-visited--icon"></div>
          Visited Space Matter
        </div>
        <div className="labels-shortest">
          <div className="labels-shortest--icon"></div>
          Shortest Interplanetary Path
        </div>
        <div className="labels-wall">
          <div className="labels-wall--icon"></div>
          Space Obstacles
        </div>
      </div>
      <div className="spacing"></div>
    </>
  );
}
