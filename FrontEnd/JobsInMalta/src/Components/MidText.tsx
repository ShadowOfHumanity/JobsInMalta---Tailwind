import { ReactNode } from "react"

const MidText = ({children} : {children?: ReactNode}) => {
  return (
    <div className="md:flex justify-center my-12">
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text 
                     bg-gradient-to-r from-primary-light via-secondary-light to-primary 
                     drop-shadow-sm animate-fade-in text-center dark:from-primary-light 
                     dark:via-secondary-light dark:to-primary-light">
        {children}
      </h1>
    </div>
  )
}

export default MidText