import { config } from '@/config';
import Nylas from 'nylas';

// Initialize Nylas client
const nylas = new Nylas({
	apiKey: config.nylas.apiKey,
	apiUri: config.nylas.apiUri,
});

export default nylas;
