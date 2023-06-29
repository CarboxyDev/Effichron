import { cn } from '@/utils/util';
import { IBM_Plex_Mono } from 'next/font/google';

const timerFont = IBM_Plex_Mono({ weight: '400', subsets: ['latin'] });

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
        <div className={cn(timerFont.className, 'text-7xl text-zinc-200')}>
          <span className={cn(hours && '')}>
            {hours.toString().padStart(2, '0')}:
          </span>
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </>
  );
};

export default TimeDisplay;
