export const roundDateToNearestFiveMinutes = (date: Date): Date => {
	const minutes = date.getMinutes();
	const roundedMinutes = Math.round(minutes / 5) * 5;
	const roundedDate = new Date(date);
	roundedDate.setMinutes(roundedMinutes);
	roundedDate.setSeconds(0);
	roundedDate.setMilliseconds(0);
	return roundedDate;
};
