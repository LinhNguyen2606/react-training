// SCSS
import '@components/Progress/Progress.scss';

import { useEffect, useState } from 'react';

type ProgressProps = {
  isProcessing: boolean;
  delay: number;
};

const Progress = ({ isProcessing, delay }: ProgressProps) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isProcessing) {
      setShowSpinner(false);
      timer = setTimeout(() => {
        setShowSpinner(true);
      }, delay)
    } else {
      setShowSpinner(false);
    }

    return () => {
      clearTimeout(timer);
    };

  }, [isProcessing, delay])


  return (
    <>
      {showSpinner && isProcessing && (
        <div className="spinner">
          <span className="icon spinner--icon" />
        </div>
      )}
    </>
  );
};

export default Progress;
