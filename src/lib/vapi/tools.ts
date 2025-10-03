import { config } from '@/config';
import { CreateApiRequestToolDTO } from '@vapi-ai/web/dist/api';

export const getAvailableSlots: CreateApiRequestToolDTO = {
	type: 'apiRequest',
	description: 'This API Request helps to retrieve available slots to book an appointment. ',
	name: 'get_available_slots',
	url: `${config.baseUri}/api/check-availability`,
	method: 'GET',
};

export const bookTime: CreateApiRequestToolDTO = {
	type: 'apiRequest',
	description: 'API Request to book available time',
	name: 'book_time',
	url: `${config.baseUri}/api/create-event`,
	method: 'POST',
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
					'The "name" property represents the name of the client to schedule an event, formatted as a string. This field is required.',
				type: 'string',
				default: '',
			},
		},
	},
};
