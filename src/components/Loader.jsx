import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Loader = () => {


  return (
    <div className="flex  items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <div className="mb-4">
          
          <div className="loader "></div>
        </div>
        
      </div>
    </div>
  );
};

export default Loader;