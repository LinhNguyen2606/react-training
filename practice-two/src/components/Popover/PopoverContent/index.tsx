export interface PopoverContentProps {
  id: number;
  text: string;
  onClick?: () => void;
}

const PopoverContent = ({
  id,
  text,
  onClick
}: PopoverContentProps) => {
  return (
    <p
      key={id}
      className="popover__content-text"
      onClick={onClick}>
        {text}
    </p>
  );
};

export default PopoverContent;
