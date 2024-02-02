// Hooks
import { useRef, useState } from 'react';

// Components
import { Button } from '@components';
import PopoverContent, {
  PopoverContentProps,
} from '@components/Popover/PopoverContent';

// SCSS
import '@components/Popover/Popover.scss';

// Icon
import { Plus } from '@assets/icons';

// Custom hook
import { useClickOutside } from '@hooks';

type PopoverPlacement = 'top' | 'center' | 'bottom';

interface PopoverProps {
  buttonText: string;
  onClick?: () => void;
  additionalClass?: string;
  placement?: PopoverPlacement;
  content: PopoverContentProps[];
}

const Popover = ({
  onClick,
  content,
  buttonText,
  additionalClass,
  placement = 'bottom',
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  /**
   * Handle events when the user presses the Popover.
   */
  const handleClick = () => setIsOpen(!isOpen);

  useClickOutside(popoverRef, handleClick, isOpen);

  const popoverContent = isOpen && (
    <div className={`popover__content popover__content--${placement}`}>
      {content.map((item) => (
        <PopoverContent
          key={item.id}
          onClick={onClick}
          {...item}
        />
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
        {buttonText}
      </Button>
      {popoverContent}
    </div>
  );
};

export default Popover;
