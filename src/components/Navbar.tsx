
import React, { useState, useEffect, useRef } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLElement>(null);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse movement tracking for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading effect for title
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300); // Small delay to ensure animation is visible

    return () => clearTimeout(timer);
  }, []);

  // Calculate 3D transform values based on mouse position
  const getTransformStyle = () => {
    if (!navRef.current) return {};
    
    const navRect = navRef.current.getBoundingClientRect();
    const navCenterX = navRect.left + navRect.width / 2;
    const navCenterY = navRect.top + navRect.height / 2;
    
    const deltaX = mousePosition.x - navCenterX;
    const deltaY = mousePosition.y - navCenterY;
    
    // Calculate rotation angles (subtle effect)
    const rotateX = (deltaY / window.innerHeight) * -10; // Max 10 degrees
    const rotateY = (deltaX / window.innerWidth) * 10; // Max 10 degrees
    
    // Calculate scale based on distance from center
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight) / 2;
    const scale = 1 + (1 - distance / maxDistance) * 0.05; // Max 5% scale increase
    
    // Calculate spotlight position
    const spotlightX = (mousePosition.x / window.innerWidth) * 100;
    const spotlightY = (mousePosition.y / window.innerHeight) * 100;
    
    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      background: `radial-gradient(circle at ${spotlightX}% ${spotlightY}%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
      transition: 'transform 0.1s ease-out, background 0.1s ease-out'
    };
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'py-3 bg-white/95 backdrop-blur-md shadow-sm' 
        : 'py-5 bg-gradient-to-b from-white/90 to-white/0'
    }`}>
      <nav 
        ref={navRef}
        className="container-custom flex justify-center items-center"
        style={getTransformStyle()}
      >
        <div 
          className={`font-outfit font-normal text-xl tracking-tight hover:opacity-80 transition-all duration-1000 ease-out text-shadow text-center mt-3 md:mt-24 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-5xl">iThomas</div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider">DIGITAL PRODUCT DESIGN</div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
