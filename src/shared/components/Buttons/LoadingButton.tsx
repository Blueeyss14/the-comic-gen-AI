interface LoadingButtonProps {
  text?: string;
  icon?: string;
  iconSize?: string;
  rotation?: string;
  fontWeight?: string;
  padding?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const LoadingButton = ({
  text = "Button",
  onClick,
  fontWeight,
  disabled = true,
  padding = "py-1.5 px-4",
}: LoadingButtonProps) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`${fontWeight} text-[0.85rem] whitespace-nowrap
      bg-grayy/60 border border-whitee/20 backdrop-blur-[10px] text-whitee 
      rounded-[10px] flex gap-2 items-center justify-between w-fit ${padding}
      ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-whitee/20 cursor-pointer"}`}
    >
      <p>{text}</p>
      <div className="w-4 h-4 border-2 border-gray-200 border-t-grayy rounded-full animate-spin" />
    </div>
  );
};

export default LoadingButton;
