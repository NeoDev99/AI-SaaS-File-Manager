import React, { useEffect, useState } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer border border-t-[#d0d0d0] border-l-transparent border-r-transparent text-black">
      <div className="container p-6 flex justify-between">
        <span>NeoDev</span>
        <p className="text-slate-600">All rights reserved. &copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
