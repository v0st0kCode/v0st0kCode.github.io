
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading effect for title
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300); // Small delay to ensure animation is visible

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'py-3 bg-white/95 backdrop-blur-md shadow-sm' 
        : 'py-5 bg-gradient-to-b from-white/90 to-white/0'
    }`}>
      <nav className="container-custom flex justify-center items-center">
        <Link 
          to="/" 
          className={`font-outfit font-normal text-xl tracking-tight hover:opacity-80 transition-all duration-1000 ease-out text-shadow text-center mt-16 md:mt-24 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-5xl">iThomas</div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider">DIGITAL PRODUCT DESIGN</div>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
