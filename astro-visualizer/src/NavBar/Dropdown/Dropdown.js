import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export const Dropdown = ({ setSelected, labels, title }) => {
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
        {title}
        <FontAwesomeIcon className="dropdown-title--icon" icon={faCaretDown} />
      </div>
      {clickedOutside ? null : isOpen ? <Items setSelected={setSelected} labels={labels}/> : null}
    </div>
  );
};

const Items = ({ setSelected, labels }) => {
  const handleOnClick = (e) => {
    setSelected(e.target.textContent);
  };
  return (
    <div className={"dropdown-items"}>
      {labels.map((label,labelIdx) => {
        return (
        <div
        className="dropdown-item"
        onClick={(e) => {
          handleOnClick(e);
        }}
        key={labelIdx}
      >
        {label}
      </div>
        );
      })}
    </div>
  );
};
