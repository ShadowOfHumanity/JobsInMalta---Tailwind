import { ReactNode } from "react"

const PButton = ({children, className} : {children?: ReactNode, className?: string}) => {
  return (
    <button type="button" className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${className || ''}`}>
      {children || "Button"}
    </button>
  )
}

export default PButton