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

interface ForecastBoxProps {
  day: string;
  temperature: number;
  cloudCover: number;
  isDay: number;
  weather: weatherType;
}

const snowCodes = [71, 73, 75, 77, 85, 86];

const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82];

const thunderCodes = [95];
const thunderRainCodes = [96, 99];

function ForecastBox({
  day,
  temperature,
  cloudCover,
  isDay,
  weather,
}: ForecastBoxProps) {
  const [icon, setIcon] = useState<string>(SunCloudly);

  useEffect(() => {
    //=== OVERCAST ===//
    if (weather.code === 3) {
      setIcon(Overcast);
    }

    //=== CLOUDLY ===//
    if (weather.code === 2) {
      isDay == 1 ? setIcon(SunOvercast) : setIcon(MoonOvercast);
    }

    //=== PARTLY CLOUDLY ===//
    if (weather.code === 1) {
      isDay == 1 ? setIcon(SunCloudly) : setIcon(MoonCloudly);
    }

    //=== CLEAR SKY ===//
    if (weather.code === 0) {
      isDay == 1 ? setIcon(Sun) : setIcon(Moon);
    }

    //=== RAIN ===//
    if (rainCodes.includes(weather.code)) {
      isDay ? setIcon(SunRain) : setIcon(MoonRain);
    }

    //=== SNOW ===//
    if (snowCodes.includes(weather.code)) {
      setIcon(Snow);
    }

    //=== THUNDER ===//
    if (thunderCodes.includes(weather.code)) {
      setIcon(Thunder);
    }

    //=== THUNDER WITH RAIN ===//
    if (thunderRainCodes.includes(weather.code)) {
      setIcon(ThuderRain);
    }
  }, [weather]);

  return (
    <div className="forecastwrapper">
      <span className="forecastwrapper__day">{day}</span>
      <div className="forecastbox">
        <div className="forecastbox__temperature">
          <span>{temperature}°</span>
          <img src={icon} width={"50px"} />
        </div>
        <span className="forecastbox__condition"></span>
      </div>
    </div>
  );
}

export default ForecastBox;
