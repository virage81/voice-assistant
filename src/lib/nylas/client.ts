import { config } from '@/config';
import Nylas from 'nylas';

export const nylas = new Nylas({ apiKey: config.nylas.apiKey, apiUri: config.nylas.apiUri });
