import React from "react";

import SunCloudly from "../assets/images/sun-cloudly.svg";

function Temperature() {
  return (
    <>
      <div className="today-weather__temperature">17°</div>
      <img src={SunCloudly} className="today-weather__icon" />
    </>
  );
}

export default Temperature;
