import {SignedIn, UserButton} from '@clerk/nextjs';
import {Generate} from '@/components/buttons/generate';
import {cachedUser} from '@/lib/repositories/user.repository';
import {auth} from '@clerk/nextjs/server';
import {Badge} from '@/components/ui/badge';
import Image from 'next/image';

export async function Navbar() {
	const user = await auth();
	const userData = user.userId ? await cachedUser(user.userId) : null;

	return <header
		className={'fixed top-0 left-0 w-full z-40 bg-background border-b'}>
		<div className={'max-w-7xl mx-auto flex items-center justify-between w-full p-4'}>
			<div className={'flex items-center gap-2'}>
				<Image src={'logo.svg'} alt={'Logo'} height={24} width={24}/>
				<span className={'text-lg font-bold'}>PaceCopilot</span>
			</div>
			<SignedIn>
				<div className={'flex items-center gap-4'}>
					<Badge variant={'outline'}>Credits: {userData ? userData.credits : 3}</Badge>
					<Generate disabled={userData ? userData?.credits <= 0 : false}/>
					<UserButton/>
				</div>
			</SignedIn>
		</div>
	</header>;
}