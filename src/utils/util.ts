import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const randint = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface TimeFormat {
  hours: number;
  minutes: number;
  seconds: number;
}

export function secondsToTimeFormat(seconds: number): TimeFormat {
  const date = new Date(0);
  date.setSeconds(seconds);
  const dateAsString = date.toISOString().substring(11, 19);
  let [hr, min, sec] = dateAsString.split(':');

  return {
    hours: parseInt(hr),
    minutes: parseInt(min),
    seconds: parseInt(sec),
  };
}

export function secondsToAlphaTimeFormat(
  seconds: number,
  includeSeconds?: boolean
): string {
  if (includeSeconds === undefined) {
    includeSeconds = true;
  }
  const date = new Date(0);
  date.setSeconds(seconds);
  const dateAsString = date.toISOString().substring(11, 19);
  let [hr, min, sec] = dateAsString.split(':');

  if (parseInt(hr) === 0) return `${parseInt(min)}m`;

  if (parseInt(hr) === 0 && parseInt(min) === 0 && includeSeconds)
    return `${parseInt(sec)}s`;

  return `${parseInt(hr)}h ${parseInt(min)}m`;
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const dateToAlphaDayFormat = (date: Date): string => {
  const day = date.getDate();
  const month = months[date.getMonth()];

  if (day < 10) {
    return `0${day} ${month}`;
  }

  return `${day} ${month}`;
};
