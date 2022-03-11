import React from "react";
import "../Node/Node.css";

export default function Node({
  col,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  row,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      draggable={draggable}
      onDragStart={(e) => onDragStart(e, row, col)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e)}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
}
