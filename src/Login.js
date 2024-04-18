import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://127.0.0.1:8000/teacherlogin/', { email, password });
            if (res.status === 200) {
                console.log("success");
                login(res.data.token);  // Update login state with token
                navigate('/home');  // Navigate to the homepage
            } else {
                setErrorMessage(`Login failed: ${res.status}`);
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(`Login failed: ${error.response.data}`);
            } else if (error.request) {
                setErrorMessage('Login failed: No response from server');
            } else {
                setErrorMessage('Login failed: Error in request setup');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto my-10 p-8 border rounded-lg shadow-lg bg-gray-50">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login to Your Account</h2>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        required 
                        className="w-full px-4 py-2 text-lg text-gray-700 bg-white rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required 
                        className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                    />
                </div>
                <div>
                    <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-lg font-semibold shadow-md hover:shadow-lg transition-all">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
