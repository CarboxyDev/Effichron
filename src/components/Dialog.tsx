import { Icon } from '@iconify/react';
import * as Dialog from '@radix-ui/react-dialog';

interface DialogProps {
  children: React.ReactNode;
  title: string;
  contentMethods?: {
    onCloseAutoFocus?: (event: Event) => void;
  };
}

const DialogTemplate = (props: DialogProps) => {
  const { children, title, contentMethods } = props;

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-zinc-900/40 data-[state=open]:animate-overlayShow" />
        <Dialog.Content
          {...contentMethods}
          className="fixed left-[50%] top-[50%] w-100 translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-8 shadow-xl data-[state=open]:animate-contentShow"
        >
          <div className="flex flex-row">
            <Dialog.Title className="mr-auto text-lg font-semibold text-zinc-300">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild className="ml-auto">
              <button>
                <Icon
                  icon="maki:cross"
                  className="h-5 w-5 text-zinc-500"
                ></Icon>
              </button>
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
};

export default DialogTemplate;
