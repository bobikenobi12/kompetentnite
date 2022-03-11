import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export const Dropdown = ({ setSelected }) => {
  const [isOpen, setOpen] = useState(false);
  const [clickedOutside, setClickedOutside] = useState(false);

  const myRef = useRef();

  const handleOnClick = (e) => {
    setOpen(!isOpen);
    setClickedOutside(false);
  };

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setClickedOutside(true);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div
      className={
        clickedOutside
          ? "dropdown dropdown--hover"
          : isOpen
          ? "dropdown dropdown--click"
          : "dropdown dropdown--hover"
      }
      onClick={(e) => {
        handleOnClick(e);
      }}
      ref={myRef}
    >
      <div className="dropdown-title">
        Algorithms
        <FontAwesomeIcon className="dropdown-title--icon" icon={faCaretDown} />
      </div>
      {clickedOutside ? null : isOpen ? <Items setSelected={setSelected}/> : null}
    </div>
  );
};

const Items = ({ setSelected }) => {
  const handleOnClick = (e) => {
    setSelected(e.target.textContent);
    return null;
  };
  return (
    <div className={"dropdown-items"}>
      <div
        className="dropdown-item"
        onClick={(e) => {
          handleOnClick(e);
        }}
      >
        Dijkstras
      </div>
      <div
        className="dropdown-item"
        onClick={(e) => {
          handleOnClick(e);
        }}
      >
        A*
      </div>
      <div
        className="dropdown-item"
        onClick={(e) => {
          handleOnClick(e);
        }}
      >
        Swarm
      </div>
    </div>
  );
};
