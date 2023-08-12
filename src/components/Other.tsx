export const BetaBadge = () => {
  return (
    <>
      <span className="rounded-[4px] border border-violet-500 bg-transparent px-[6px] py-[2px] text-xs text-violet-500 transition delay-300 duration-300 ease-in hover:border-transparent hover:bg-violet-500 hover:text-white">
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
      <span className="rounded-[4px] border border-transparent bg-primary-500 px-3 py-1 text-xs font-light transition delay-300 duration-300 ease-in hover:border-primary-500 hover:bg-transparent hover:text-primary-500">
        {text}
      </span>
    </>
  );
};

export const AlertMobile = () => {
  // Will be created in future
};
