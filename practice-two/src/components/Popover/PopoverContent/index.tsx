export interface PopoverContentProps {
  id: number;
  label: string;
  onClick?: () => void;
}

const PopoverContent = ({
  id,
  label,
  onClick
}: PopoverContentProps) => {
  return (
    <p
      key={id}
      className="popover__content-text"
      onClick={onClick}>
        {label}
    </p>
  );
};

export default PopoverContent;
