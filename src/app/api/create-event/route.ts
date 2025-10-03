import { bookMeeting } from '@/lib/nylas/calendar';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { dateTime, name } = await request.json();

		if (!dateTime || !name) {
			return NextResponse.json(
				{
					success: false,
					error: 'Missing required parameters: date and name',
				},
				{ status: 400 }
			);
		}
		const event = await bookMeeting(name, dateTime);

		return NextResponse.json({ event }, { status: 201 });
	} catch (error) {
		console.error('Error creating event:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to create event',
			},
			{ status: 500 }
		);
	}
}
