import React from "react";

function Humidity() {
  return (
    <div className="progressbar">
      <div className="progressbar__outer">
        <div className="progressbar__inner">
          <span className="progressbar__inner__title">Wilgotność</span>
          <span className="progressbar__inner__value">100%</span>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="96px"
        height="96px"
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#A1FFF5" />
            <stop offset="100%" stopColor="#D8FFFF" />
          </linearGradient>
        </defs>
        <circle
          className="progressbar__circle"
          cx="48px"
          cy="48px"
          r="42px"
          strokeLinecap="round"
          style={{ strokeDashoffset: 264 - 264 * (35 / 100) }}
        />
      </svg>
    </div>
  );
}

export default Humidity;
