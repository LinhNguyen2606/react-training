import { useEffect, useState } from 'react';

// SCSS
import '@components/Toast/Toast.scss';

interface ToastProps {
  delay: number;
  size?: number;
  status: 'idle' | 'success' | 'failure';
};

const Toast = ({ delay, size = 20, status }: ToastProps) => {
  const [toastVisible, setToastVisible] = useState(false);

  const toastText = status === 'success' ? 'Done' : 'Failed';
  const toastIconClass =
    status === 'success' ? 'toast--success' : 'toast--failure';

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
          <span style={{ fontSize: size }} className="text--primary">
            {toastText}
          </span>
          <span
            className={`${toastIconClass}`}
            style={{ backgroundSize: size, width: size, height: size }}
          />
        </div>
      )}
    </>
  );
};

export default Toast;
