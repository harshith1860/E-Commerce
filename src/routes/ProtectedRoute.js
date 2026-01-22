import { Navigate } from "react-router-dom";

// ProtectedRoute is a wrapper component used to restrict access to routes
// based on authentication status (JWT token presence).
export const ProtectedRoute = ({ children }) => {

    // Get JWT token from sessionStorage
    // If token exists → user is considered logged in
    const token = JSON.parse(sessionStorage.getItem("token"));

    // If token is available, allow access to the protected component
    // Otherwise, redirect the user to the login page
    return token ? children : <Navigate to="/login" />;
};
