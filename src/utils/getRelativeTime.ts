export function getRelativeTime(timestamp: Date) {
	const HOUR_MILLISECONDS = 1000 * 60 * 60;
	const DAY_MILLISECONDS = HOUR_MILLISECONDS * 24;

	const rtf = new Intl.RelativeTimeFormat('en', {
		numeric: 'auto'
	});

	const hoursDifference = Math.round(
		(timestamp.getTime() - new Date().getTime()) / HOUR_MILLISECONDS
	);
	const daysDifference = Math.round(
		(timestamp.getTime() - new Date().getTime()) / DAY_MILLISECONDS
	);

	return daysDifference < 0
		? rtf.format(daysDifference, 'day')
		: rtf.format(hoursDifference, 'hour');
}
