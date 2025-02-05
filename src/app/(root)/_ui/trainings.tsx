import {getTrainingsPerWeek} from '@/lib/services/training.service';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {auth} from '@clerk/nextjs/server';
import {parseDate, parseDuration, parseSportName, parseWeek} from '@/lib/utils';
import {TrainingType} from '@prisma/client';
import {Activity, Bike, Clock, Dumbbell, Mountain, RouteIcon} from 'lucide-react';

const getTrainingTypeIcon = (type: TrainingType) => {
	switch (type) {
		case TrainingType.STRENGTH:
			return <Dumbbell className="mr-2 h-5 w-5"/>;
		case TrainingType.TRAIL_RUNNING:
		case TrainingType.ROAD_RUNNING:
			return <svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="rgba(0,0,0,1)"
				className={'mr-2 h-5 w-5'}
			>
				<path
					d="M9.82986 8.78986L7.99998 9.45588V13H5.99998V8.05H6.015L11.2834 6.13247C11.5274 6.03855 11.7922 5.99162 12.0648 6.0008C13.1762 6.02813 14.1522 6.75668 14.4917 7.82036C14.678 8.40431 14.848 8.79836 15.0015 9.0025C15.9138 10.2155 17.3653 11 19 11V13C16.8253 13 14.8823 12.0083 13.5984 10.4526L12.9008 14.4085L15 16.17V23H13V17.1025L10.7307 15.1984L10.003 19.3253L3.10938 18.1098L3.45667 16.1401L8.38071 17.0084L9.82986 8.78986ZM13.5 5.5C12.3954 5.5 11.5 4.60457 11.5 3.5C11.5 2.39543 12.3954 1.5 13.5 1.5C14.6046 1.5 15.5 2.39543 15.5 3.5C15.5 4.60457 14.6046 5.5 13.5 5.5Z"/>
			</svg>;

		case TrainingType.ROAD_CYCLING:
			return <Bike className="mr-2 h-5 w-5"/>;
		default:
			return <Activity className="mr-2 h-5 w-5"/>;
	}
};

export async function Trainings() {
	const user = await auth();
	const data = await getTrainingsPerWeek(user.userId!);

	return <Card>
		<CardHeader>
			<CardTitle>Trainings</CardTitle>
			<CardDescription>Here are the trainings for the next 2 weeks</CardDescription>
		</CardHeader>
		<CardContent className={'flex flex-col gap-8'}>
			{data.length > 0 ? data.map((week, i) => (
				<div key={i} className={'flex flex-col gap-4'}>
					<h2 className={'text-xl font-bold'}>{parseWeek(week.firstDay)}</h2>
					{week.trainings.map((training) => <Card key={training.id}>
							<CardHeader>
								<CardTitle className="flex items-center">
									{getTrainingTypeIcon(training.type)}
									{parseSportName(training.type)}
								</CardTitle>
								<CardDescription>{parseDate(training.date)}</CardDescription>
								<p>{training.description}</p>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col space-y-2">
									{training.distance && (
										<div className="flex items-center">
											<RouteIcon className="mr-2 h-4 w-4"/>
											<span>{training.distance} km</span>
										</div>
									)}
									{training.duration && (
										<div className="flex items-center">
											<Clock className="mr-2 h-4 w-4"/>
											<span>{parseDuration(training.duration)}</span>
										</div>
									)}
									{training.elevationGain && (
										<div className="flex items-center">
											<Mountain className="mr-2 h-4 w-4"/>
											<span>{training.elevationGain} m</span>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			)) : <span className={'text-sm'}>No trainings found. Generate a training plan to get started</span>}
		</CardContent>
	</Card>;
}