import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`flex justify-between items-center px-4 py-2 z-50 ${scrolled ? 'bg-white' : 'bg-transparent'} fixed w-full transition-all duration-300`}>
      {/* Logo */}
      <span className="text-xl font-bold cursor-pointer logo">LOGO</span>
        
      {/* Hamburger Menu for Small Screens */}
      <div className="block lg:hidden">
        <button onClick={toggleMobileNav} className="text-gray-800 focus:outline-none">
          &#9776; {/* Hamburger Icon */}
        </button>
      </div>

      {/* Navigation Links for Larger Screens */}
      <ul className="flex flex-1 justify-center gap-4 lg:flex lg:flex-1 lg:justify-center lg:gap-8">
        <li><Link to="/" className="text-gray-800 hover:text-blue-500">Home</Link></li>
        <li><Link to="/about" className="text-gray-800 hover:text-blue-500">About</Link></li>
        <li><Link to="/contact" className="text-gray-800 hover:text-blue-500">Contact</Link></li>
      </ul>

      {/* User Button or Sign In Button */}
      <div className="flex items-center">
        <SignedOut>
          <Link to="/sign-in" className="text-white bg-black hover:bg-blue-500 hover:text-white px-5 py-1 rounded hidden lg:block">Sign In</Link>
        </SignedOut>
        
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>

      {/* Mobile Navigation Links */}
      <div className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white z-50 ${isMobileNavOpen ? 'flex flex-col items-center justify-center' : 'hidden'}`}>
        <button onClick={toggleMobileNav} className="text-gray-800 focus:outline-none hover:text-red-500">
          &#10005; {/* Close Icon */}
        </button>
        <Link to="/" onClick={toggleMobileNav} className="text-2xl py-2">Home</Link>
        <Link to="/about" onClick={toggleMobileNav} className="text-2xl py-2">About</Link>
        <Link to="/contact" onClick={toggleMobileNav} className="text-2xl py-2">Contact</Link>

        <SignedOut>
          <Link to="/sign-in" onClick={toggleMobileNav} className="text-2xl border border-blue-500 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">Sign In</Link>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Nav;
