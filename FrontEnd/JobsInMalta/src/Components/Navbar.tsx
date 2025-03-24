import { FaBriefcase, FaSun, FaMoon } from "react-icons/fa";
import globals from "../Hooks/GlobalStates";
import { useAuth } from "../Hooks/UseAuth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const { logout } = useAuth();
  let navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };
  
  const handleLogout = async () => {
    const logoutResult = await logout();
    if (logoutResult) {
      navigate("/login");
    } else {
      console.error("Error logging out");
    }
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Discover", path: "/jobs" },
    { name: "Post", path: "/post-job" },
    { name: "Find", path: "/find-talent" }
  ];

  return (
    <nav className="bg-gradient-to-r from-primary-dark via-primary to-secondary-dark p-4 shadow-lg relative">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto relative">
        <div className="flex items-center justify-between">
          {/* Logo && brand */}
          <Link to="/" className="flex items-center">
            <FaBriefcase className="text-white text-2xl transform hover:scale-110 transition-transform" />
            <h5 className="mx-2 text-white font-bold">JobsForMalta</h5>
          </Link>

          {/* Dark mode toggle and sign in */}
          <div className="md:order-3 flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isDark ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-200" />}
            </button>
                {/* Condition to render link or button by global state login status */}
            {globals.useLoggedIn("loggedIn") ? (
              <button 
                onClick={handleLogout}
                className="bg-white text-primary hover:text-primary-dark px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-glow"
              >
                Sign out
              </button>
            ) : (
              <Link 
                to="/login" 
                className="bg-white text-primary hover:text-primary-dark px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-glow"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* Hamburger Menu (OPEN/CLOSE NAVBAR) */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* Navigation Links with enhanced hover effects */}
          <div className={`${isNavOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-primary/95 md:bg-transparent backdrop-blur-sm`}>
            <ul className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 p-4 md:p-0">
              {navItems.map((item) => (
                <li key={item.name} className="text-center">
                  <Link 
                    to={item.path} 
                    className="text-white font-medium hover:text-white/90 block py-2 relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;