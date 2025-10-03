
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Loading effect for title
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300); // Small delay to ensure animation is visible

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-5">
      <nav className="container-custom flex justify-center items-center">
        <div className={`font-outfit font-normal text-xl tracking-tight text-center mt-3 md:mt-24 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-5xl">iThomas</div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider">DIGITAL PRODUCT DESIGN</div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
