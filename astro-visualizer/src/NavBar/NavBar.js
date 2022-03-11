import React from "react";
import "./NavBar.css";
import { useState } from "react";
import { Dropdown } from "./Dropdown/Dropdown";

export default function NavBar({ visualizeDijkstra, setObstacles }) {
  const [selected, setSelected] = useState("Dijkstras");
  const [isClicked, setClicked] = useState(false);
  const refreshPage = () => {
    window.location.reload(false);
  };
  const handleOnClick = () => {
    setObstacles((prev) => !prev);
    setClicked(!isClicked);
  };
  return (
    <>
      <div className="controls">
        <button className="controls-logo" onClick={refreshPage}>
          Astro Visualizer
        </button>
        <Dropdown className="controls-algorithms" setSelected={setSelected} />
        <button className="controls-visualize" onClick={visualizeDijkstra}>
          Start Journey using {selected} algorithm
        </button>
        <button
          className={
            isClicked
              ? "controls-wall controls--click"
              : "controls-wall controls-wall--hover"
          }
          onClick={handleOnClick}
        >
          Add Space Obstacles
        </button>
        <button className="controls-clear">Clear board</button>
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
          Unvisited Node
        </div>
        <div className="labels-visited">
          <div className="labels-visited--icon"></div>
          Visited Nodes
        </div>
        <div className="labels-shortest">
          <div className="labels-shortest--icon"></div>
          Shortest-path Node
        </div>
        <div className="labels-wall">
          <div className="labels-wall--icon"></div>
          Select Space Obstacles
        </div>
      </div>
    </>
  );
}
