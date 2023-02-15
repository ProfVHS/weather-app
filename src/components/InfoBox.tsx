import React from "react";

import thermometer from "../assets/images/thermometer.svg";
import wind from "../assets/images/wind.svg";
import uvsun from "../assets/images/uvsun.svg";

interface InfoBoxProps {
  feelslike: number;
  windspeed: number;
  uvindex: number;
}

function InfoBox({ feelslike, windspeed, uvindex }: InfoBoxProps) {
  return (
    <div className="infobox">
      {/* FEELS LIKE */}
      <span className="infobox__icon">
        <img src={thermometer} width={10} />
      </span>
      <span className="infobox__value">
        {feelslike}
        <span style={{ position: "absolute" }}>°</span>
      </span>
      <span className="infobox__name">feels like</span>

      {/* WIND SPEED */}
      <span className="infobox__icon">
        <img src={wind} />
      </span>
      <span className="infobox__value">{windspeed} km/h</span>
      <span className="infobox__name">wind speed</span>

      {/* UV INDEX */}
      <span className="infobox__icon">
        <img src={uvsun} height={22} />
        <div
          className={`infobox__uvicon ${
            uvindex < 3
              ? "low"
              : uvindex < 6
              ? "medium"
              : uvindex < 8
              ? "high"
              : "veryhigh"
          }`}
        />
      </span>
      <span className="infobox__value">{uvindex}</span>
      <span className="infobox__name">uv index</span>
    </div>
  );
}

export default InfoBox;
