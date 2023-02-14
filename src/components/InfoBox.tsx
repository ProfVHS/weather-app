import React from "react";

interface InfoBoxProps {
  feelslike: number;
  windspeed: number;
  uvindex: number;
}

function InfoBox({ feelslike, windspeed, uvindex }: InfoBoxProps) {
  return (
    <div className="infobox">
      <span>{feelslike}</span>
      <span>{windspeed}</span>
      <span>{uvindex}</span>
    </div>
  );
}

export default InfoBox;
