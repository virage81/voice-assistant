/**
 * Round Unix timestamp to the nearest 5-minute interval
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Rounded timestamp in milliseconds
 */
export function roundToNearestFiveMinutes(timestamp: number): number {
	const FIVE_MINUTES_MS = 5 * 60 * 1000;
	return Math.ceil(timestamp / FIVE_MINUTES_MS) * FIVE_MINUTES_MS;
}

/**
 * Round Unix timestamp in seconds to the nearest 5-minute interval
 * @param timestamp - Unix timestamp in seconds
 * @returns Rounded timestamp in seconds
 */
export function roundToNearestFiveMinutesInSeconds(timestamp: number): number {
	const FIVE_MINUTES_SECONDS = 5 * 60;
	return Math.ceil(timestamp / FIVE_MINUTES_SECONDS) * FIVE_MINUTES_SECONDS;
}

/**
 * Round Date object to the nearest 5-minute interval
 * @param date - Date object
 * @returns New Date object rounded to nearest 5 minutes
 */
export function roundDateToNearestFiveMinutes(date: Date): Date {
	const roundedTimestamp = roundToNearestFiveMinutes(date.getTime());
	return new Date(roundedTimestamp);
}

/**
 * Format time in milliseconds for display
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted time string
 */
export function formatTimestamp(timestamp: number): string {
	return new Date(timestamp).toISOString();
}
