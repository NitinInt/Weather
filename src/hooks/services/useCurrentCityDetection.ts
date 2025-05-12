import {env} from '@Weather/utils/env';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const DEFAULT_STALE_TIME = 300_000;
const CITY_URL = `${env.CURRENT_CITY_URL}/${env.IP_TOKEN}`;

type CurrentCityType = {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  postal: string;
  timezone: string;
  org: string;
};

const useCurrentCityDetection = () => {
  const {
    data: city,
    error,
    isLoading,
    isFetching,
  } = useQuery<CurrentCityType, Error>({
    queryKey: ['cityDetection'],

    queryFn: async () => {
      const response = await axios.get<CurrentCityType>(CITY_URL);
      return response.data;
    },
    staleTime: DEFAULT_STALE_TIME, // 1 minute
    refetchOnWindowFocus: true,
  });

  const [lat, lon] = city ? city?.loc.split(',').map(Number) : [0, 0];

  return {
    cityName: city?.city ?? 'Berlin',
    country: city?.country ?? 'DE',
    lat: lat ?? 52.52,
    lon: lon ?? 13.405,
    isLoading: isLoading || isFetching,
    error: error?.message ?? null,
  };
};

export default useCurrentCityDetection;
