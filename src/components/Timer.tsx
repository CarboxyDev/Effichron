'use client';

import { useStore } from '@/lib/store/useStore';
import { useTimer } from '@/lib/store/useTimer';
import { useEffect } from 'react';

const Timer = () => {
  const persistentTimer = useStore(useTimer, (state) => state);

  useEffect(() => {
    const clientCalculateTime = setInterval(() => {
      persistentTimer?.setDuration(persistentTimer?.duration + 1);
      console.log(`Timer: ${persistentTimer?.duration}`);
      if (
        typeof persistentTimer?.duration != 'undefined' &&
        persistentTimer?.duration % 10 === 0 &&
        persistentTimer?.duration != 0
      ) {
        persistentTimer.reset();
      }
    }, 1000);

    return () => clearInterval(clientCalculateTime);
  }, [persistentTimer]);

  return (
    <div>
      <div>Time: {persistentTimer?.duration}</div>
    </div>
  );
};

export default Timer;
