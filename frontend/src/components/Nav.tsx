import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Sun, Moon } from 'lucide-react';

const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const savedTheme = localStorage.getItem('theme') === 'dark';
    setDarkMode(savedTheme);
    if (savedTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <nav className={`flex justify-between items-center px-4 py-2 z-50 ${scrolled ? 'bg-white dark:bg-gray-900' : 'bg-transparent'} fixed w-full transition-all duration-300`}>
      <span className="text-xl font-bold cursor-pointer logo">LOGO</span>

      <div className="block lg:hidden">
        <button onClick={toggleMobileNav} className="text-gray-800 dark:text-gray-100 focus:outline-none">
          &#9776;
        </button>
      </div>

      <ul className="flex flex-1 justify-center gap-4 lg:flex lg:flex-1 lg:justify-center lg:gap-8">
        <li><Link to="/" className="text-gray-800 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-500">Home</Link></li>
        <li><Link to="/about" className="text-gray-800 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-500">About</Link></li>
        <li><Link to="/contact" className="text-gray-800 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-500">Contact</Link></li>
      </ul>

      <div className="flex items-center">
        <button onClick={toggleTheme} className="text-gray-800 dark:text-gray-100 focus:outline-none mr-4">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <SignedOut>
          <Link to="/sign-in" className="text-white bg-black dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white px-5 py-1 rounded hidden lg:block">Sign In</Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>

      <div className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 z-50 ${isMobileNavOpen ? 'flex flex-col items-center justify-center' : 'hidden'}`}>
        <button onClick={toggleMobileNav} className="text-gray-800 dark:text-gray-100 focus:outline-none hover:text-red-500">
          &#10005;
        </button>
        <Link to="/" onClick={toggleMobileNav} className="text-2xl py-2 text-gray-800 dark:text-gray-100">Home</Link>
        <Link to="/about" onClick={toggleMobileNav} className="text-2xl py-2 text-gray-800 dark:text-gray-100">About</Link>
        <Link to="/contact" onClick={toggleMobileNav} className="text-2xl py-2 text-gray-800 dark:text-gray-100">Contact</Link>
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
