import { ClipLoader, PropagateLoader } from 'react-spinners';

interface LoadingSpinnerProps {
  size?: number;
}

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const size = props.size ? props.size : 48;
  return <ClipLoader color="#8b5cf6" size={size} />;
};

export const LoadingPropagateSpinner = (props: LoadingSpinnerProps) => {
  const size = props.size ? props.size : 48;
  return <PropagateLoader color="#8b5cf6" size={size} />;
};
