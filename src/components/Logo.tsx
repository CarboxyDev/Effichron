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
        className={className}
        src="/logo.png"
        alt="logo"
      />
    </>
  );
};
