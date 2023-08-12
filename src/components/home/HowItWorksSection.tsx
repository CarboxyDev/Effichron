import { Icon } from '@iconify/react';

interface ExplanationCardProps {
  title: string;
  content: string;
  iconName: string /** Only supports Iconify icons */;
}

export const ExplanationCard = (props: ExplanationCardProps) => {
  const { title, content, iconName } = props;

  return (
    <>
      <div className="h-75 w-80 rounded-xl border border-dark-700 bg-dark-900">
        <div className="flex flex-col p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-400">
            <Icon icon={iconName} className="h-8 w-8 text-primary-900" />
          </div>
          <div className="mt-10">
            <h4 className="text-xl font-medium text-dark-200">{title}</h4>
            <p className="mt-3 text-base leading-7 text-dark-400">{content}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const WorkingExplanationGrid = () => {
  /** The order of these cards matters */
  const explanationCards: ExplanationCardProps[] = [
    {
      title: 'Create a task',
      iconName: 'fluent:tab-new-24-filled', // Alternative icon: carbon:new-tab
      content:
        'Figure out the task you want to track and create it in the taskspage',
    },
    {
      title: 'Time your task',
      iconName: 'mdi:clock-outline',
      content:
        'Click your task and start the timer to calculate how much time you spend on it',
    },
    {
      title: 'Save your progress',
      iconName: 'material-symbols:save-outline',
      content:
        "When you're done with your tasks for the day, save your progress as a session",
    },
    {
      title: 'Repeat for all tasks',
      iconName: 'ic:outline-loop',
      content:
        'Create and time all the tasks you want to track. These may be tasks like Working, Learning, etc.',
    },
  ];
  return (
    <>
      <div className="grid w-fit grid-cols-1 place-items-center gap-16 align-middle md:grid-cols-2 md:gap-50">
        {explanationCards.map((card, index) => {
          return (
            <ExplanationCard
              key={index}
              title={card.title}
              content={card.content}
              iconName={card.iconName}
            />
          );
        })}
      </div>
    </>
  );
};

export const HowItWorksSection = () => {
  return (
    <>
      <div className="mt-100">
        <h3 className="magic-text text-3xl font-semibold md:text-[44px]">
          How does it work?
        </h3>
        <div className="mt-30 flex justify-center">
          <WorkingExplanationGrid />
        </div>
      </div>
    </>
  );
};
