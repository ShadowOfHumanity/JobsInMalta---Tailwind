import { FaBriefcase } from "react-icons/fa"

const TitleLogo = () => {
  return (
    <div className="flex items-center">
        <FaBriefcase className="text-white text-2xl transform hover:scale-110 transition-transform" />
        <h5 className="mx-2 text-white font-bold">JobsForMalta</h5>
    </div>
  )
}

export default TitleLogo