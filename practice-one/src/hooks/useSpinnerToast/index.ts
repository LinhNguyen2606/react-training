import { useEffect, useState } from 'react';

/**
 * Custom hook for managing spinner and toast state
 * @param {number} spinnerDelay - Delay before showing the spinner (default: 1000ms)
 * @param {number} toastDelay - Delay before hiding the toast (default: 2000ms)
 * @returns {object} An object containing showSpinner and toastVisible states
 */
export const useSpinnerToast = (spinnerDelay = 1000, toastDelay = 2000) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const spinnerTimer = setTimeout(() => {
      setShowSpinner(false);
      setToastVisible(true);
    }, spinnerDelay);

    const hideToastTimer = setTimeout(() => {
      setToastVisible(false);
    }, toastDelay);

    return () => {
      clearTimeout(spinnerTimer);
      clearTimeout(hideToastTimer);
    };
  }, [showSpinner, spinnerDelay, toastDelay]);

  return { showSpinner, toastVisible };
};
