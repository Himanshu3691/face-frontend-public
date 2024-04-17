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
     <ImageUpload/>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <HomePage/>
                        </ProtectedRoute>
                    } />
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
