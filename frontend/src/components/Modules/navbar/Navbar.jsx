/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white border-gray-100 shadow-md">
      <div className="sm:max-w-[82%] flex flex-wrap items-center justify-between mx-auto p-3">
        <a href="#" className="flex items-center space-x-3">
          <img src="/companyLogo.svg" className="h-8" alt="Company Logo" />
        </a>

        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          }  w-full md:flex md:items-center md:justify-center md:w-auto sm:mr-10`}
        >
          <div className="relative w-full  md:w-[95%] md:flex-shrink-0 md:mr-5 ">
            <input
              type="text"
              className="h-9 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md pl-4 pr-10 py-2 focus:ring-[#D100F3] focus:border-[#D100F3]"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <img src="/search.svg" alt="search" />
            </div>
          </div>

          <ul className="font-medium flex flex-col md:flex-row md:items-center md:space-x-6 mt-4 md:mt-0 border border-gray-100 md:border-0 rounded-lg bg-gray-50 md:bg-white">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-[#000000] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#D100F3] font-normal"
              >
                SignUp
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-[#000000] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#D100F3] font-normal"
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
