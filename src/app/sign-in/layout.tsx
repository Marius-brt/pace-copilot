export default function AuthLayout({children}: Readonly<{ children: React.ReactNode }>) {
	return <main className={'min-h-screen w-full flex items-center justify-center'}>
		{children}
	</main>;
}