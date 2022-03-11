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
  obstacles
}) {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";
  return  obstacles ?
  (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  )
    : (
      <div 
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      draggable={draggable}
      onDragStart={(e) => onDragStart(e, row, col)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e)}>
      </div>
    )
}
