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
    'An opinionated productivity tracking app meant for tracking the duration of your personal sessions for any task. Loaded with features to help you increase your productivity.',
  authors: [{ name: 'CarboxyDev', url: 'https://carboxy.me' }],
  category: 'Productivity tool',
  colorScheme: 'dark',
  keywords: ['productivity', 'tool', 'timer', 'tasks'],
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
