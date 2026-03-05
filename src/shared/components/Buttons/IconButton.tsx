interface IconButtonProps {
  text?: string;
  icon?: string;
  iconSize?: string;
  rotation?: string;
  fontWeight?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const IconButton = ({
  text = "Button",
  onClick,
  icon,
  rotation,
  iconSize = "w-5 h-5",
  fontWeight,
}: IconButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`${fontWeight} whitespace-nowrap bg-grayy/60 hover:bg-whitee/20 border border-whitee/20 backdrop-blur-[20px] text-whitee cursor-pointer rounded-[10px] flex gap-2 items-center justify-between w-fit py-1 px-4`}
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
