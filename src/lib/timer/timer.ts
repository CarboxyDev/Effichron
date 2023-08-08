import { TimerTimestamp } from '@/lib/types';
import { dateDifferenceInSeconds } from '@/utils/util';

export const calculateTimerDuration = (
  timestamps: TimerTimestamp[]
): number => {
  let totalDuration = 0;
  timestamps.forEach((timestamp, index) => {
    if (timestamp.time === null) throw new Error('Timestamp time is null');
    if (timestamp.type === 'play') {
      if (timestamps[index + 1] !== undefined) {
        if (timestamps[index + 1].time === null)
          throw new Error('Timestamp + 1 time is null');
        if (timestamps[index + 1].type === 'pause') {
          const miniDuration = dateDifferenceInSeconds(
            timestamp.time,
            timestamps[index + 1].time
          );

          totalDuration += miniDuration;
        }
        if (timestamps[index + 1].type === 'play') {
          const miniDuration = dateDifferenceInSeconds(
            timestamp.time,
            new Date()
          );
          totalDuration += miniDuration;
        }
      }
      if (timestamps[index + 1] === undefined) {
        const miniDuration = dateDifferenceInSeconds(
          timestamp.time,
          new Date()
        );
        totalDuration += miniDuration;
      }
    }
  });

  return Math.floor(totalDuration);
};
