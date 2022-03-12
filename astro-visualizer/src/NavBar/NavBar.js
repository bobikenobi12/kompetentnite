import React from "react";
import "./NavBar.css";
import { useState } from "react";
import { Dropdown } from "./Dropdown/Dropdown";

const ALGORITHM_LABELS = ["Dijkstra", "A*"];
const SPEED_LABELS = ["Slow", "Medium", "Fast"];
const MAZE_LABELS = ["Draw Obstacles", "Random Draw", "Recursive Division"];
const ALGORITHMS_TITLE = "Algorithms";
const SPEED_TITLE = "Speed";
const MAZE_TITLE = "Draw";

export default function NavBar({
  visualizeDijkstra,
  setSpeed,
  setMaze,
  disableVisualizeButton,
  clearBoard,
}) {
  const [selected, setSelected] = useState("Dijkstras");
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
          onClick={visualizeDijkstra}
          disabled={disableVisualizeButton}
        >
          Start Journey using {selected} algorithm
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
