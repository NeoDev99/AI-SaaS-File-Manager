import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav className={`flex justify-between items-center px-4 py-2 ${scrolled ? 'bg-white' : 'bg-transparent'} fixed w-full transition-all duration-300`}>
        <span className="text-xl font-bold cursor-pointer">LOGO</span>
        <ul className="flex gap-4">
            <li><a href="/">Home</a></li>
            <li><a href="/">About</a></li>
            <li><a href="/">Services</a></li>
            <li><a href="/">Contact</a></li>
        </ul>

        <div className="flex gap-4">
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
