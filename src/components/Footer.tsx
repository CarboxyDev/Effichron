import Link from 'next/link';
import { Logo } from './Logo';
import { BetaBadge } from './Other';

const Footer = () => {
  return (
    <>
      <footer>
        <div className="mt-100 h-px bg-dark-900"></div>
        <div className="mx-auto my-10 flex w-fit flex-col items-center">
          <p className="text-dark-200">
            <Link href="/">
              <Logo className="mr-2 inline" hoverAnimation={true} />
            </Link>
            <span className="text-medium mr-2">Effichron</span>
            <BetaBadge />
          </p>
          <p className="mt-6 font-light text-dark-500">
            © 2023 CarboxyDev . All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
