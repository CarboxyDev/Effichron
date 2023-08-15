import { Icon } from '@iconify/react';

export const FeaturesSection = () => {
  return (
    <>
      <div className="flex flex-col">
        <h3 className="text-gradient-1 mx-auto inline text-3xl font-semibold md:text-6xl">
          Loaded with features
        </h3>
      </div>
      <div className="mt-24 flex justify-center md:mt-30">
        <div className="grid grid-cols-1 place-items-center gap-y-8 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-0 xl:gap-x-8">
          <div className="h-full w-80 rounded-xl border border-dark-800 bg-dark-900 shadow-md lg:w-72 xl:w-80">
            <div className="flex flex-col p-8">
              <div className="flex h-18 w-18 items-center justify-center rounded-lg bg-blue-500">
                <Icon icon="ph:hourglass-fill" className="h-9 w-9 text-white" />
              </div>
              <div className="mt-12">
                <h4 className="text-xl font-medium text-white">
                  Always-On Timer
                </h4>
                <p className="mt-4 text-base leading-7 text-dark-400">
                  Effichron&apos;s Always-On Timer ensures your tasks are always
                  tracked, even when you close the website. Seamlessly monitor
                  your progress without any interruptions.
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col lg:gap-y-6 xl:gap-y-8">
            <div className="w-80 rounded-xl border border-dark-800 bg-dark-900 shadow-md lg:w-72 xl:w-80">
              <div className="flex flex-col p-8">
                <div className="flex h-18 w-18 items-center justify-center rounded-lg bg-blue-500">
                  <Icon icon="mdi:sync" className="h-9 w-9 text-white" />
                </div>
                <div className="mt-12">
                  <h4 className="text-xl font-medium text-white">Easy Sync</h4>
                  <p className="mt-4 text-base leading-7 text-dark-400">
                    Effichron&apos;s Easy Sync keeps tasks in sync across
                    multiple devices with the tap of a button.
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden h-full w-80 items-center justify-center rounded-xl border border-dark-800 bg-dark-900 shadow-md lg:flex lg:w-72 xl:w-80">
              <span className="text-gradient-1 text-2xl font-medium">
                and many more...
              </span>
            </div>
          </div>
          <div className="h-full w-80 rounded-xl border border-dark-800 bg-dark-900 shadow-md lg:w-72 xl:w-80">
            <div className="flex flex-col p-8">
              <div className="flex h-18 w-18 items-center justify-center rounded-lg bg-blue-500">
                <Icon icon="mdi:history" className="h-9 w-9 text-white" />
              </div>
              <div className="mt-12">
                <h4 className="text-xl font-medium text-white">
                  Sessions History
                </h4>
                <p className="mt-4 text-base leading-7 text-dark-400">
                  Effichron&apos;s Sessions History feature empowers you to
                  access and review all your saved sessions effortlessly. Dive
                  into detailed overviews of past task progress and gain crucial
                  insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
