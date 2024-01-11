// SCSS
import '@components/FeedBack/Progress/Progress.scss';

// Custom hook
import { useSpinnerToast } from '@hooks';

type ProgressType = 'idle' | 'processing' | 'success' | 'failed';

type ProgressProps = {
  status: ProgressType;
};

const Progress = ({ status }: ProgressProps) => {
  const isProcessing = status === 'processing';
  const { showSpinner, toastVisible } = useSpinnerToast(isProcessing);

  const toastText = status === 'success' ? 'Done' : 'Failed';
  const toastIconClass = status === 'success' ? 'toast--success' : 'toast--failed';

  return (
    <>
      {showSpinner && status === 'processing' && (
        <div className="spinner">
          <span className="icon spinner--icon" />
        </div>
      )}

      {toastVisible && (status === 'success' || status === 'failed') && (
        <div className="toast">
          <span className="text--primary">{toastText}</span>
          <span className={`icon ${toastIconClass}`} />
        </div>
      )}
    </>
  );
};

export default Progress;
