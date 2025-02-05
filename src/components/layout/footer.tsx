export function Footer() {
	return <footer className={'w-full px-4 border-t '}>
		<div className={'flex justify-between py-8 max-lg:flex-col gap-4 max-w-7xl w-full mx-auto'}>
			<div className={'space-y-2'}>
				<p className={'text-muted-foreground'}>Made with ❤️ by <a href={'https://mariusbrt.com'}
																		  className={'underline font-semibold'}>
					Marius Brouty</a>
				</p>
				<p className={'text-xs text-muted-foreground'}>This tool is for information purposes only. It
					should not be considered as a real coach.</p>
			</div>
			<p className={'text-muted-foreground'}>Source code available on <a
				href={'https://github.com/Marius-brt/pace-copilot'} target={'_blank'}
				className={'underline font-semibold'}>GitHub</a></p>
		</div>
	</footer>;
}