
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-psu-blue text-white shadow-md p-6">
      <div className="container mx-auto text-center">
        <img 
          src="https://www.psuchicago.org/images/logo-white-wordmark.png" 
          alt="Penn State Logo" 
          className="h-16 mx-auto mb-2"
        />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Alumni Association - Chicago Chapter
        </h1>
        <h2 className="text-lg md:text-xl text-psu-gray font-light">
          Scholarship Review Portal
        </h2>
      </div>
    </header>
  );
};

export default Header;
