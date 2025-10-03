import { nylas } from '@/lib/nylas';
import { roundDateToNearestFiveMinutes } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { dateTime } = await req.json();
		if (!dateTime) return NextResponse.json({ error: 'dateTime not provided' }, { status: 400 });
		const startDate = roundDateToNearestFiveMinutes(new Date(dateTime));

		const { data: event } = await nylas.events.create({
			identifier: process.env.NYLAS_CALENDAR_GRANT_ID!,
			queryParams: {
				calendarId: 'bugay30112003@gmail.com',
			},
			requestBody: {
				title: 'Event from voice Assistant',
				description: 'Voice Assistant event',
				when: {
					time: startDate.getTime() / 1000,
					timezone: 'Etc/GMT',
				},
			},
		});

		return NextResponse.json({ event }, { status: 201 });
	} catch (error) {
		console.error('check-availability error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
