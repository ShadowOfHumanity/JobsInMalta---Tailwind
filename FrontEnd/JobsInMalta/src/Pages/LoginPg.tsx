import AuthForm from "../Components/AuthForm"
import { Link } from "react-router-dom"
import { FaBriefcase } from "react-icons/fa"

const LoginPg = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 to-secondary-light/10 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center px-4 py-12">
      {/* Logo */}
      <div className="mb-8">
        <Link to="/" className="flex items-center">
          <FaBriefcase className="text-primary dark:text-primary-light text-3xl mr-2" />
          <h2 className="text-2xl font-bold text-primary dark:text-primary-light">JobsForMalta</h2>
        </Link>
      </div>

      {/* Card with form */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6">
          <h1 className="text-2xl font-bold text-white text-center">Welcome Back</h1>
          <p className="text-white/80 text-center mt-1">Sign in to your account</p>
        </div>
        <AuthForm type="login" />
      </div>

      {/* Registration prompt */}
      <div className="mt-6 text-gray-600 dark:text-gray-400">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary dark:text-primary-light font-medium hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  )
}

export default LoginPg