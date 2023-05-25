import { createElement, useEffect, useState } from "react";
import "./css/App.css";

import SunCloudly from "./assets/images/sun-cloudly.svg";
import Temperature from "./components/Temperature";
import Humidity from "./components/Humidity";
import CloudCover from "./components/CloudCover";
import InfoBox from "./components/InfoBox";
import ForecastBox from "./components/ForecastBox";
import AutocompleteInput from "./components/AutocompleteInput";
import { weatherType } from "./shared/Types";
import { addDays, format, roundToNearestMinutes } from "date-fns";

import citiesList from "./shared/cities";

const clearRes: weatherType = {
  temp: 0,
  is_day: 1,
  code: 0,
  feelslike: 0,
  wind_speed: 0.0,
  uv: 0,
  humidity: 0,
  cloud: 0,
  date: "2000-01-01T12:00",
};

const clearForecast: weatherType = {
  temp: 0,
  is_day: 1,
  code: 0,
  feelslike: 0,
  wind_speed: 0.0,
  uv: 0,
  humidity: 0,
  cloud: 0,
  date: "2000-01-01T12:00",
};

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function App() {
  //=== API ===//

  const [selectedCity, setSelectedCity] = useState<string>("Warsaw");
  /*Today's temperature*/
  const [currentWeather, setCurrentWeather] = useState<weatherType>(clearRes);
  /*Tomorrow temperature*/
  const [forecastIn1, setForecastIn1] = useState<weatherType>(clearForecast);
  /*In 2 days temperature*/
  const [forecastIn2, setForecastIn2] = useState<weatherType>(clearForecast);
  /*In 3 days temperature*/
  const [forecastIn3, setForecastIn3] = useState<weatherType>(clearForecast);

  useEffect(() => {
    const cityData = citiesList.filter((item) => item.name === selectedCity);

    console.log(cityData[0]);

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${cityData[0].lat}&longitude=${cityData[0].lng}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,rain,snowfall,weathercode,cloudcover,windspeed_10m,uv_index,is_day&start_date=2023-05-24&end_date=2023-05-27`
    )
      .then((res) => res.json())
      .then((result) => {
        const timeNow = roundToNearestMinutes(new Date(), {
          nearestTo: 30,
          roundingMethod: "ceil",
        });

        const todayIndex = result.hourly.time.findIndex(
          (item: string) =>
            item ===
            format(timeNow, "yyyy-LL-dd") + "T" + format(timeNow, "kk:00")
        );

        const in1DayIndex = result.hourly.time.findIndex(
          (item: string) =>
            item ===
            format(addDays(timeNow, 1), "yyyy-LL-dd") +
              "T" +
              format(timeNow, "kk:00")
        );
        const in2DayIndex = result.hourly.time.findIndex(
          (item: string) =>
            item ===
            format(addDays(timeNow, 2), "yyyy-LL-dd") +
              "T" +
              format(timeNow, "kk:00")
        );
        const in3DayIndex = result.hourly.time.findIndex(
          (item: string) =>
            item ===
            format(addDays(timeNow, 3), "yyyy-LL-dd") +
              "T" +
              format(timeNow, "kk:00")
        );

        const newCurrentWeather: weatherType = {
          temp: result.hourly.temperature_2m[todayIndex].toFixed(0),
          is_day: result.hourly.is_day[todayIndex],
          code: result.hourly.weathercode[todayIndex],
          feelslike: result.hourly.apparent_temperature[todayIndex],
          wind_speed: result.hourly.windspeed_10m[todayIndex],
          uv: result.hourly.uv_index[todayIndex],
          humidity: result.hourly.relativehumidity_2m[todayIndex],
          cloud: result.hourly.cloudcover[todayIndex],
          date: result.hourly.time[todayIndex],
        };

        const newForecast1Day: weatherType = {
          temp: result.hourly.temperature_2m[in1DayIndex].toFixed(0),
          is_day: result.hourly.is_day[in1DayIndex],
          code: result.hourly.weathercode[in1DayIndex],
          feelslike: result.hourly.apparent_temperature[in1DayIndex],
          wind_speed: result.hourly.windspeed_10m[in1DayIndex],
          uv: result.hourly.uv_index[in1DayIndex],
          humidity: result.hourly.relativehumidity_2m[in1DayIndex],
          cloud: result.hourly.cloudcover[in1DayIndex],
          date: result.hourly.time[in1DayIndex],
        };
        const newForecast2Day: weatherType = {
          temp: result.hourly.temperature_2m[in2DayIndex].toFixed(0),
          is_day: result.hourly.is_day[in2DayIndex],
          code: result.hourly.weathercode[in2DayIndex],
          feelslike: result.hourly.apparent_temperature[in2DayIndex],
          wind_speed: result.hourly.windspeed_10m[in2DayIndex],
          uv: result.hourly.uv_index[in2DayIndex],
          humidity: result.hourly.relativehumidity_2m[in2DayIndex],
          cloud: result.hourly.cloudcover[in2DayIndex],
          date: result.hourly.time[in2DayIndex],
        };
        const newForecast3Day: weatherType = {
          temp: result.hourly.temperature_2m[in3DayIndex].toFixed(0),
          is_day: result.hourly.is_day[in3DayIndex],
          code: result.hourly.weathercode[in3DayIndex],
          feelslike: result.hourly.apparent_temperature[in3DayIndex],
          wind_speed: result.hourly.windspeed_10m[in3DayIndex],
          uv: result.hourly.uv_index[in3DayIndex],
          humidity: result.hourly.relativehumidity_2m[in3DayIndex],
          cloud: result.hourly.cloudcover[in3DayIndex],
          date: result.hourly.time[in3DayIndex],
        };

        setCurrentWeather(newCurrentWeather);
        setForecastIn1(newForecast1Day);
        setForecastIn2(newForecast2Day);
        setForecastIn3(newForecast3Day);

        console.log(newCurrentWeather);
      });
  }, [selectedCity]);

  //=== NIGHT THEME ===//
  currentWeather.is_day == 0
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark");
  //==================//

  return (
    <>
      <div className="header">
        <img src={SunCloudly} width={70} />
        <span className="header__appname">Weather App</span>
      </div>

      <div className="wrapper">
        <div className="today-weather">
          <AutocompleteInput
            onSelect={setSelectedCity}
            selected={selectedCity}
          />
          <Temperature currentWeather={currentWeather} />
          <div className="today-weather_box">
            <InfoBox
              feelslike={currentWeather.feelslike}
              windspeed={currentWeather.wind_speed}
              uvindex={currentWeather.uv}
            />
            <div className="today-weather__counters">
              <Humidity humidity={currentWeather.humidity} />
              <CloudCover cloudcover={currentWeather.cloud} />
            </div>
          </div>
        </div>
        <div className="wrapper__forecasts">
          <ForecastBox
            day="Tomorrow"
            temperature={forecastIn1.temp}
            cloudCover={forecastIn1.cloud}
            isDay={currentWeather.is_day}
            weather={forecastIn1}
          />
          <ForecastBox
            day={weekday[new Date(forecastIn2.date).getDay()]}
            temperature={forecastIn2.temp}
            cloudCover={forecastIn2.cloud}
            isDay={currentWeather.is_day}
            weather={forecastIn2}
          />
          <ForecastBox
            day={weekday[new Date(forecastIn3.date).getDay()]}
            temperature={forecastIn3.temp}
            cloudCover={forecastIn3.cloud}
            isDay={currentWeather.is_day}
            weather={forecastIn3}
          />
        </div>
      </div>
    </>
  );
}

export default App;
