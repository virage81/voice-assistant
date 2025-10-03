import { config } from '@/config';
import { roundToNearestFiveMinutes, roundToNearestFiveMinutesInSeconds } from '@/lib/utils/time';
import { Event } from 'nylas';
import nylas from './index';

export interface TimeSlot {
	date: string;
}

/**
 * Get available time slots for the next 7 days
 */
export async function getAvailableSlots(): Promise<TimeSlot[]> {
	try {
		const now = Date.now();
		const startTime = roundToNearestFiveMinutesInSeconds(Math.floor(now));
		const endTime = roundToNearestFiveMinutesInSeconds(Math.floor(now + 7 * 24 * 60 * 60));

		const { data } = await nylas.calendars.getAvailability({
			requestBody: {
				startTime,
				endTime,
				participants: [{ email: config.nylas.calendarId }],
				durationMinutes: 60,
			},
		});

		const slots: TimeSlot[] = [];

		slots.push(...data.timeSlots.map(slot => ({ date: new Date(slot.startTime).toISOString() })));

		return slots;
	} catch (error) {
		console.error('Error fetching available slots:', error);
		return [];
	}
}

/**
 * Book a meeting at the selected time slot (rounded to nearest 5 minutes)
 */
export async function bookMeeting(userName: string, dateTime: string): Promise<Event> {
	try {
		const parsedDate = new Date(dateTime);
		const roundedTimeMs = roundToNearestFiveMinutes(parsedDate.getTime());
		const roundedTimeSeconds = Math.floor(roundedTimeMs / 1000);

		const { data } = await nylas.events.create({
			identifier: config.nylas.grantId,
			queryParams: {
				calendarId: config.nylas.calendarId,
			},
			requestBody: {
				title: `Meeting with ${userName}`,
				description: `Meeting scheduled via voice assistant`,
				when: {
					time: roundedTimeSeconds,
					timezone: 'Europe/Moscow',
				},
			},
		});

		return data;
	} catch (error) {
		console.error('Error booking meeting:', error);
		throw error;
	}
}
