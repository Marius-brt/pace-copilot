import {Navbar} from '@/components/layout/navbar';

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
	return <>
		<Navbar/>
		<main className={'min-h-screen max-w-7xl mx-auto w-full flex items-center flex-col pt-20 px-4 pb-4'}>
			{children}
		</main>
	</>;
}