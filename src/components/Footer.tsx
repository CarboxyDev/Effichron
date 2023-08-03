const Footer = () => {
  return (
    <>
      <footer>
        <div className="mx-4 mt-100 h-px bg-zinc-900"></div>
        <div className="mx-auto my-10 flex w-fit flex-col items-center">
          <p className="text-zinc-200">
            Productivity Tracker{' '}
            <span className="ml-4 rounded-[4px] bg-emerald-500 px-3 py-1 text-xs font-semibold">
              BETA
            </span>
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
