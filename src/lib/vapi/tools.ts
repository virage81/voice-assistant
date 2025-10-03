import { config } from '@/config';
import { CreateApiRequestToolDTO } from '@vapi-ai/web/dist/api';

const { apiUri } = config;

export const getAvailabilityTool: CreateApiRequestToolDTO = {
	type: 'apiRequest',
	method: 'GET',
	name: 'get-available-schedule',
	description: 'This API Request helps to retrieve available slots to book an appointment.',
	url: `${apiUri}/check-availability`,
};

export const bookTime: CreateApiRequestToolDTO = {
	type: 'apiRequest',
	method: 'POST',
	name: 'book-time',
	description: 'API Request to book available time.',
	url: `${apiUri}/create-event`,
	body: {
		type: 'object',
		required: ['dateTime', 'name'],
		properties: {
			dateTime: {
				description:
					'The "dateTime" property represents the date and time value used to schedule an event, formatted as a string. This field is required and serves as the basis for determining the event\'s start time, which is then rounded to the nearest five-minute interval. The value is processed to create a calendar event using the Nylas API, with the timezone set to "Europe/Samara".',
				type: 'string',
				default: '',
			},
			name: {
				description:
					'The "name" property represents the name of a client, formatted as a string. This field is required and serves as the basis for determining the event\'s user.',
				type: 'string',
				default: '',
			},
		},
	},
};
