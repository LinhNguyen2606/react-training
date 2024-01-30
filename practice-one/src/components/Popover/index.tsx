// Hooks
import {
  useEffect,
  useRef,
  useState
} from 'react';

// Component
import Button from '@components/Button';

// SCSS
import '@components/Popover/Popover.scss';

export type PopoverContent = {
  id: number;
  text: string;
};

type PopoverProps = {
  content: PopoverContent[];
  onClick?: () => void;
};

const Popover = ({ content, onClick }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClick = () => setIsOpen(!isOpen);

  const handleClickOutside = (e: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target as Node))
      setIsOpen(false);
  };

  return (
    <div className="popover" ref={popoverRef}>
      <Button
        variants="primary"
        size="lg"
        additionalClass="drawer"
        onClick={handleClick}
      >
        <span className="btn__text">+ New</span>
      </Button>

      {isOpen && (
        <div className="popover__content">
          {content.map((item) => (
            <p
              key={item.id}
              className="popover__content-text"
              onClick={onClick}
            >
              {item.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Popover;
