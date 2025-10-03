export const config = {
	apiUri: process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3000/api',

	vapi: {
		apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY || '',
	},

	nylas: {
		apiUri: process.env.NYLAS_API_URL || 'https://api.us.nylas.com',
		apiKey: process.env.NYLAS_API_KEY || '',
		grantId: process.env.NYLAS_GRANT_ID || '',
		calendarId: process.env.NYLAS_CALENDAR_ID || '',
	},
};
