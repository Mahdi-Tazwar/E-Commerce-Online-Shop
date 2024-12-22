import axios from "axios";
import handleAxiosError from "../../../utils/ErrorHandler";
import { toast } from'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const naivgate = useNavigate();
    const logout = () => {
        axios.post("/api/user/logout")
        .then(response=>{
            toast.success(response.data.message);
            naivgate("/");
        })
        .catch(handleAxiosError);
    }
    return (
        <div className="d-flex justify-content-between w-100 shadow" style={{minHeight: "10vh", maxHeight: "10px", padding: "20px 100px"}}>
            <h4>Grocery Mart</h4>
            <div className="d-flex align-items-center gap-2">
                <Link to="/home" style={{textDecoration: "none", color: "black"}}>Home</Link>
                <Link to="#" style={{textDecoration: "none", color: "black"}}>Cart</Link>
                <Link to="/profile" style={{textDecoration: "none", color: "black"}}>Profile</Link>
                <p style={{textDecoration: "none", color: "black", margin: "0px", cursor: "pointer"}} onClick={logout}>Logout</p>
            </div>
        </div>
    )
}

export default Navbar;