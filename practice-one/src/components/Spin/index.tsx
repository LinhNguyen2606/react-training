// SCSS
import '@components/Spin/Spin.scss';

import { useEffect, useState } from 'react';

type SpinProps = {
  isProcessing: boolean;
  delay: number;
};

const Spin = ({ isProcessing, delay }: SpinProps) => {
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
        <div className="spin">
          <span className="icon spin--icon" />
        </div>
      )}
    </>
  );
};

export default Spin;
