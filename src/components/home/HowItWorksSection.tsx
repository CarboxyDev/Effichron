import { cn } from '@/utils/util';
import { IconifyIcon } from '../Icon';

interface ExplanationCardProps {
  order: number;
  title: string;
  content: string;
  iconName: string /** Only supports Iconify icons */;
}

export const ExplanationCard = (props: ExplanationCardProps) => {
  const { title, content, iconName, order } = props;

  return (
    <>
      <div
        className={cn(
          'w-80 rounded-xl border border-dark-800 bg-dark-900 shadow-md transition duration-500 ease-in-out hover:scale-105 hover:border-dark-800 md:w-72 xl:w-88 2xl:w-80',
          order === 4 && 'md:row-start-2 xl:row-auto'
        )}
      >
        <div className="flex flex-col p-8">
          <div
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-full bg-primary-400'
            )}
          >
            <IconifyIcon
              icon={iconName}
              className={cn('h-8 w-8 text-primary-900')}
            />
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
      order: 1,
      title: 'Create a task',
      iconName: 'fluent:tab-new-24-filled', // Alternative icon: carbon:new-tab
      content:
        'Figure out the task you want to track and create it in the tasks page',
    },
    {
      order: 2,
      title: 'Time your task',
      iconName: 'mdi:clock-outline',
      content:
        'Click your task and start the timer to calculate how much time you spend on it',
    },
    {
      order: 3,
      title: 'Repeat for all tasks',
      iconName: 'ic:outline-loop',
      content:
        'Create and time all the tasks you want to track. These may be tasks like Working, Learning, etc.',
    },
    {
      order: 4,
      title: 'Save your progress',
      iconName: 'mingcute:save-line',
      content:
        "When you're done with your tasks for the day, save your progress as a session",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-4">
        {explanationCards.map((card) => {
          return (
            <ExplanationCard
              key={card.order}
              order={card.order}
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
      <div className="flex flex-col">
        <h3 className="text-gradient-1 mx-auto inline text-3xl font-semibold md:text-6xl">
          How does it work?
        </h3>
        <div className="mt-24 flex justify-center md:mt-30">
          <WorkingExplanationGrid />
        </div>
      </div>
    </>
  );
};
