import { config } from '@/config';
import Vapi from '@vapi-ai/web';

// Initialize Vapi client
export const vapiClient = new Vapi(config.vapi.apiKey);

export default vapiClient;
