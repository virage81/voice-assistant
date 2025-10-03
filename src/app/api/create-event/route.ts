import { config } from '@/config';
import { nylas } from '@/lib/nylas';
import { roundDateToNearestFiveMinutes } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { dateTime, name } = await req.json();
		if (!dateTime || !name) return NextResponse.json({ error: '`dateTime` or `name` not provided' }, { status: 400 });
		const startDate = roundDateToNearestFiveMinutes(new Date(dateTime));

		const { data: event } = await nylas.events.create({
			identifier: config.nylas.grantId,
			queryParams: {
				calendarId: config.nylas.calendarId,
			},
			requestBody: {
				title: `Event from ${name.trim()}`,
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
