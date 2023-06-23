import { cn } from '@/utils/util';
import { Barlow } from 'next/font/google';

const barlow = Barlow({ weight: '600', subsets: ['latin'] });

interface TimeFormat {
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeDisplayProps {
  time: TimeFormat;
}

const TimeDisplay = (props: TimeDisplayProps) => {
  const { hours, minutes, seconds } = props.time;
  return (
    <>
      <div>
        <div className={cn(barlow.className, 'text-5xl')}>
          {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </>
  );
};

export default TimeDisplay;
