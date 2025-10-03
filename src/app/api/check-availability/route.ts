import { nylas } from '@/lib/nylas';
import { roundDateToNearestFiveMinutes } from '@/utils';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const startDate = roundDateToNearestFiveMinutes(new Date());
		const endDate = roundDateToNearestFiveMinutes(new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000));

		const { data } = await nylas.calendars.getAvailability({
			requestBody: {
				participants: [
					{
						email: 'bugay30112003@gmail.com',
					},
				],
				startTime: Math.floor(startDate.getTime()) / 1000,
				endTime: Math.floor(endDate.getTime()) / 1000,
				durationMinutes: 60,
			},
		});

		const availableSlots = data.timeSlots.map(slot => ({
			start_time: new Date(parseInt(slot.startTime) * 1000).toISOString(),
			end_time: new Date(parseInt(slot.endTime) * 1000).toISOString(),
		}));

		return NextResponse.json({
			collection: availableSlots,
			pagination: { count: availableSlots.length },
		});
	} catch (error) {
		console.error('check-availability error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
