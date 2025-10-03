import { config } from '@/config';
import Vapi from '@vapi-ai/web';

export * from './assistant';
export * from './types';

const vapi = new Vapi(config.vapi.apiKey);

export default vapi;
