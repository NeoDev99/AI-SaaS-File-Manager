import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer text-black">
      <div className="container p-4 flex justify-between">
        <span>NeoDev</span>
        <p className="text-slate-600">All rights reserved. &copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
