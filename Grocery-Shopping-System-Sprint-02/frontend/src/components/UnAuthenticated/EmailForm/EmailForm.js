import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import handleAxiosError from "../../../utils/ErrorHandler";

const EmailForm = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const onChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let hasError = email.trim().length === 0;

        if (hasError) {
            toast.error("Please fill all the required fields");
            return;
        }

        axios.post("/api/user/forgot-password",{email})
        .then(response=>{
            toast.success(response.data.message);
            navigate(`/reset-password/${response.data.token}`);
        })
        .catch(handleAxiosError)
    };
    
    return (
        <div style={{width: "40%", padding: "20px", border: "1px solid #e5e5e5", borderRadius: "10px"}}>
            <h4>Email</h4>
            <div>
                <label htmlFor="emailInput" className="my-2">Email</label>
                <input className="form-control" id="emailInput" type="email" name="email" value={email} placeholder="Please enter your email" onChange={onChangeHandler} />
                <button className="btn w-100 mt-4" style={{backgroundColor: '#52796f', color: "white"}} onClick={onSubmitHandler}>Next</button>
            </div>
            <Link to="/" className="d-flex justify-content-center w-100"><button className="btn btn-link">Already have an account? Sign In</button></Link>
        </div>
    )
}

export default EmailForm;