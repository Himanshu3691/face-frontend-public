import React from 'react';
import Login from './Login';
import Signup from './Signup';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App min-h-screen bg-gray-500 flex flex-col justify-center items-center">
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
        <Login/>
       
          {/* <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-semibold">Signup</Link> */}
        
      </div>
    </div>
  );
}

export default App;
