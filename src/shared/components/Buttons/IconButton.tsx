interface IconButtonProps {
  text?: string;
  icon?: string;
  iconSize?: string;
  rotation?: string;
  fontWeight?: string;
  padding?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const IconButton = ({
  text = "Button",
  onClick,
  icon,
  rotation,
  iconSize = "w-5 h-5",
  fontWeight,
  disabled = false,
  padding = 'py-1.5 px-4'
}: IconButtonProps) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`${fontWeight} text-[0.85rem] whitespace-nowrap 
      bg-grayy/60 border border-whitee/20 backdrop-blur-[10px] text-whitee 
      rounded-[10px] flex gap-2 items-center justify-between w-fit ${padding}
      ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-whitee/20 cursor-pointer"}`}
    >
      <p>{text}</p>
      <img
        src={icon}
        className={`${iconSize} white-icon-filter transition-all duration-300 ${rotation}`}
      />
    </div>
  );
};

export default IconButton;
