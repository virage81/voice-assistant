import { config } from '@/config';
import { nylas } from '@/lib/nylas/client';
import { roundToFiveMinutes } from '@/utils';
import { NextResponse } from 'next/server';

export async function GET() {
	const now = Date.now();
	const sevenDays = now + 7 * 24 * 60 * 60;

	const start = roundToFiveMinutes(now);
	const end = roundToFiveMinutes(sevenDays);

	try {
		const { data } = await nylas.calendars.getAvailability({
			requestBody: {
				durationMinutes: 60,
				startTime: start,
				endTime: end,
				participants: [{ email: config.nylas.calendarId }],
			},
		});

		const slots = data.timeSlots.map(s => ({
			time: new Date(s.startTime).toISOString(),
		}));

		return NextResponse.json({ slots });
	} catch (err: unknown) {
		const msg = err instanceof Error ? err.message : String(err);
		return NextResponse.json({ error: msg }, { status: 500 });
	}
}
