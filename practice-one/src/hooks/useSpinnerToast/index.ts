import { useEffect, useState } from 'react';

/**
 * Custom hook for managing spinner and toast state
 * @param {boolean} isProcessing - The progress of spinner and toast
 * @param {number} spinnerDelay - Delay before showing the spinner (default: 1000ms)
 * @param {number} toastDelay - Delay before hiding the toast (default: 2000ms)
 * @returns {object} An object containing showSpinner and toastVisible states
 */
export const useSpinnerToast = (isProcessing: boolean, spinnerDelay = 1000, toastDelay = 2000) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let spinnerTimer: NodeJS.Timeout;
    let hideToastTimer: NodeJS.Timeout;

    // When isProcessing is true (ongoing process)
    if (isProcessing) {
      setShowSpinner(false);
      setToastVisible(false);

      // Set a timer to show the spinner after spinnerDelay milliseconds
      spinnerTimer = setTimeout(() => {
        setShowSpinner(true);
      }, spinnerDelay);
    } else {
      setShowSpinner(false);
      setToastVisible(true);
      
      // Set a timer to hide the toast after toastDelay milliseconds
      hideToastTimer = setTimeout(() => {
        setToastVisible(false);
      }, toastDelay);
    }

    return () => {
      clearTimeout(spinnerTimer);
      clearTimeout(hideToastTimer);
    };
  }, [isProcessing, spinnerDelay, toastDelay]);

  return { showSpinner, toastVisible };
};
