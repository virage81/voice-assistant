import { getAvailableSlots } from '@/lib/nylas/calendar';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const slots = await getAvailableSlots();

		return NextResponse.json({ slots }, { status: 200 });
	} catch (error) {
		console.error('Error fetching availability:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to fetch available slots',
			},
			{ status: 500 }
		);
	}
}
