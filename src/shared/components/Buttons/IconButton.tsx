interface IconButtonProps {
  text?: string
  icon?: string
  rotation?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const IconButton = ({ text = "Button", onClick, icon, rotation }: IconButtonProps) => {
  return (
    <div 
    onClick={onClick}
    className="bg-grayy/60 border border-whitee/20 backdrop-blur-[20px] text-whitee cursor-pointer rounded-[10px] flex gap-2 items-center justify-between w-fit py-1 px-4">
      <p>{text}</p>
      <img src={icon} className={`w-5 h-5 white-icon-filter transition-all duration-300 ${rotation}`}/>
    </div>
  )
}

export default IconButton
