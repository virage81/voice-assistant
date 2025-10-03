export const config = {
	baseUri: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
	vapi: {
		apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY || '',
	},
	nylas: {
		apiUri: process.env.NYLAS_API_URL || '',
		apiKey: process.env.NYLAS_API_KEY || '',
		grantId: process.env.NYLAS_GRANT_ID || '',
		calendarId: process.env.NYLAS_CALENDAR_ID || '',
	},
};
