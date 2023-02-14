import { useState } from "react";
import "./App.css";

import SunCloudly from "./assets/images/sun-cloudly.svg";
import Temperature from "./components/Temperature";

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
        </div>
      </div>
    </>
  );
}

export default App;
