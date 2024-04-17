import React from 'react';
import Login from './Login';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import ImageUpload from './components/ImageUpload';

function App() {
  return (
    <div className="App min-h-screen bg-gray-500 flex flex-col justify-center items-center">
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/take" element={<ImageUpload/>}/>
        </Routes>
       
          {/* <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-semibold">Signup</Link> */}
        
      </div>
    </div>
  );
}

export default App;
