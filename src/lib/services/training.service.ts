import {TrainingRepository} from '@/lib/repositories/training.repository';
import {dayjs, Dayjs} from '@/lib/dayjs';

export function convertTrainingData(data: any) {
	let nextMonday = dayjs().weekday(7).set('hour', 10).set('minute', 0).set('second', 0).set('millisecond', 0);
	const trainings = [];
	for (const week of data) {
		for (const day of week) {
			const date = nextMonday.add(day.dayOfWeek, 'day');
			trainings.push({
				type: day.type,
				date: date.toISOString(),
				distance: day.distance ?? undefined,
				duration: day.duration ?? undefined,
				elevationGain: day.elevationGain ?? undefined,
				description: day.description
			});
		}
		nextMonday = nextMonday.add(1, 'week');
	}
	return trainings;
}

export async function getTrainingsPerWeek(userId: string) {
	const data = await TrainingRepository.getTrainings(userId);
	const weeks: {
		firstDay: Dayjs,
		trainings: any[]
	}[] = [];

	if (data.length === 0) {
		return weeks;
	}

	const sortedData = [...data].sort((a, b) =>
		dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1
	);

	let currentWeekStart = dayjs(sortedData[0].date).startOf('week');
	let currentTrainings: any[] = [];

	for (const training of sortedData) {
		const trainingDate = dayjs(training.date);
		const weekStart = trainingDate.startOf('week');

		if (!weekStart.isSame(currentWeekStart, 'day')) {
			if (currentTrainings.length > 0) {
				weeks.push({
					firstDay: currentWeekStart,
					trainings: currentTrainings
				});
			}
			currentWeekStart = weekStart;
			currentTrainings = [];
		}

		currentTrainings.push(training);
	}

	// Add the last week
	if (currentTrainings.length > 0) {
		weeks.push({
			firstDay: currentWeekStart,
			trainings: currentTrainings
		});
	}

	return weeks;
}