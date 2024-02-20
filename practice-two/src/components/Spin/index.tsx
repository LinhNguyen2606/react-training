import { useEffect, useState } from 'react';

// SCSS
import '@components/Spin/Spin.scss';

interface SpinProps {
  size?: number;
  delay?: number;
  isProcessing: boolean;
  style?: React.CSSProperties;
}

const Spin = ({
  size = 20,
  delay,
  isProcessing,
  style
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
        <div className="spin" style={style}>
          <span className="spin--icon" style={{ width: size, height: size }} />
        </div>
      )}
    </>
  );
};

export default Spin;
