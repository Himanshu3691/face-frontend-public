import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/accounts/signup/', { username, password, email });
            console.log(res.data);
            alert('Signup successful');
        } catch (error) {
            console.error(error.response.data);
            alert('An error occurred');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 border rounded-lg shadow-lg bg-gray-50">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required 
                    className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                </div>
                <div>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required 
                    className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                </div>
                <div>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required 
                    className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                </div>
                <div>
                    <button type="submit" className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-lg font-semibold shadow-md hover:shadow-lg transition-all">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
