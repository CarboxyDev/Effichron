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
  const hr = Math.floor(seconds / 3600);
  const min = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  return {
    hours: hr,
    minutes: min,
    seconds: sec,
  };
}

export function secondsToAlphaTimeFormat(
  seconds: number,
  includeSeconds: boolean
): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours === 0 && !includeSeconds) {
    return `${minutes}m`;
  }

  if (hours === 0 && minutes !== 0 && includeSeconds) {
    return `${minutes}m`;
  }

  if (hours === 0 && minutes === 0 && includeSeconds) {
    return `${remainingSeconds}s`;
  }

  return `${hours}h ${minutes}m`;
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

export const dateDifference = (date1: Date, date2: Date): number => {
  const diffInMs = Math.abs(+date1 - +date2); // weird typescript hack because typescript hates type coercion
  return diffInMs / (1000 * 60 * 60 * 24);
};

export const dateDifferenceInSeconds = (date1: Date, date2: Date): number => {
  // ! WARNING: The new Date() constructors have to be used otherwise the date formats somehow get mismatched and result in a NaN value
  const diffInMs = Math.abs(+new Date(date1) - +new Date(date2));
  return diffInMs / 1000;
};
