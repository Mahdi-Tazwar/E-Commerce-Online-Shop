import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import Message from "../common/Message/Message";

const AuthorizedRoute = ({ children, role }) => {

    const { checkAuth } = useAuth();
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            const result = await checkAuth();
            setIsAuthorized(result===role);
        };
        verifyAuth();
    }, [checkAuth]);

    return isAuthorized ? children : <Message head="Unauthorized" message="You don't have access to view this page" />;
};

export default AuthorizedRoute;