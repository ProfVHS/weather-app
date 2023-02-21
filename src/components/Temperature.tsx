import React, { useEffect, useState } from "react";

import Sun from "../assets/images/Sun.svg";
import SunCloudly from "../assets/images/sun-cloudly.svg";
import SunOvercast from "../assets/images/sun-overcast.svg";
import SunRain from "../assets/images/sun-rain.svg";

import Moon from "../assets/images/moon.svg";
import MoonCloudly from "../assets/images/moon-cloudly.svg";
import MoonOvercast from "../assets/images/moon-overcast.svg";

import Overcast from "../assets/images/overcast.svg";
import OvercastRain from "../assets/images/overcast-rain.svg";

import Snow from "../assets/images/snow.svg";

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
    if (isDay) {
      cloudCover <= 10 && setIcon(Sun);
      cloudCover <= 60 && cloudCover > 10 && setIcon(SunCloudly);
      cloudCover > 60 && setIcon(SunOvercast);
      condition.includes("rain") && setIcon(SunRain);
    } else {
      cloudCover <= 10 && setIcon(Moon);
      cloudCover <= 60 && cloudCover > 10 && setIcon(MoonCloudly);
      cloudCover < 90 && cloudCover > 60 && setIcon(MoonOvercast);
      condition.includes("rain") && setIcon(SunRain);
    }
    cloudCover > 90 && setIcon(Overcast);
    cloudCover > 90 && condition.includes("rain") && setIcon(OvercastRain);
    condition.includes("snow") && setIcon(Snow);
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
