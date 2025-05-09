import {create} from 'zustand';

const initialLocale = {
  language: 'en',
};

export type LocalStoreProps = {
  language: string;
  setLanguage: (language: string) => void;
};

export const useLocaleStore = create<LocalStoreProps>(set => ({
  ...initialLocale,
  setLanguage: (language: string) => {
    set({language});
  },
}));
