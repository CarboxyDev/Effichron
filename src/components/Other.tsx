export const BetaBadge = () => {
  return (
    <>
      <span className="rounded-[4px] border border-transparent bg-emerald-500 px-3 py-1 text-xs font-semibold transition delay-300 duration-300 ease-in hover:border-emerald-500 hover:bg-transparent hover:text-emerald-500">
        BETA
      </span>
    </>
  );
};

interface BadgeProps {
  text: string;
  styles?: {
    backgroundColor: string;
    color: string;
  };
}

export const Badge = (props: BadgeProps) => {
  const { text, styles } = props;

  return (
    <>
      <span className="rounded-[4px] border border-transparent bg-violet-500 px-3 py-1 text-xs font-light transition delay-300 duration-300 ease-in hover:border-violet-500 hover:bg-transparent hover:text-violet-500">
        {text}
      </span>
    </>
  );
};

export const AlertMobile = () => {
  // Will be created in future
};
