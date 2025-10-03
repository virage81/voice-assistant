import Nylas from 'nylas';

const { NYLAS_API_URL, NYLAS_API_KEY } = process.env;

export const nylas = new Nylas({ apiKey: NYLAS_API_KEY!, apiUri: NYLAS_API_URL });
