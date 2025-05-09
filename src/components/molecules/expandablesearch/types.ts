import {CityType} from '@Weather/hooks/services/useCitySearch';

export type ExpandSearchType = {
  placeholder?: string;
  onSelect: (item: CityType) => void;
};
