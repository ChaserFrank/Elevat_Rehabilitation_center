import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../App.jsx';
import { Menu, X, User, LogOut } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
     <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-5">
            <div className="w-15 h-15 bg-white rounded-full flex items-center justify-center shadow-md">
              <img 
                src="/Logo.jpg" 
                alt="Elevat Rehab Logo" 
                className="w-10 h-10 object-contain rounded-full"
              />
            </div>
            <span className="text-2xl font-bold text-blue-600">Elevat Rehabilitation Center</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className={`font-medium transition-colors duration-300 ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Home
            </Link>
            <Link to="/services" className={`font-medium transition-colors duration-300 ${location.pathname === '/services' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Services
            </Link>
            <Link to="/blogs" className={`font-medium transition-colors duration-300 ${location.pathname === '/blogs' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Blog
            </Link>
            <Link to="/help-center" className={`font-medium transition-colors duration-300 ${location.pathname === '/help-center' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Help Center
            </Link>
            <Link to="/contact" className={`font-medium transition-colors duration-300 ${location.pathname === '/contact' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Contact
            </Link>
          </nav>
          
          {/* Auth Buttons or User Profile */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-700">{user.name}</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {user.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={logout} 
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn btn-outline"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
        className={`
          fixed top-0 left-0 h-full w-1/2 z-50 bg-white shadow-lg md:hidden
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="text-2xl font-bold text-blue-600">Elevat Rehabilitation Center</Link>
            <button onClick={() => setIsMenuOpen(false)}>
            </button>
          </div>
            
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="py-2 text-lg font-medium text-gray-800">
                Home
              </Link>
              <Link to="/services" className="py-2 text-lg font-medium text-gray-800">
                Services
              </Link>
              <Link to="/blogs" className="py-2 text-lg font-medium text-gray-800">
                Blog
              </Link>
              <Link to="/help-center" className="py-2 text-lg font-medium text-gray-800">
                Help Center
              </Link>
              <Link to="/contact" className="py-2 text-lg font-medium text-gray-800">
                Contact
              </Link>
            </nav>
            
            <div className="mt-auto space-y-4">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="flex items-center py-2 space-x-2 text-blue-600"
                    >
                      <User size={20} />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  
                  <button 
                    onClick={logout} 
                    className="flex items-center w-full py-2 space-x-2 text-red-600"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block w-full text-center btn btn-outline"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block w-full text-center btn btn-primary"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;