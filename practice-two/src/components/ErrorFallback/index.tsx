import { FallbackProps } from 'react-error-boundary';

// SCSS
import '@components/ErrorFallback/ErrorFallback.scss';

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="error">
      <p>Something went wrong:</p>
      <pre className="error__pre-text">{error.message}</pre>
      <button onClick={resetErrorBoundary} className="error__btn">
        Try again
      </button>
    </div>
  );
};

export default ErrorFallback;
