import { createElement, useEffect, useState } from "react";
import "./css/App.css";

import SunCloudly from "./assets/images/sun-cloudly.svg";
import Temperature from "./components/Temperature";
import Humidity from "./components/Humidity";
import CloudCover from "./components/CloudCover";
import InfoBox from "./components/InfoBox";
import ForecastBox from "./components/ForecastBox";
import AutocompleteInput from "./components/AutocompleteInput";

function App() {
  const [selectedCity, setSelectedCity] = useState<string>("Warsaw");

  //=== API ===//

  type currentResType = {
    temp_c: number;
    is_day: number;
    condition: string;
    feelslike: number;
    wind_kph: number;
    uv: number;
    humidity: number;
    cloud: number;
  };

  const clearRes: currentResType = {
    temp_c: 0,
    is_day: 0,
    condition: "",
    feelslike: 0,
    wind_kph: 0.0,
    uv: 0,
    humidity: 0,
    cloud: 0,
  };
  const [currentRes, setCurrentRes] = useState<currentResType>(clearRes);

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=ee9dbe50376649bca2624001231902&q=${selectedCity}&aqi=no`
    )
      .then((res) => res.json())
      .then((result) => {
        const newRes: currentResType = {
          temp_c: result.current.temp_c,
          is_day: result.current.is_day,
          condition: result.current.condition.text,
          feelslike: result.current.feelslike_c,
          wind_kph: result.current.wind_kph,
          uv: result.current.uv,
          humidity: result.current.humidity,
          cloud: result.current.cloud,
        };
        setCurrentRes(newRes);
        console.log(result.current);
        console.log(selectedCity);
      });
  }, [selectedCity]);
  console.log(currentRes);

  //=== NIGHT THEME ===//
  currentRes.is_day != 1 && document.body.classList.add("dark");
  //==================//

  return (
    <>
      <div className="header">
        <img src={SunCloudly} width={70} />
        <span className="header__appname">Weather App</span>
      </div>

      <div className="wrapper">
        <div className="today-weather">
          <AutocompleteInput onSelect={() => setSelectedCity("")} />
          <Temperature
            temperature={currentRes.temp_c}
            condition={`${currentRes.condition}`}
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
            temperature={18}
            condition="Partly cloudy"
          />
          <ForecastBox
            day="Monday"
            temperature={18}
            condition="Partly cloudy"
          />
          <ForecastBox
            day="Tuesday"
            temperature={18}
            condition="Partly cloudy"
          />
        </div>
      </div>
    </>
  );
}

export default App;
