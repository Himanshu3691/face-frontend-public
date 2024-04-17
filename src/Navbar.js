import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
 

  return (
    <div className='flex h-14 items-center text-white bg-cyan-700 justify-center border-b-[1px] border-b-richblack-700'>
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/home">
         Home
        </Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:text-gray-300 transition duration-300 ease-in-out">DashBoard</Link>
          <Link to="/takeattandance" className="hover:text-gray-300 transition duration-300 ease-in-out">Take attanndance</Link>
          <Link to="/register" className="hover:text-gray-300 transition duration-300 ease-in-out">Register</Link>
        </div>
        
      </div>
    </div>
  );
}

export default Navbar;
