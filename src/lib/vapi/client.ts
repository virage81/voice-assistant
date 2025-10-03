import { config } from '@/config';
import Vapi from '@vapi-ai/web';

export const vapiClient: Vapi = new Vapi(config.vapi.apiKey);
