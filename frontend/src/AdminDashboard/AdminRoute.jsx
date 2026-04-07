import React from "react";
import { Navigate } from "react-router-dom";

/**
 * AdminRoute — wraps any admin page.
 * If the user is not authenticated, redirects to /admin/login.
 * When you add a real backend, swap the sessionStorage check
 * with your JWT / cookie validation logic here.
 */
export default function AdminRoute({ children }) {
    const isAuthenticated = sessionStorage.getItem("hpe_admin_auth") === "true";

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}
