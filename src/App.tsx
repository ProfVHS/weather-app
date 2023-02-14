import { useState } from "react";
import "./css/App.css";

import SunCloudly from "./assets/images/sun-cloudly.svg";
import Temperature from "./components/Temperature";
import Humidity from "./components/Humidity";
import CloudCover from "./components/CloudCover";
import InfoBox from "./components/InfoBox";

function App() {
  return (
    <>
      <div className="header">
        <img src={SunCloudly} width={70} />
        <span className="header__appname">Weather App</span>
      </div>

      <div className="wrapper">
        <div className="today-weather">
          <Temperature temperature={24} condition="zachmurzenie" />
          <div className="today-weather_box">
            <InfoBox feelslike={20} windspeed={14} uvindex={5} />
            <div className="today-weather__counters">
              <Humidity humidity={30} />
              <CloudCover cloudcover={56} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
