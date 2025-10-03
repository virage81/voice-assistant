import { config } from '@/config';
import { nylas } from '@/lib/nylas/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { dateTime, name } = await req.json();

	console.debug(dateTime, name);
	if (!dateTime || typeof dateTime !== 'string') {
		return NextResponse.json({ error: 'Missing or invalid dateTime' }, { status: 400 });
	}

	if (!name || typeof name !== 'string') {
		return NextResponse.json({ error: 'Missing or invalid name' }, { status: 400 });
	}

	const date = new Date(dateTime);
	if (Number.isNaN(date.getTime())) {
		return NextResponse.json({ error: 'Invalid ISO dateTime' }, { status: 400 });
	}

	try {
		const { data: event } = await nylas.events.create({
			queryParams: {
				calendarId: config.nylas.calendarId,
			},
			identifier: config.nylas.grantId,
			requestBody: {
				when: {
					time: date.getTime() / 1000,
					timezone: 'Europe/Samara',
				},
				title: `Voice Assistant event from ${name}`,
				description: 'Voice Assistant event',
			},
		});

		return NextResponse.json(event, { status: 201 });
	} catch (err: unknown) {
		const msg = err instanceof Error ? err.message : String(err);
		return NextResponse.json({ error: msg }, { status: 500 });
	}
}
