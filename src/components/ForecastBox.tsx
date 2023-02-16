import React from "react";

import SunCloudly from "../assets/images/sun-cloudly.svg";

interface ForecastBoxProps {
  day: string;
  temperature: number;
  condition: string;
}

function ForecastBox({ day, temperature, condition }: ForecastBoxProps) {
  return (
    <div className="forecastwrapper">
      <span className="forecastwrapper__day">{day}</span>
      <div className="forecastbox">
        <div className="forecastbox__temperature">
          <span>{temperature}°</span>
          <img src={SunCloudly} width={100} />
        </div>
        <span className="forecastbox__condition">{condition}</span>
      </div>
    </div>
  );
}

export default ForecastBox;
