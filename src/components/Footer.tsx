import { BetaBadge } from './Other';

const Footer = () => {
  return (
    <>
      <footer>
        <div className="mt-100 h-px bg-zinc-900"></div>
        <div className="mx-auto my-10 flex w-fit flex-col items-center">
          <p className="mr-3 text-zinc-200 md:mr-4">
            Effichron <BetaBadge />
          </p>
          <p className="mt-6 font-light text-zinc-500">
            © 2023 CarboxyDev . All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
