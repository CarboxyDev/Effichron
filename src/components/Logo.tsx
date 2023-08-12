import { cn } from '@/utils/util';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo = (props: LogoProps) => {
  const { className, size } = props;

  return (
    <>
      <Image
        height={size || 32}
        width={size || 32}
        className={cn(
          className,
          'transition delay-300 duration-1000 ease-in-out hover:rotate-180'
        )}
        src="/logo.png"
        alt="logo"
      />
    </>
  );
};
