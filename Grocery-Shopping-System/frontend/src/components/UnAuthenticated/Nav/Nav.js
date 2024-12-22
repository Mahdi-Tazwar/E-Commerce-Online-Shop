import { Link } from "react-router-dom";

const Nav = () => {
    
    return (
        <div className="d-flex justify-content-between w-100 shadow" style={{minHeight: "10vh", maxHeight: "10px", padding: "20px 100px"}}>
            <h4>Grocery Mart</h4>
            <div className="d-flex align-items-center gap-2">
                <Link to="/" style={{textDecoration: "none", color: "black", padding: "5px", border: "1px solid", width: "60px", textAlign: "center", borderRadius: "5px"}}>Login</Link>
                <Link to="/signup" style={{textDecoration: "none", color: "black", padding: "5px", border: "1px solid", width: "60px", textAlign: "center", borderRadius: "5px"}}>Signup</Link>
            </div>
        </div>
    )
}

export default Nav;