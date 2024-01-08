import '@components/FeedBack/Progress/Progress.scss';

// Custom hook
import { useSpinnerToast } from '@hooks/index';

type ProgressProps = {
  successMessage?: string;
};

const Progress = ({ successMessage }: ProgressProps) => {
  const { showSpinner, toastVisible } = useSpinnerToast();

  return (
    <>
      {showSpinner && (
        <div className="spinner">
          <span className="spinner--icon"></span>
        </div>
      )}

      {toastVisible && (
        <div className="toast">
          <span className="primary__text">{successMessage}</span>
          <span className="toast--icon"></span>
        </div>
      )}
    </>
  );
};

export default Progress;
