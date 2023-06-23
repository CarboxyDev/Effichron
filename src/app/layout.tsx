import { cn } from '@/utils/util';
import '../styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Productivity Tracker',
  description: 'An app for tracking your productivity',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-zinc-900 text-zinc-100')}>
        {children}
      </body>
    </html>
  );
}
