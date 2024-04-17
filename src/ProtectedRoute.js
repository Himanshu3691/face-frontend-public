import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Assuming useAuth is your custom hook for authentication context

const ProtectedRoute = ({ redirectPath = '/login' }) => {
    const { isLoggedIn } = useAuth();  // useAuth should provide a way to check if the user is logged in

    if (!isLoggedIn) {
        // User not logged in, redirect to the login page or any other specified path
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;  // Render children routes if the user is logged in
};

export default ProtectedRoute;
