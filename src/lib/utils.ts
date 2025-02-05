import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {dayjs} from '@/lib/dayjs';
import {Dayjs} from 'dayjs';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parseDate(date: string | Date) {
	return dayjs(date instanceof Date ? date.toISOString() : date).format('dddd, MMMM D');
}

export function parseWeek(date: Dayjs) {
	return `Week of ${date.startOf('week').format('MMMM D')}`;
}

export function parseSportName(sport: string) {
	return sport.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function parseDuration(mins: number) {
	if (mins < 60) {
		return `${mins} mins`;
	}
	const hours = Math.floor(mins / 60);
	const remainingMins = mins % 60;
	return `${hours} hours ${remainingMins > 0 ? `${remainingMins} mins` : ''}`;
}