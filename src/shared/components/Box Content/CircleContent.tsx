interface CircleContentProps {
  size?: string
}

const CircleContent = ({size = 'w-2 h-2'} : CircleContentProps) => {
  return (
    <div className={`bg-white rounded-full ${size}`}>

    </div>
  )
}

export default CircleContent
