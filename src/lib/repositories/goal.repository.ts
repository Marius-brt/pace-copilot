import {saveGoalSchema} from '@/lib/schemas';
import {prisma} from '@/lib/prisma';
import {z} from 'zod';

export class GoalRepository {
	static async saveGoal(userId: string, data: z.infer<typeof saveGoalSchema>) {
		await prisma.goal.upsert({
			where: {
				userId
			},
			update: data,
			create: {
				...data,
				userId
			}
		});
	}

	static async getGoal(userId: string) {
		return prisma.goal.findUnique({
			where: {
				userId
			}
		});
	}
}