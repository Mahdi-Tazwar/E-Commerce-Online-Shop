import React from "react";
import Authenticated, { authenticatedRoutes } from "../components/Authenticated/Authenticated/Authenticated";
import UnAuthenticated, { unAuthenticatedRoutes } from "../components/UnAuthenticated/UnAuthenticated/UnAuthenticated";
import AuthenticatedRoute from "../utils/AuthenticatedRoute";

export const routes = [
    {
        path: "/",
        element: <UnAuthenticated />,
        children: unAuthenticatedRoutes,
    },
    {
        path: "/",
        element: <AuthenticatedRoute><Authenticated /></AuthenticatedRoute>,
        children: authenticatedRoutes,
    },
];