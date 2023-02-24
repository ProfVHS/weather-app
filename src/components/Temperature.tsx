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

import { currentWeatherType } from "../types/Types";

interface TemperatureProps {
  temperature: number;
  condition: string;
  currentWeather: currentWeatherType;
}

const snowCodes = [
  1066, 1069, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237,
  1252, 1255, 1258, 1261, 1264,
];

const rainCodes = [
  1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198,
  1201, 1240, 1243, 1246,
];

const thunderCodes = [1087];
const thunderRainCodes = [1273, 1276];
const thunderSnowCodes = [1279, 1282];

function Temperature({
  temperature,
  condition,
  currentWeather,
}: TemperatureProps) {
  const [icon, setIcon] = useState<string>(SunCloudly);
  const cloudCover = currentWeather.cloud;
  const isDay = currentWeather.is_day;
  const weatherCode = currentWeather.code;

  useEffect(() => {
    if (cloudCover >= 90) {
      setIcon(Overcast);
    }
    if (cloudCover > 60 && cloudCover < 90) {
      isDay == 1 ? setIcon(SunOvercast) : setIcon(MoonOvercast);
    }
    if (cloudCover > 10 && cloudCover <= 60) {
      isDay == 1 ? setIcon(SunCloudly) : setIcon(MoonCloudly);
    }
    if (cloudCover <= 10) {
      isDay == 1 ? setIcon(Sun) : setIcon(Moon);
    }
    if (rainCodes.includes(weatherCode)) {
      isDay ? setIcon(SunRain) : setIcon(MoonRain);
    }
    if (snowCodes.includes(weatherCode)) {
      setIcon(Snow);
    }
    if (thunderRainCodes.includes(weatherCode)) {
      setIcon(ThuderRain);
      if (thunderCodes.includes(weatherCode)) {
        setIcon(Thunder);
      }
    }
  }, [currentWeather]);
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
