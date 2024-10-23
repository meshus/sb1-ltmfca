import React from 'react';
import { Waves, Activity, Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white/70 backdrop-blur-lg border-b border-gray-100 fixed w-full z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Waves className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Wavelength
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Activity className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Heart className="w-6 h-6 text-gray-600" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;