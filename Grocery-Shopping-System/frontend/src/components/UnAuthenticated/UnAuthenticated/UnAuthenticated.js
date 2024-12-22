import Nav from "../Nav/Nav";
import { Outlet } from "react-router-dom";
import Login from "../Login/Login";
import Footer from "../../Footer/Footer";
import Signup from "../Signup/Signup";
import EmailForm from "../EmailForm/EmailForm";
import PasswordForm from "../PasswordForm/PasswordForm";

const UnAuthenticated = () => {
    return (
        <>
        <Nav />
        <div className="d-flex justify-content-center align-items-center w-100" style={{minHeight: "80vh", padding: "50px"}} >
            <Outlet />
        </div>
        <Footer />
        </>
    )
}

export const unAuthenticatedRoutes = [
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "forgot-password",
        element: <EmailForm />
    },
    {
        path: "reset-password/:token",
        element: <PasswordForm />
    },
]

export default UnAuthenticated;