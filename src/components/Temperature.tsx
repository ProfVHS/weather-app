import React, { useEffect, useState } from "react";

import Sun from "../assets/images/Sun.svg";
import SunCloudly from "../assets/images/sun-cloudly.svg";
import SunOvercast from "../assets/images/sun-overcast.svg";
import SunRain from "../assets/images/sun-rain.svg";

import Moon from "../assets/images/moon.svg";
import MoonCloudly from "../assets/images/moon-cloudly.svg";
import MoonOvercast from "../assets/images/moon-overcast.svg";
import MoonRain from "../assets/images/moon-rain.svg";

import Overcast from "../assets/images/overcast.svg";
import OvercastRain from "../assets/images/overcast-rain.svg";

import Snow from "../assets/images/snow.svg";

import ThuderRain from "../assets/images/thunder-rain.svg";
import Thunder from "../assets/images/thunder.svg";

import { weatherType } from "../shared/Types";

interface TemperatureProps {
  currentWeather: weatherType;
}

const snowCodes = [71, 73, 75, 77, 85, 86];

const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82];

const thunderCodes = [95];
const thunderRainCodes = [96, 99];

function Temperature({ currentWeather }: TemperatureProps) {
  const [icon, setIcon] = useState<string>(SunCloudly);

  const temperature = currentWeather.temp;

  const isDay = currentWeather.is_day;
  const weatherCode = currentWeather.code;

  useEffect(() => {
    //=== OVERCAST ===//
    if (weatherCode === 3) {
      setIcon(Overcast);
    }

    //=== CLOUDLY ===//
    if (weatherCode === 2) {
      isDay == 1 ? setIcon(SunOvercast) : setIcon(MoonOvercast);
    }

    //=== PARTLY CLOUDLY ===//
    if (weatherCode === 1) {
      isDay == 1 ? setIcon(SunCloudly) : setIcon(MoonCloudly);
    }

    //=== CLEAR SKY ===//
    if (weatherCode === 0) {
      isDay == 1 ? setIcon(Sun) : setIcon(Moon);
    }

    //=== RAIN ===//
    if (rainCodes.includes(weatherCode)) {
      isDay ? setIcon(SunRain) : setIcon(MoonRain);
    }

    //=== SNOW ===//
    if (snowCodes.includes(weatherCode)) {
      setIcon(Snow);
    }

    //=== THUNDER ===//
    if (thunderCodes.includes(weatherCode)) {
      setIcon(Thunder);
    }

    //=== THUNDER WITH RAIN ===//
    if (thunderRainCodes.includes(weatherCode)) {
      setIcon(ThuderRain);
    }
  }, [currentWeather]);
  return (
    <>
      <div className="today-weather__box">
        <div className="today-weather__temperature">
          <div className="today-weather__temperature__data">{temperature}°</div>
          <img src={icon} className="today-weather__temperature__icon" />
        </div>
      </div>
    </>
  );
}

export default Temperature;
