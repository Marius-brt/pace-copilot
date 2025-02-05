import {GoalForm} from '@/components/forms/goal-form';
import {TrainingForm} from '@/components/forms/training-form';
import {Trainings} from '@/app/(root)/_ui/trainings';
import {cachedUser} from '@/lib/repositories/user.repository';
import {auth} from '@clerk/nextjs/server';
import {GoalRepository} from '@/lib/repositories/goal.repository';

export default async function Home() {
	const user = await auth();
	const userData = await cachedUser(user.userId!);
	const goal = await GoalRepository.getGoal(user.userId!);

	return <div className={'flex flex-col w-full gap-4'}>
		<div className={'grid grid-cols-2 w-full gap-4 max-md:grid-cols-1'}>
			<GoalForm defaultData={goal ? {...goal, id: undefined, userId: undefined} as any : undefined}/>
			<TrainingForm defaultData={userData?.training || undefined}/>
		</div>
		<Trainings/>
	</div>;
}