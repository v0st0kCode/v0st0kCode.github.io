
import React from 'react';

const Navbar: React.FC = () => {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-5 bg-white/90">
      <nav className="container-custom flex justify-center items-center">
        <div className="font-outfit font-normal text-xl tracking-tight text-center mt-3 md:mt-24">
          <div className="text-5xl">iThomas</div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider">DIGITAL PRODUCT DESIGN</div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
