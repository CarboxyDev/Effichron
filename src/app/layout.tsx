import { cn } from '@/utils/util';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/utils/providers';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Productivity Tracker',
  description: 'An app for tracking your productivity',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          process.env.DEV == 'true' && 'debug-screens',
          'bg-zinc-950 text-zinc-100'
        )}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
