import { useState } from "react";
import "./css/App.css";

import SunCloudly from "./assets/images/sun-cloudly.svg";
import Temperature from "./components/Temperature";
import Humidity from "./components/Humidity";
import CloudCover from "./components/CloudCover";
import InfoBox from "./components/InfoBox";
import ForecastBox from "./components/ForecastBox";

function App() {
  //=== NIGHT THEME ===//
  const date = new Date();
  const nightTime = 21;
  const currentHour = date.getHours();
  //==================//

  return (
    <div className={`${currentHour === nightTime && "dark"}`}>
      <div className="header">
        <img src={SunCloudly} width={70} />
        <span className="header__appname">Weather App</span>
      </div>

      <div className="wrapper">
        <div className="today-weather">
          <Temperature temperature={24} condition="Partly cloudy" />
          <div className="today-weather_box">
            <InfoBox feelslike={15} windspeed={14} uvindex={1} />
            <div className="today-weather__counters">
              <Humidity humidity={12} />
              <CloudCover cloudcover={56} />
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
    </div>
  );
}

export default App;
