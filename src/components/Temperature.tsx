import React, { useEffect, useState } from "react";

import Sun from "../assets/images/Sun.svg";
import SunCloudly from "../assets/images/sun-cloudly.svg";
import SunOvercast from "../assets/images/sun-overcast.svg";
import SunRain from "../assets/images/sun-rain.svg";

import Moon from "../assets/images/moon.svg";
import MoonCloudly from "../assets/images/moon-cloudly.svg";
import MoonOvercast from "../assets/images/moon-overcast.svg";

interface TemperatureProps {
  temperature: number;
  condition: string;
  cloudCover: number;
  isDay: number;
}

function Temperature({
  temperature,
  condition,
  cloudCover,
  isDay,
}: TemperatureProps) {
  const [icon, setIcon] = useState<string>(SunCloudly);
  useEffect(() => {
    console.log(isDay);
    if (isDay) {
      console.log("jest");
      cloudCover <= 25 && setIcon(Sun);
      cloudCover <= 60 && cloudCover > 25 && setIcon(SunCloudly);
      cloudCover > 60 && setIcon(SunOvercast);
      condition.includes("rain") && setIcon(SunRain);
    } else {
      console.log("nima");
      cloudCover <= 25 && setIcon(Moon);
      cloudCover <= 60 && cloudCover > 25 && setIcon(MoonCloudly);
      cloudCover > 60 && setIcon(MoonOvercast);
    }
  }, [cloudCover]);
  return (
    <>
      <div className="today-weather__box">
        <div className="today-weather__temperature">
          <div className="today-weather__temperature__data">{temperature}°</div>
          <img src={icon} className="today-weather__temperature__icon" />
        </div>
        <span className="today-weather__condition">{condition}</span>
      </div>
    </>
  );
}

export default Temperature;
