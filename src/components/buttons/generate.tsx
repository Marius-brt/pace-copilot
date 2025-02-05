'use client';
import {Button} from '@/components/ui/button';
import {generatePlan} from '@/actions/generate-plan';
import {useCallback, useState} from 'react';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';

export function Generate({disabled}: Readonly<{ disabled: boolean }>) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const onClick = useCallback(async () => {
		setLoading(true);
		const data = await generatePlan();
		setLoading(false);
		if (data?.serverError) {
			toast.error(data.serverError.serverError.toString());
		} else {
			router.refresh();
		}
	}, []);

	return <Button size={'sm'} disabled={disabled || loading} isLoading={loading} onClick={onClick}>
		{loading ? 'Generating...' : 'Generate plan'}
	</Button>;
}
