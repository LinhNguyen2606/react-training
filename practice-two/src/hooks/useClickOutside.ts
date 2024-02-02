import { RefObject, useEffect } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  isOpen: boolean
) => {
  /**
   * Handles the click outside of the popover.
   * @param e - The MouseEvent object representing the click event.
   */
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) callback();
  };

  useEffect(() => {
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
};
