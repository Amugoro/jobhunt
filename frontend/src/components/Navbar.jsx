import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
    <nav className="bg-white shadow-md fixed w-full z-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-2">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/assets/logo.jpg" alt="logo" className="h-15 w-12" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-600">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-blue-600">
                  Signup
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/aboutus" className="hover:text-blue-600">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-blue-600">
              Services
            </Link>
          </li>
          <li>
            <Link to="/hire-skilled" className="hover:text-blue-600">
              Hire Skilled
            </Link>
          </li>
          <li>
            <Link to="/job-search" className="hover:text-blue-600">
              Find Jobs
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link
                  to={`/${user.role}-dashboard`}
                  className="hover:text-blue-600"
                >
                  {user.role} Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
        >
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
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white bg-opacity-90 absolute top-full w-full shadow-lg">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link to="/" onClick={toggleMenu} className="hover:text-blue-600">
                Home
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="hover:text-blue-600"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    onClick={toggleMenu}
                    className="hover:text-blue-600"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/aboutus"
                onClick={toggleMenu}
                className="hover:text-blue-600"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                onClick={toggleMenu}
                className="hover:text-blue-600"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/hire-skilled"
                onClick={toggleMenu}
                className="hover:text-blue-600"
              >
                Hire Skilled
              </Link>
            </li>
            <li>
              <Link
                to="/job-search"
                onClick={toggleMenu}
                className="hover:text-blue-600"
              >
                Find Jobs
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link
                    to={`/${user.role}-dashboard`}
                    onClick={toggleMenu}
                    className="hover:text-blue-600"
                  >
                    {user.role} Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
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
