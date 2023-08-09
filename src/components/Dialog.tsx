import { Icon } from '@iconify/react';
import * as Dialog from '@radix-ui/react-dialog';

interface DialogProps {
  children: React.ReactNode;
  title: string;
  dialogContentMethods?: {
    onCloseAutoFocus?: (event: Event) => void;
    onInteractOutside?: (event: Event) => void;
  };
}

const DialogTemplate = (props: DialogProps) => {
  const { children, title, dialogContentMethods } = props;

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-dark-900/40 data-[state=open]:animate-overlayShow" />
        <Dialog.Content
          {...dialogContentMethods}
          className="fixed left-[50%] top-[50%] w-88 translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-dark-800 bg-dark-950 px-6 py-8 shadow-xl data-[state=open]:animate-contentShow md:w-100"
        >
          <div className="flex flex-row">
            <Dialog.Title className="mr-auto text-lg font-semibold text-dark-300">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild className="ml-auto">
              <button>
                <Icon
                  icon="maki:cross"
                  className="h-5 w-5 text-dark-500"
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
