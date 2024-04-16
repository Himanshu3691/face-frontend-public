import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/accounts/login/', { username, password });
            console.log(res.data);
            alert('Login successful');
        } catch (error) {
            console.error(error.response.data);
            alert('Login failed');
        }
    };

    return (
        <div className="max-w-lg mx-auto my-10 p-8 border rounded-lg shadow-lg bg-gray-50">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login to Your Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required 
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
