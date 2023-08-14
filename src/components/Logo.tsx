import { cn } from '@/utils/util';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: number;
  hoverAnimation?: boolean;
}

export const Logo = (props: LogoProps) => {
  const { className, size, hoverAnimation } = props;

  return (
    <>
      <Image
        height={size || 32}
        width={size || 32}
        className={cn(
          className,
          hoverAnimation && 'hover:rotate-180',
          'transition delay-300 duration-1000 ease-in-out hover:cursor-pointer'
        )}
        src="/logo.png"
        alt="logo"
      />
    </>
  );
};
