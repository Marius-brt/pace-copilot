'use server';

import {actionClient} from '@/lib/safe-action';
import {saveGoalSchema} from '@/lib/schemas';
import {auth} from '@clerk/nextjs/server';
import {GoalRepository} from '@/lib/repositories/goal.repository';

export const saveGoal = actionClient
	.schema(saveGoalSchema)
	.action(async ({parsedInput}) => {
		const data = await auth.protect();
		await GoalRepository.saveGoal(data.userId, parsedInput);
	});