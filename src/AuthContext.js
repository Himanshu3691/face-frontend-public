import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating the context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component that provides the auth context
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        // Simulate authentication
        setUser({ email });  // Set user as authenticated
    };

    const logout = () => {
        setUser(null);  // Clear the user to signify logged out
    };

    // Use an effect to check local storage or validate the token/session
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
