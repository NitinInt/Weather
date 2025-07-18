import {CityType} from '../../features/city/models/city';

export type CitySearchType = {
  placeholder?: string;
  onSelect: (item: CityType) => void;
};
