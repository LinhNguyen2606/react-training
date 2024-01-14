import { useEffect, useState } from 'react';

// SCSS
import '@components/Toast/Toast.scss';

type ToastProps = {
  status: 'idle'| 'success' | 'failure';
  delay: number;
};

const Toast = ({ status, delay }: ToastProps) => {
  const [toastVisible, setToastVisible] = useState(false);

  const toastText = status === 'success' ? 'Done' : 'Failed';
  const toastIconClass = status === 'success' ? 'toast--success' : 'toast--failure';

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (status === 'success' || status === 'failure') {
      setToastVisible(true);
      timer = setTimeout(() => {
        setToastVisible(false);
      }, delay);
    } else {
      setToastVisible(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [status, delay]);

  return (
    <>
      {toastVisible && (status === 'success' || status === 'failure') && (
        <div className="toast">
          <span className="text--primary">{toastText}</span>
          <span className={`icon ${toastIconClass}`} />
        </div>
      )}
    </>
  );
};

export default Toast;
