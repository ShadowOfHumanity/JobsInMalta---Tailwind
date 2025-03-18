import { FaBriefcase, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const WebFooter = () => {
  const currentYear = new Date().getFullYear();
  
  // Navigation links with proper routes
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Employers", path: "/employers" },
    { name: "Post a Job", path: "/post-job" },
    { name: "Find Talent", path: "/find-talent" },
    { name: "FAQ", path: "/faq" },
  ];
  
  return (
    <footer className="bg-gradient-to-r from-primary-dark via-primary to-secondary-dark text-white relative mt-16">
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center mb-4">
              <FaBriefcase className="text-white text-2xl mr-2" />
              <h3 className="text-xl font-bold">JobsForMalta</h3>
            </Link>
            <p className="text-gray-200 text-sm leading-relaxed">
              Connecting job seekers and employers in Malta with a modern, secure platform 
              designed to make the hiring process simpler and more efficient.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-white/20 pb-2">Explore</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-200 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2 text-xs">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-white/20 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-gray-300 mt-1 mr-3" />
                <span className="text-gray-200">No Offices Yet</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-gray-300 mr-3" />
                <span className="text-gray-200">+356 7709 6987</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-gray-300 mr-3" />
                <a href="mailto:Darianbakerbray@gmail.com" className="text-gray-200 hover:text-white transition-colors">
                  Darianbakerbray@gmail.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-white/20 pb-2">Stay Updated</h3>
            <p className="text-gray-200 text-sm">Subscribe to our newsletter for the latest job opportunities.</p>
            <div className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-white text-white placeholder-gray-300"
              />
              <button className="bg-white text-primary hover:bg-gray-100 transition-colors px-4 py-2 rounded-lg font-medium">
                Subscribe
              </button>
            </div>
          </div>
          
        </div>
        
        {/* Social Links - These go to external sites so regular a tags are fine */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
              <FaFacebook className="text-white" />
            </a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
              <FaTwitter className="text-white" />
            </a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
              <FaLinkedin className="text-white" />
            </a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
              <FaInstagram className="text-white" />
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-center md:text-right text-gray-300 text-sm">
            <p>© {currentYear} JobsForMalta. All rights reserved.</p>
            <div className="flex justify-center md:justify-end space-x-4 mt-2">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WebFooter;