import './globals.css';
import type {Metadata, Viewport} from 'next';
import {ClerkProvider} from '@clerk/nextjs';
import {Inter as FontSans, Outfit as FontHeading} from 'next/font/google';
import {Toaster} from '@/components/ui/sonner';
import Script from 'next/script';
import {Footer} from '@/components/layout/footer';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans'
});

const fontHeading = FontHeading({
	subsets: ['latin'],
	variable: '--font-heading'
});

export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width',
	maximumScale: 1,
	viewportFit: 'cover'
};

export const metadata: Metadata = {
	title: 'PaceCopilot - AI Running Coach',
	description: 'PaceCopilot is an AI-powered running coach that generates personalized training plans to help you achieve your race goals.',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		siteName: 'PaceCopilot',
		title: 'PaceCopilot - AI Running Coach',
		description: 'AI-driven personalized running plans to optimize your training and race performance.'
	},
	keywords: 'running, AI, coach, marathon training, PaceCopilot, running plans, training plans, trail running, road running, strength training'
};

export default function RootLayout({
									   children
								   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
			<html lang="en">
			<body
				className={`${fontSans.variable} ${fontHeading.variable} font-sans antialiased`}>
			{children}
			<Footer/>
			<Toaster position={'bottom-right'}/>
			<Script defer data-domain="pacecopilot.mariusbrt.com"
					src="https://plausible.mariusbrt.com/js/script.outbound-links.js"></Script>
			</body>
			</html>
		</ClerkProvider>
	);
}
