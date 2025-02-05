import {prisma} from '@/lib/prisma';

export class TrainingRepository {
	static async saveTrainings(userId: string, data: any) {
		await prisma.training.createMany({
			data: data.map((training: any) => ({
				userId,
				...training
			}))
		});
	}

	static async getTrainings(userId: string) {
		return await prisma.training.findMany({
			where: {
				userId
			},
			orderBy: {
				date: 'asc'
			}
		});
	}

	static async deleteTrainings(userId: string) {
		await prisma.training.deleteMany({
			where: {
				userId
			}
		});
	}
}