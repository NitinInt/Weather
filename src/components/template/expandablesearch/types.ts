import {WithDisplayName} from '@Weather/components/types';

export type ExpandSearchType<T extends WithDisplayName> = {
  placeholder?: string;
  onSelect: (item: T) => void;
  onSearch: (query: string) => void;
  data: T[];
};
