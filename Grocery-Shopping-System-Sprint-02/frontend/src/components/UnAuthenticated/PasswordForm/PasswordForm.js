import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import handleAxiosError from "../../../utils/ErrorHandler";

const PasswordForm = () => {

    const navigate = useNavigate();
    const {token} = useParams();
    const [passwordForm, setPasswordForm] = useState({
        password: "",
        confirmPassword: ""
    });

    const onChangeHandler = (e) => {
        setPasswordForm({...passwordForm, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let hasError =!Object.values(passwordForm).every(value => value.trim().length!== 0);

        if (hasError) {
            toast.error("Please fill all the required fields");
            return;
        }

        let isPasswordMatched = passwordForm.password===passwordForm.confirmPassword;

        if (!isPasswordMatched) {
            toast.error("Passwords do not match");
            return;
        }

        axios.post(`/api/user/reset-password/${token}`,{...passwordForm})
        .then(response=>{
            toast.success(response.data.message);
            navigate("/");
        })
        .catch(handleAxiosError)
    };
    
    return (
        <div style={{width: "40%", padding: "20px", border: "1px solid #e5e5e5", borderRadius: "10px"}}>
            <h4>Reset Password</h4>
            <div>
                <label htmlFor="passwordInput" className="my-2">Password</label>
                <input className="form-control" id="passwordInput" type="password" name="password" value={passwordForm.password} placeholder="Please enter your password" onChange={onChangeHandler} />
                <label htmlFor="confirmpasswordInput" className="my-2">Confirm Password</label>
                <input className="form-control" id="confirmpasswordInput" type="password" name="confirmPassword" value={[passwordForm.confirmPassword]} placeholder="Please enter your password again" onChange={onChangeHandler} />
                <button className="btn w-100 mt-4" style={{backgroundColor: '#52796f', color: "white"}} onClick={onSubmitHandler}>Next</button>
            </div>
            <Link to="/" className="d-flex justify-content-center w-100"><button className="btn btn-link">Already have an account? Sign In</button></Link>
        </div>
    )
}

export default PasswordForm;