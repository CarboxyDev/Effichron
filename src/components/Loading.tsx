import ClipLoader from 'react-spinners/ClipLoader';

interface LoadingSpinnerProps {
  size?: number;
}

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const size = props.size ? props.size : 48;
  return <ClipLoader color="#8b5cf6" size={size} />;
};
