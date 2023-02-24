export type currentWeatherType = {
  temp_c: number;
  is_day: number;
  condition: string;
  code: number;
  feelslike: number;
  wind_kph: number;
  uv: number;
  humidity: number;
  cloud: number;
};

export type forecastType = {
  temp_c: number;
  date: string;
  condition: string;
  cloudAt12: number;
};
