export type WeatherType = {
  main: string;
  description: string;
  icon: string;
};

export type WindType = {
  speed: number;
};
export type RainType = {
  '1h': number;
  '3h': number;
};
export type WeatherGeneralInfo = {
  temp: number;
  temp_min: number;
  temp_max: number;
  feels_like: number;
  humidity: number;
};

export type ForeCastType = {
  dt_txt?: string;
  main: WeatherGeneralInfo;
  weather: WeatherType[];
  wind: WindType;
  rain?: RainType;
};

export type ForeCastsType = ForeCastType[];

export type DayWeatherType = {
  name: string;
} & ForeCastType;

export type ForecastResponseType = {
  cnt: number;
  list: ForeCastsType;
};
