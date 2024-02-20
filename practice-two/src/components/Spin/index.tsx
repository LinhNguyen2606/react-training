import { useEffect, useState } from 'react';

// SCSS
import '@components/Spin/Spin.scss';

interface SpinProps {
  delay?: number;
  size?: number;
  isProcessing: boolean;
}

const Spin = ({
  isProcessing,
  delay,
  size = 20
}: SpinProps) => {
  const [showSpin, setShowSpin] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isProcessing) {
      setShowSpin(false);
      timer = setTimeout(() => {
        setShowSpin(true);
      }, delay);
    }
    setShowSpin(false);

    return () => {
      clearTimeout(timer);
    };
  }, [isProcessing, delay]);

  return (
    <>
      {showSpin && isProcessing && (
        <div className="spin">
          <span className="spin--icon" style={{ width: size, height: size }} />
        </div>
      )}
    </>
  );
};

export default Spin;
