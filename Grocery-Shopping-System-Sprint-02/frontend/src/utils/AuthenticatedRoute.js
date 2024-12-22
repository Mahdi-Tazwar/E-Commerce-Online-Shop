import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Message from "../common/Message/Message";

const AuthenticatedRoute = ({ children }) => {

    const { checkAuth } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            const result = await checkAuth();
            setIsAuthenticated(result!=='unauthorized');
        };
        verifyAuth();
    }, [checkAuth]);

    if (isAuthenticated===null) {
        return <Message head="Loading..." message="Please be patient" />
    }

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default AuthenticatedRoute;
