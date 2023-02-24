import { createElement, useEffect, useState } from "react";
import "./css/App.css";

import SunCloudly from "./assets/images/sun-cloudly.svg";
import Temperature from "./components/Temperature";
import Humidity from "./components/Humidity";
import CloudCover from "./components/CloudCover";
import InfoBox from "./components/InfoBox";
import ForecastBox from "./components/ForecastBox";
import AutocompleteInput from "./components/AutocompleteInput";
import { currentWeatherType, forecastType } from "./types/Types";

const clearRes: currentWeatherType = {
  temp_c: 0,
  is_day: 1,
  condition: "",
  feelslike: 0,
  wind_kph: 0.0,
  uv: 0,
  humidity: 0,
  cloud: 0,
};

const clearForecast: forecastType = {
  temp_c: 0,
  date: "01-01-2000",
  condition: "",
  cloudAt12: 0,
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
  const [currentRes, setCurrentRes] = useState<currentWeatherType>(clearRes);
  /*Tomorrow temperature*/
  const [forecastTom, setForecastTom] = useState<forecastType>(clearForecast);
  /*In 2 days temperature*/
  const [forecastIn2, setForecastIn2] = useState<forecastType>(clearForecast);
  /*In 3 days temperature*/
  const [forecastIn3, setForecastIn3] = useState<forecastType>(clearForecast);

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=ee9dbe50376649bca2624001231902 &q=${selectedCity}&days=4&aqi=no&alerts=no`
    )
      .then((res) => res.json())
      .then((result) => {
        const newRes: currentWeatherType = {
          temp_c: Math.round(result.current.temp_c),
          is_day: result.current.is_day,
          condition: result.current.condition.text,
          code: result.current.condition.code,
          feelslike: result.current.feelslike_c,
          wind_kph: result.current.wind_kph,
          uv: result.current.uv,
          humidity: result.current.humidity,
          cloud: result.current.cloud,
        };

        const tomorrowRes: forecastType = {
          temp_c: Math.round(result.forecast.forecastday[1].day.avgtemp_c),
          date: result.forecast.forecastday[1].date,
          condition: result.forecast.forecastday[1].day.condition.text,
          cloudAt12: result.forecast.forecastday[1].hour[12].cloud,
        };

        const in2dRes: forecastType = {
          temp_c: Math.round(result.forecast.forecastday[2].day.avgtemp_c),
          date: result.forecast.forecastday[2].date,
          condition: result.forecast.forecastday[2].day.condition.text,
          cloudAt12: result.forecast.forecastday[2].hour[12].cloud,
        };

        const in3dRes: forecastType = {
          temp_c: Math.round(result.forecast.forecastday[3].day.avgtemp_c),
          date: result.forecast.forecastday[3].date,
          condition: result.forecast.forecastday[3].day.condition.text,
          cloudAt12: result.forecast.forecastday[3].hour[12].cloud,
        };

        setCurrentRes(newRes);
        setForecastTom(tomorrowRes);
        setForecastIn2(in2dRes);
        setForecastIn3(in3dRes);
        console.log(result);
      });
  }, [selectedCity]);

  //=== NIGHT THEME ===//
  currentRes.is_day == 0
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
          <Temperature
            temperature={currentRes.temp_c}
            condition={`${currentRes.condition}`}
            currentWeather={currentRes}
          />
          <div className="today-weather_box">
            <InfoBox
              feelslike={currentRes.feelslike}
              windspeed={currentRes.wind_kph}
              uvindex={currentRes.uv}
            />
            <div className="today-weather__counters">
              <Humidity humidity={currentRes.humidity} />
              <CloudCover cloudcover={currentRes.cloud} />
            </div>
          </div>
        </div>
        <div className="wrapper__forecasts">
          <ForecastBox
            day="Tomorrow"
            temperature={forecastTom.temp_c}
            condition={forecastTom.condition}
            cloudCover={forecastTom.cloudAt12}
            isDay={currentRes.is_day}
          />
          <ForecastBox
            day={weekday[new Date(forecastIn2.date).getDay()]}
            temperature={forecastIn2.temp_c}
            condition={forecastIn2.condition}
            cloudCover={forecastIn2.cloudAt12}
            isDay={currentRes.is_day}
          />
          <ForecastBox
            day={weekday[new Date(forecastIn3.date).getDay()]}
            temperature={forecastIn3.temp_c}
            condition={forecastIn3.condition}
            cloudCover={forecastIn3.cloudAt12}
            isDay={currentRes.is_day}
          />
        </div>
      </div>
    </>
  );
}

export default App;
