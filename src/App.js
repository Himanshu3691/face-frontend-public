import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 // Adjust paths as necessary
import Login from './Login';
import Dashboard from './Dashboard';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute'; // Adjust the path as necessary
import HomePage from './HomePage';
import ImageUpload from './component/ImageUpload';

const App = () => {
    return (<div>
     {/* <ImageUpload/> */}
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={
                     
                             <HomePage/>
                        
                            
                        
                    } />
                    {
                        <Route path='/takeattandance' element={<ImageUpload/>}/>

                        
                    }
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />

                    {/* Add other protected routes similarly */}
                </Routes>
                </div>
        
           
    );
};

export default App;
