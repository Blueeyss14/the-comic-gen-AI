import type { ReactNode } from "react"

interface BoxContentProps {
  children: ReactNode
}

const BoxContent = ({ children }: BoxContentProps) => {
  return (
    <div className="absolute bottom-full text-[0.85rem] bg-grayy/60 border border-whitee/20 backdrop-blur-[3px] rounded-[10px] mb-2 overflow-clip cursor-pointer whitespace-nowrap">
      {children}
    </div>
  )
}

export default BoxContent