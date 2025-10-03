export function roundToFiveMinutes(tsSeconds: number) {
	const fiveMin = 300;
	return Math.round(tsSeconds / fiveMin) * fiveMin;
}
