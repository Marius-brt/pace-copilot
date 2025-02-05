'use client';

import {trainingWeekSchema} from '@/lib/schemas';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import AutoForm, {AutoFormSubmit} from '@/components/ui/auto-form';
import {useCallback} from 'react';
import {z} from 'zod';
import {DependencyType} from '@/components/ui/auto-form/types';
import {saveTraining} from '@/actions/save-training';
import {toast} from 'sonner';

export function TrainingForm({defaultData}: Readonly<{ defaultData: z.infer<typeof trainingWeekSchema> | undefined }>) {
	const onSubmit = useCallback(async (data: z.infer<typeof trainingWeekSchema>) => {
		const res = await saveTraining(data);
		if (res?.serverError) {
			toast.error(res.serverError.serverError.toString());
		} else {
			toast.success('Training plan saved');
		}
	}, []);

	return <Card className={'w-full'}>
		<CardHeader>
			<CardTitle>Training</CardTitle>
			<CardDescription>Set your current training plan for the week</CardDescription>
		</CardHeader>
		<CardContent className={'max-h-[500px] overflow-y-auto'}>
			<AutoForm values={defaultData} onSubmit={onSubmit} formSchema={trainingWeekSchema} dependencies={[
				{
					sourceField: 'bike',
					type: DependencyType.HIDES,
					targetField: 'bikeOptions',
					when: (bike) => bike !== true
				},
				{
					sourceField: 'strength',
					type: DependencyType.HIDES,
					targetField: 'strengthOptions',
					when: (bike) => bike !== true
				}
			]}>
				<AutoFormSubmit className={'w-full'}>Save</AutoFormSubmit>
			</AutoForm>
		</CardContent>
	</Card>;
}