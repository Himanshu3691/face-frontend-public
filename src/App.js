import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 // Adjust paths as necessary
import Login from './Login';
import Dashboard from './Dashboard';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute'; // Adjust the path as necessary
import HomePage from './HomePage';
import ImageUpload from './component/ImageUpload';
import AttendanceForm from './component/AttandenceForm';
import TakeattAndence from './component/TakeAttandence';

const App = () => {
    return (<div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={
                     
                             <HomePage/>
                        
                            
                        
                    } />
                    {
                        <Route path='/takeattandance' element={<TakeattAndence/>}/>

                        
                    }
                    <Route path="/dashboard" element={

                            <Dashboard />
                        
                    } />

                    {/* Add other protected routes similarly */}
                </Routes>
                </div>
        
           
    );
};

export default App;
