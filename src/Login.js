import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate =useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/teacherlogin/', { email, password });
            if (res.status === 200) {
                console.log(res.status)
                console.log(res.data);

                navigate('/take');
            } else {
                console.log("not login");
            }
        } catch (error) {
            if (error.response) {
                
                console.error(error.response.data);
                alert(`Login failed: ${error.response.data}`);
            } else if (error.request) {
               
                console.error(error.request);
                alert('Login failed: No response from server');
            } else {
                
                console.error('Error', error.message);
                alert('Login failed: Error in request setup');
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto my-10 p-8 border rounded-lg shadow-lg bg-gray-50">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login to Your Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input type="text" value={email} onChange={e => setemail(e.target.value)} placeholder="Email" required 
                    className="w-full px-4 py-2 text-lg text-gray-700  bg-white rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                </div>
                <div>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required 
                    className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                </div>
                <div>
                    <button type="submit" className="w-full py-3 bg-blue-600  hover:bg-blue-700 rounded-md text-white text-lg font-semibold shadow-md hover:shadow-lg transition-all">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
