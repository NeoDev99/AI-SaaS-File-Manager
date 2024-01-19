import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <nav className={`flex justify-between items-center px-4 py-2 z-50 ${scrolled ? 'bg-white' : 'bg-transparent'} fixed w-full transition-all duration-300`}>
      {/* Logo */}
      <span className="text-xl font-bold cursor-pointer">LOGO</span>

      {/* Hamburger Menu for Small Screens */}
      <div className="block lg:hidden">
        <button onClick={toggleMobileNav} className="text-gray-800 focus:outline-none">
          &#9776; {/* Hamburger Icon */}
        </button>
      </div>

      {/* Navigation Links for Larger Screens */}
      <ul className="hidden lg:flex gap-4">
        <li><a href="/">Home</a></li>
        <li><a href="/">About</a></li>
        <li><a href="/">Services</a></li>
        <li><a href="/">Contact</a></li>
      </ul>

      {/* Mobile Navigation Links */}
      <div className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white z-50 ${isMobileNavOpen ? 'flex flex-col items-center justify-center' : 'hidden'}`}>
        <button onClick={toggleMobileNav} className="text-gray-800 focus:outline-none hover:text-red-500">
          &#10005; {/* Close Icon */}
        </button>
        <a href="/" onClick={toggleMobileNav}>Home</a>
        <a href="/" onClick={toggleMobileNav}>About</a>
        <a href="/" onClick={toggleMobileNav}>Services</a>
        <a href="/" onClick={toggleMobileNav}>Contact</a>
      </div>


      {/* Buttons for Larger Screens */}
      <div className="hidden lg:flex gap-4">
        <button className="text-black hover:text-white border border-black hover:bg-black rounded p-1">
          SignUp
        </button>

        <button className="text-black border border-black rounded p-1">
          <span className="text-sm">&#x1F464;</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
