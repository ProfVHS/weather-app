import React from "react";
interface HumidityProps {
  humidity: number;
}
function Humidity({ humidity }: HumidityProps) {
  return (
    <div className="progressbar">
      <div className="progressbar__outer">
        <div className="progressbar__inner">
          <span className="progressbar__inner__title">Humidity</span>
          <span className="progressbar__inner__value">{humidity}%</span>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="120px"
        height="120px"
      >
        <defs>
          <linearGradient id="GradientColor" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#A1FFF5">
              <animate
                attributeName="stop-color"
                attributeType="CSS"
                values="#A1FFF5;#c7fccf;#d8ffea;#A1FFF5"
                dur="5s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#D8FFFF">
              <animate
                attributeName="stop-color"
                attributeType="CSS"
                values="#D8FFFF;#d8ffea;#c7fccf;#D8FFFF"
                dur="5s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <linearGradient id="GradientColorDark" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#FF8AFA">
              <animate
                attributeName="stop-color"
                attributeType="CSS"
                values="#FF8AFA;#A851FF;#A851FF;#FF8AFA"
                dur="5s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#A851FF">
              <animate
                attributeName="stop-color"
                attributeType="CSS"
                values="#A851FF;#FF8AFA;#FF8AFA;#A851FF"
                dur="5s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <circle
          className="progressbar__circle"
          cx="60px"
          cy="60px"
          r="42px"
          strokeLinecap="round"
          style={{ strokeDashoffset: 264 - 264 * (humidity / 100) }}
        />
        <circle
          className="progressbar__backlight"
          cx="60px"
          cy="60px"
          r="50px"
          strokeLinecap="round"
          style={{ strokeDashoffset: 326 - 326 * (humidity / 100) }}
        />
      </svg>
    </div>
  );
}

export default Humidity;
