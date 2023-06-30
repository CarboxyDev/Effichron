import { toast } from 'react-hot-toast';

type notifType = 'success' | 'failure' | 'warning';

const toastStyle = {
  background: '#27272a',
  color: '#e4e4e7',
};

export const notify = (message: string, type: notifType) => {
  if (type === 'success') {
    toast.success(message, {
      style: toastStyle,
    });
  } else if (type === 'failure') {
    toast.error(message, {
      style: toastStyle,
    });
  } else if (type === 'warning') {
    toast(message, {
      icon: '⚠️',
      style: toastStyle,
    });
  }
};
