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
