import {prisma} from '@/lib/prisma';
import {z} from 'zod';
import {trainingWeekSchema} from '@/lib/schemas';
import {cache} from 'react';

export class UserRepository {
	static async saveUserTraining(userId: string, data: z.infer<typeof trainingWeekSchema>) {
		await prisma.user.upsert({
			where: {
				id: userId
			},
			update: {
				training: data
			},
			create: {
				training: data,
				id: userId
			}
		});
	}

	static async getUserTraining(userId: string) {
		const data = await prisma.user.findUnique({
			where: {
				id: userId
			}
		});
		if (!data) return null;
		return data.training as z.infer<typeof trainingWeekSchema>;
	}

	static async getUser(userId: string) {
		return prisma.user.findUnique({
			where: {
				id: userId
			}
		}) as Promise<{ training: z.infer<typeof trainingWeekSchema>, id: string, credits: number } | null>;
	}

	static async decrementCredits(userId: string) {
		await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				credits: {
					decrement: 1
				}
			}
		});
	}
}

export const cachedUser = cache(UserRepository.getUser);