import Providers from '@/utils/providers';
import { cn } from '@/utils/util';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Effichron',
  description:
    'A productivity tracking app meant for tracking the duration of your personal tasks and saving their progress online as sessions. Gain insight into how you spend your time.',
  authors: [{ name: 'CarboxyDev', url: 'https://carboxy.me' }],
  category: 'Productivity tool',
  colorScheme: 'dark',
  keywords: [
    'productivity',
    'productivity-tool',
    'productivity-app',
    'timer-app',
  ],
  openGraph: {
    title: 'Effichron',
    description:
      'A productivity tracking app meant for tracking the duration of your personal tasks and saving their progress online as sessions. Gain insight into how you spend your time.',
    url: 'https://effichron.carboxy.me',
    siteName: 'Effichron',
    images: [
      {
        url: 'https://effichron.carboxy.me/logo.png',
        width: 239,
        height: 208,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          process.env.DEV == 'true' && 'debug-screens',
          'bg-dark-950 text-dark-100'
        )}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
