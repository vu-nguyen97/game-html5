import classNames from "classnames";
import React from "react";

export default function BackIcon({ onClick, hidden = false }) {
  return (
    <div
      id="BackFullScreenIcon"
      className={classNames(
        "bg-white absolute top-[8%] left-0 !z-[9999] py-1.5 pl-2 pr-3 rounded-r-full shadow-custom1",
        hidden && "hidden"
      )}
      onClick={onClick}
    >
      <svg
        stroke="red"
        fill="red"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="16px"
        width="16px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M432.8 136v96H122.3l84.4-86.2-33.2-33.8L32 256l141.5 144 33.2-33.8-84.4-86.2H480V136h-47.2z"></path>
      </svg>
    </div>
  );
}
