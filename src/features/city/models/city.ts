export type CityDTO = {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
};

export type CityType = CityDTO & {
  displayName: string;
};
