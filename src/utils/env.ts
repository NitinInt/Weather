/* eslint-disable import/no-unresolved */
import {
  WEATHER_API_KEY,
  WEATHER_API_BASE_URL,
  CURRENT_CITY_URL,
  WEATHER_ICON_URL,
  IP_TOKEN,
} from '@env';
import {z} from 'zod';

const environmentSchema = z.object({
  WEATHER_API_KEY: z.string().trim().min(1),
  WEATHER_API_BASE_URL: z.string().trim().min(1),
  CURRENT_CITY_URL: z.string().trim().min(1),
  WEATHER_ICON_URL: z.string().trim().min(1),
  IP_TOKEN: z.string().trim().min(1),
});

export const env = environmentSchema.parse({
  WEATHER_API_KEY,
  WEATHER_API_BASE_URL,
  CURRENT_CITY_URL,
  WEATHER_ICON_URL,
  IP_TOKEN,
});
