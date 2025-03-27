import { useState, useRef, useEffect } from "react";
import { FaUser, FaUserCircle, FaMoon, FaSun, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthSession } from "../Hooks/AuthContext";

// Import a default avatar - you'll need to create an assets folder and add this image
import DefaultAvatar from "../assets/DefaultAvatar.jpg";
import { useAuth } from "../Hooks/UseAuth";

interface ProfileCircleProps {
  avatarUrl?: string;
  toggleDarkMode?: () => void;
  isDark?: boolean;
}

const ProfileCircle = ({ 
  avatarUrl, 
  toggleDarkMode,
  isDark = false
}: ProfileCircleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthSession();

  const { logout } = useAuth();
  let navigate = useNavigate();


  const handleLogout = async () => {
    const logoutResult = await logout();
    if (logoutResult) {
      navigate("/login");
    } else {
      console.error("Error logging out");
    }
  }


  // Handle opening and closing with animations
  useEffect(() => {
    if (isOpen) {
      setShowDropdown(true);
      // Small delay to ensure the DOM is updated before starting animation
      setTimeout(() => setIsAnimating(true), 10);
    } else if (!isOpen && showDropdown) {
      setIsAnimating(false);
      // Wait for animation to complete before hiding the dropdown
      const timer = setTimeout(() => setShowDropdown(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Image Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden border-2 border-white hover:border-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img 
          src={avatarUrl || DefaultAvatar} 
          alt="User Profile" 
          className="h-full w-full object-cover"
          onError={(e) => {
            // Fallback to icon if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.insertAdjacentHTML('afterend', '<div class="flex items-center justify-center h-full w-full bg-gray-200 dark:bg-gray-700"><svg class="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>');
          }}
        />
      </button>

      {/* Dropdown Menu with animations */}
      {showDropdown && (
        <div 
          className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700 transition-all duration-300 origin-top-right ${
            isAnimating 
              ? 'opacity-100 transform scale-100 translate-y-0' 
              : 'opacity-0 transform scale-95 -translate-y-2'
          }`}
          style={{ transformOrigin: 'top right' }}
        >
          {/* User info section */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.user_role === 'employer' ? 'Employer Account' : 'Job Seeker'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              ID: {user?.user_id || 'Guest'}
            </p>
          </div>

          {/* Menu items with staggered animation */}
          <Link 
            to="/profile" 
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            style={{ 
              animation: isAnimating ? 'menuItemAppear 0.4s ease forwards' : 'none',
              opacity: isAnimating ? 1 : 0,
              transform: isAnimating ? 'translateY(0)' : 'translateY(-10px)',
              animationDelay: '0.05s'
            }}
          >
            <div className="flex items-center">
              <FaUserCircle className="mr-2" />
              Public Profile
            </div>
          </Link>
          
          <Link 
            to="/account" 
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            style={{ 
              animation: isAnimating ? 'menuItemAppear 0.4s ease forwards' : 'none',
              opacity: isAnimating ? 1 : 0,
              transform: isAnimating ? 'translateY(0)' : 'translateY(-10px)',
              animationDelay: '0.1s'
            }}
          >
            <div className="flex items-center">
              <FaUser className="mr-2" />
              Account Settings
            </div>
          </Link>
          
          <button 
            onClick={() => {
              if (toggleDarkMode) toggleDarkMode();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            style={{ 
              animation: isAnimating ? 'menuItemAppear 0.4s ease forwards' : 'none',
              opacity: isAnimating ? 1 : 0,
              transform: isAnimating ? 'translateY(0)' : 'translateY(-10px)',
              animationDelay: '0.15s'
            }}
          >
            <div className="flex items-center">
              {isDark ? <FaSun className="mr-2 text-yellow-400" /> : <FaMoon className="mr-2 text-gray-400" />}
              Appearance: {isDark ? 'Light Mode' : 'Dark Mode'}
            </div>
          </button>
          
          <Link 
            to="/settings" 
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-t border-gray-200 dark:border-gray-700"
            style={{ 
              animation: isAnimating ? 'menuItemAppear 0.4s ease forwards' : 'none',
              opacity: isAnimating ? 1 : 0,
              transform: isAnimating ? 'translateY(0)' : 'translateY(-10px)',
              animationDelay: '0.2s'
            }}
          >
            <div className="flex items-center">
              <FaCog className="mr-2" />
              Settings
            </div>
          </Link>
          
          {/* Logout Option */}
          <button 
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-gray-200 dark:border-gray-700"
            style={{ 
              animation: isAnimating ? 'menuItemAppear 0.4s ease forwards' : 'none',
              opacity: isAnimating ? 1 : 0,
              transform: isAnimating ? 'translateY(0)' : 'translateY(-10px)',
              animationDelay: '0.25s'
            }}
          >
            <div className="flex items-center">
              <FaSignOutAlt className="mr-2" />
              Logout
            </div>
          </button>
        </div>
      )}

      {/* keyframes anim --> menu items */}
      <style>{`
        @keyframes menuItemAppear {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileCircle;