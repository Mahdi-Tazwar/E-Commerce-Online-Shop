import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import handleAxiosError from "../../../utils/ErrorHandler";

const Login = () => {

    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });
    const onChangeHandler = (e) => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let hasError = !Object.values(loginForm).every(value => value.trim().length !== 0);

        if (hasError) {
            toast.error("Please fill all the required fields");
            return;
        }

        axios.post("/api/user/login",{...loginForm})
        .then(response=>{
            toast.success(response.data.message);
            navigate("/profile");
        })
        .catch(handleAxiosError)
    };
    
    return (
        <div style={{width: "40%", padding: "20px", border: "1px solid #e5e5e5", borderRadius: "10px"}}>
            <h4>Login</h4>
            <div>
                <label htmlFor="emailInput" className="my-2">Email</label>
                <input className="form-control" id="emailInput" type="email" name="email" value={loginForm.email} placeholder="Please enter your email" onChange={onChangeHandler} />
                <label htmlFor="passwordInput" className="m-0">Password</label>
                <Link to="/forgot-password"><button className="btn btn-link" style={{fontSize: "11px"}}>Forgot Password?</button></Link>
                <input className="form-control" id="passwordInput" type="password" name="password" value={loginForm.password} placeholder="Please enter your password" onChange={onChangeHandler} />
                <button className="btn w-100 mt-4" style={{backgroundColor: '#52796f', color: "white"}} onClick={onSubmitHandler}>Login</button>
            </div>
            <Link to="/signup" className="d-flex justify-content-center w-100"><button className="btn btn-link">Don't have an account? Register</button></Link>
        </div>
    )
}

export default Login;