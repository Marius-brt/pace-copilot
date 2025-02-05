'use server';

import {actionClient} from '@/lib/safe-action';
import {trainingWeekSchema} from '@/lib/schemas';
import {auth} from '@clerk/nextjs/server';
import {UserRepository} from '@/lib/repositories/user.repository';

export const saveTraining = actionClient
	.schema(trainingWeekSchema)
	.action(async ({parsedInput}) => {
		const data = await auth.protect();
		await UserRepository.saveUserTraining(data.userId, parsedInput);
	});