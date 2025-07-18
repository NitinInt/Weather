export type WeatherType = {
  main: string;
  description: string;
  icon: string;
};

type WindType = {
  speed: number;
};
type RainType = {
  '1h': number;
  '3h': number;
};
type WeatherGeneralInfo = {
  temp: number;
  temp_min: number;
  temp_max: number;
  feels_like: number;
  humidity: number;
};

export type ForeCastType = {
  dt_txt: string;
  main: WeatherGeneralInfo;
  weather: WeatherType[];
  wind: WindType;
  rain?: RainType;
};

type WeatherCityInfo = {
  id: number;
  name: string;
  country: string;
};

export type ForeCastsType = ForeCastType[];

export type DayWeatherType = {
  name: string;
} & ForeCastType;

export type HourlyForecastType = {
  cod: string;
  message: number;
  cnt: number;
  list: ForeCastsType;
  city: WeatherCityInfo;
};

export type ForecastResponseDTO = {
  cnt: number;
  list: ForeCastsType;
  city: WeatherCityInfo;
};
