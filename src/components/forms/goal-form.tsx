'use client';

import {saveGoal} from '@/actions/save-goal';
import {saveGoalSchema} from '@/lib/schemas';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import AutoForm, {AutoFormSubmit} from '@/components/ui/auto-form';
import {useCallback} from 'react';
import {z} from 'zod';
import {toast} from 'sonner';

export function GoalForm({defaultData}: Readonly<{ defaultData: z.infer<typeof saveGoalSchema> | undefined }>) {
	const onSubmit = useCallback(async (data: z.infer<typeof saveGoalSchema>) => {
		const res = await saveGoal(data);
		if (res?.serverError) {
			toast.error(res.serverError.serverError.toString());
		} else {
			toast.success('Goal saved');
		}
	}, []);

	return <Card className={'w-full'}>
		<CardHeader>
			<CardTitle>Goal</CardTitle>
			<CardDescription>Set your goal</CardDescription>
		</CardHeader>
		<CardContent>
			<AutoForm values={defaultData} onSubmit={onSubmit} formSchema={saveGoalSchema}>
				<AutoFormSubmit className={'w-full'}>Save</AutoFormSubmit>
			</AutoForm>
		</CardContent>
	</Card>;
}