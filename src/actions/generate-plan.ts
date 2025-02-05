'use server';

import {actionClient, ActionError} from '@/lib/safe-action';
import {auth} from '@clerk/nextjs/server';
import {UserRepository} from '@/lib/repositories/user.repository';
import {GoalRepository} from '@/lib/repositories/goal.repository';
import {generatePrompt} from '@/lib/ai';
import {generateObject} from 'ai';
import {z} from 'zod';
import {TrainingDay} from '@/lib/schemas';
import {convertTrainingData} from '@/lib/services/training.service';
import {TrainingRepository} from '@/lib/repositories/training.repository';
import {createOpenAI} from '@ai-sdk/openai';

export const generatePlan = actionClient
	.action(async () => {
		const data = await auth.protect();
		const userData = await UserRepository.getUser(data.userId);
		if (!userData || !userData.training) {
			throw new ActionError('Please provide your current training information before generating a plan');
		}
		if (userData.credits < 1) {
			throw new ActionError('You do not have enough credits to generate a plan');
		}
		const goal = await GoalRepository.getGoal(data.userId);
		if (!goal) {
			throw new ActionError('Please provide your goal before generating a plan');
		}
		try {
			await UserRepository.decrementCredits(data.userId);
			await TrainingRepository.deleteTrainings(data.userId);
			const prompt = generatePrompt(userData, goal);
			console.log(prompt);

			const openai = createOpenAI({
				apiKey: process.env.OPENAI_API_KEY!,
				compatibility: 'strict'
			});
			const {object} = await generateObject({
				model: openai('gpt-4o-2024-05-13'),
				maxRetries: 2,
				temperature: 0.3,
				maxTokens: 2500,
				schemaName: 'Week training plan',
				schemaDescription: 'A structured list of workouts for each week',
				mode: 'json',
				prompt,
				schema: z.array(TrainingDay),
				output: 'array'
			});
			console.log(object);
			const parsed = convertTrainingData(object);
			console.log(parsed);
			await TrainingRepository.saveTrainings(data.userId, parsed);
		} catch (e) {
			console.log(e);
			throw new ActionError('Failed to generate plan');
		}
	});