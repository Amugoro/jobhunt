import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaBell, FaSignOutAlt } from "react-icons/fa"; 

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-20 navbar">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-2">
        {/* Logo */}
        <Link to="/" className="items-center flex space-x-2">
          <img src="/assets/logo.jpg" alt="logo" className="h-15 w-12 navbar-logo" />
          <h1 className="font-bold text-purple-700">JOBWING-SKILLEDHUNT</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-blue-600">Home</Link>
          </li>
          <li>
            <Link to="/aboutus" className="hover:text-blue-600">About</Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-blue-600">Services</Link>
          </li>
          <li>
            <Link to="/hire-skilled" className="hover:text-blue-600">Hire</Link>
          </li>
          <li>
            <Link to="/job-search" className="hover:text-blue-600">Find Jobs</Link>
          </li>
          {!user ? (
            <li>
              <Link to="/login" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                Login
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to={`/${user.role}-dashboard`} className="hover:text-blue-600">
                  {user.role} Dashboard
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <FaUser title="Profile" className="text-blue-600 cursor-pointer hover:text-blue-800" />
                <FaBell title="Notifications" className="text-yellow-600 cursor-pointer hover:text-yellow-800" />
                <FaSignOutAlt
                  title="Logout"
                  className="text-red-600 cursor-pointer hover:text-red-800"
                  onClick={handleLogout}
                />
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white bg-opacity-90 absolute top-full w-full shadow-lg">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link to="/" onClick={toggleMenu} className="hover:text-blue-600">Home</Link>
            </li>
            <li>
              <Link to="/aboutus" onClick={toggleMenu} className="hover:text-blue-600">About</Link>
            </li>
            <li>
              <Link to="/services" onClick={toggleMenu} className="hover:text-blue-600">Services</Link>
            </li>
            <li>
              <Link to="/hire-skilled" onClick={toggleMenu} className="hover:text-blue-600">Hire</Link>
            </li>
            <li>
              <Link to="/job-search" onClick={toggleMenu} className="hover:text-blue-600">Find Jobs</Link>
            </li>
            {!user ? (
              <li>
                <Link to="/login" onClick={toggleMenu} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to={`/${user.role}-dashboard`} onClick={toggleMenu} className="hover:text-blue-600">
                    {user.role} Dashboard
                  </Link>
                </li>
                <li className="flex items-center space-x-4">
                  <FaUser
                    title="Profile"
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                  />
                  <FaBell
                    title="Notifications"
                    className="text-yellow-600 cursor-pointer hover:text-yellow-800"
                  />
                  <FaSignOutAlt
                    title="Logout"
                    className="text-red-600 cursor-pointer hover:text-red-800"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  />
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
