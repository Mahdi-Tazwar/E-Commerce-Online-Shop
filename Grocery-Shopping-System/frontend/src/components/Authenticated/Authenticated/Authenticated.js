import { Outlet } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";

const Authenticated = () => {
    return (
        <>
        <Navbar />
        <div style={{width: "100%", minHeight: "80vh", padding: "50px"}} >
            <Outlet />
        </div>
        <Footer />
        </>
    )
}

export const authenticatedRoutes = [
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/profile",
        element: <Profile />
    },
]

export default Authenticated;