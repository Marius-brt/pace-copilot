import {z} from 'zod';
import {GoalType} from '@prisma/client';

const GoalEnum = Object.values(GoalType) as [GoalType, ...GoalType[]];

export const saveGoalSchema = z.object({
	type: z.enum(GoalEnum).default('ROAD_RUNNING'),
	distance: z.number().int().positive().default(21),
	elevationGain: z.number().int().min(0).optional(),
	date: z.date().min(new Date()),
	timeGoal: z.number().int().min(0).optional()
});

export const trainingWeekSchema = z.object({
	running: z.object({
		distance: z.number().int().positive().describe('Total distance'),
		elevationGain: z.number().int().min(0).optional().describe('Total elevation gain'),
		duration: z.number().int().positive().describe('Total duration'),
		trainingPerWeek: z.number().int().positive()
	}),
	bike: z.boolean().optional(),
	bikeOptions: z.object({
		duration: z.number().int().positive().describe('Total duration'),
		distance: z.number().int().positive().optional().describe('Total distance'),
		trainingPerWeek: z.number().int().positive()
	}).optional(),
	strength: z.boolean().optional(),
	strengthOptions: z.object({
		count: z.number().int().positive(),
		duration: z.number().int().positive().describe('Total duration')
	}).optional()
});

export const TrainingDay = z.object({
	type: z.enum(['STRENGTH', 'TRAIL_RUNNING', 'ROAD_RUNNING', 'ROAD_CYCLING'])
		.describe('The workout type. Do NOT use "REST".'),
	dayOfWeek: z.number().int().min(0).max(6)
		.describe('Day of the week (0 = Monday, 6 = Sunday).'),
	description: z.string()
		.describe('Detailed workout plan. No rest days.'),
	duration: z.number().nullable()
		.describe('Workout duration in minutes.'),
	distance: z.number().nullable()
		.describe('Distance in km (for running/cycling).'),
	elevationGain: z.number().nullable()
		.describe('Elevation gain in meters (if applicable).')
}).describe('A structured workout (not a rest day).');