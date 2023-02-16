import React from "react";

import SunCloudly from "../assets/images/sun-cloudly.svg";

interface TemperatureProps {
  temperature: number;
  condition: string;
}

function Temperature({ temperature, condition }: TemperatureProps) {
  return (
    <>
      <div className="today-weather__box">
        <div className="today-weather__temperature">
          <div className="today-weather__temperature__data">{temperature}°</div>
          <img src={SunCloudly} className="today-weather__temperature__icon" />
        </div>
        <span className="today-weather__condition">{condition}</span>
      </div>
    </>
  );
}

export default Temperature;
