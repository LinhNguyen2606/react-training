// Hooks
import { ReactNode, useEffect, useRef, useState } from 'react';

// Components
import Button from '@components/Button';
import PopoverContent, {
  PopoverContentProps,
} from '@components/Popover/PopoverContent';

// SCSS
import '@components/Popover/Popover.scss';

// Icon
import { Plus } from '@assets/icons';

type PopoverPlacement = 'top' | 'center' | 'bottom';

interface PopoverProps {
  children: ReactNode;
  additionalClass?: string;
  placement?: PopoverPlacement;
  content: PopoverContentProps[];
}

const Popover = ({
  children,
  content,
  additionalClass,
  placement = 'bottom',
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  /**
   * Handle events when the user presses the Popover.
   */
  const handleClick = () => setIsOpen(!isOpen);

  /**
   * Handles the click outside of the popover.
   * @param e - The MouseEvent object representing the click event.
   */
  const handleClickOutside = (e: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target as Node))
      setIsOpen(false);
  };

  const popoverContent = isOpen && (
    <div className={`popover__content popover__content--${placement}`}>
      {content.map((item) => (
        <PopoverContent key={item.id} {...item} />
      ))}
    </div>
  );

  return (
    <div className={`popover ${additionalClass}`} ref={popoverRef}>
      <Button
        variants="primary"
        size="lg"
        onClick={handleClick}
        startIcon={Plus}
      >
        {children}
      </Button>
      {popoverContent}
    </div>
  );
};

export default Popover;
