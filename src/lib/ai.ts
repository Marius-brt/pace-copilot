import {Prisma, TrainingType} from '@prisma/client';
import {z} from 'zod';
import {trainingWeekSchema} from '@/lib/schemas';
import {dayjs} from '@/lib/dayjs';

export function generatePrompt(userData: Prisma.UserGetPayload<{}>, goal: Prisma.GoalGetPayload<{}>) {
	const training = userData.training as z.infer<typeof trainingWeekSchema>;
	const trainings: string[] = [];
	trainings.push(`- ${training.running.distance} km of running in ${training.running.duration} hours with ${training.running.trainingPerWeek} training sessions${training.running.elevationGain ? ` and ${training.running.elevationGain} meters of ascent.` : ''}`);

	if (training.bikeOptions) {
		trainings.push(`- ${training.bikeOptions.duration}h road cycling with ${training.bikeOptions.trainingPerWeek} outings${training.bikeOptions.distance ? ` and a total of ${training.bikeOptions.distance} km` : ''}`);
	}

	if (training.strengthOptions) {
		trainings.push(`- ${training.strengthOptions.count} strength training sessions for a total of ${training.strengthOptions.duration} hours`);
	}

	const remainingWeeks = dayjs(goal.date).diff(dayjs(), 'week');

	return `You're an expert endurance coach creating a structured training plan for an athlete preparing for a ${goal.type.toLowerCase().replace('_', ' ')} race in ${remainingWeeks} weeks.
The race is ${goal.distance} km long${goal.elevationGain ? `, with ${goal.elevationGain} meters of ascent` : ''}.${goal.timeGoal ? ` The athlete has a target time of ${goal.timeGoal} hours.` : ''}

### Current Training:
${trainings.join('\n')}

### Guidelines:
- **Gradual Increase**: Training volume should increase progressively by no more than 5–10% per week to avoid injury.
- **Structured Workouts**: Include a mix of interval training, tempo runs, long runs, and recovery runs.
- **Rest & Recovery**: At least one full rest day per week. Every 3–4 weeks, include a lighter recovery week.
- **Balance**: If the athlete cross-trains (cycling, strength training), adjust running volume accordingly.
- **Long Runs**: Schedule long runs on weekends when possible.
- **Do not include "REST" as a workout type. On rest days, simply do not include an entry for that day.**  
- **Only use the following workout types: ${Object.values(TrainingType).join(', ')}.**

### Training Plan:
Generate a detailed training plan for the next **2 weeks**, grouping workouts by **week** and not by **dayOfWeek**.
For each week, provide a structured list of workouts.  
Each workout should specify:
- **Day of the week (number)** (0 = Monday, 6 = Sunday)
- **Type of workout**
- **Description**: a detailed explanation of the workout
- **Duration (in minutes)**
- **Distance (in kilometers, if applicable)**
- **Elevation gain (in meters, if applicable)**  

Ensure the plan is **realistic and sustainable**, following the gradual increase principle. The goal is to build endurance, speed, and resilience progressively.`;
}