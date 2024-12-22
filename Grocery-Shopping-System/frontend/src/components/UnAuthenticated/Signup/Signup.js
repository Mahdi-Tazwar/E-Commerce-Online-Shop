import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import handleAxiosError from "../../../utils/ErrorHandler";

const Signup = () => {

    const navigate = useNavigate();
    const [signupForm, setSignupForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        authorizedId: ""
    });
    const onChangeHandler = (e) => {
        setSignupForm({...signupForm, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let hasError = !Object.entries(signupForm).filter(([key]) => key !== "authorizedId").every(([, value]) => value.trim().length !== 0);

        if (hasError) {
            toast.error("Please fill all the required fields");
            return;
        }

        const { confirmPassword, ...formValues } = signupForm;

        let notMatched = formValues.password!==confirmPassword;

        if (notMatched) {
            toast.error("Passwords do not match");
            return;
        }

        axios.post("/api/user/register",{...formValues})
        .then(response=>{
            toast.success(response.data.message)
            navigate("/profile");
        })
        .catch(handleAxiosError)
    };
    
    return (
        <div style={{width: "40%", padding: "20px", border: "1px solid #e5e5e5", borderRadius: "10px"}}>
            <h4>Signup</h4>
            <div>
                <label htmlFor="nameInput" className="my-2">Name</label>
                <input className="form-control" id="nameInput" type="text" name="name" value={signupForm.name} placeholder="Please enter your name" onChange={onChangeHandler} />
                <label htmlFor="emailInput" className="my-2">Email</label>
                <input className="form-control" id="emailInput" type="email" name="email" value={signupForm.email} placeholder="Please enter your email" onChange={onChangeHandler} />
                <label htmlFor="passwordInput" className="my-2">Password</label>
                <input className="form-control" id="passwordInput" type="password" name="password" value={signupForm.password} placeholder="Please enter your password" onChange={onChangeHandler} />
                <label htmlFor="confirmpasswordInput" className="my-2">Confirm Password</label>
                <input className="form-control" id="confirmpasswordInput" type="password" name="confirmPassword" value={signupForm.confirmPassword} placeholder="Please enter your password again" onChange={onChangeHandler} />
                <label htmlFor="authorizedIdInput" className="my-2">Autorized ID</label>
                <input className="form-control" id="authorizedIdInput" type="text" name="authorizedId" value={signupForm.authorizedId} placeholder="(Optional)" onChange={onChangeHandler} />
                <button className="btn w-100 mt-4" style={{backgroundColor: '#3a5a40', color: "white"}} onClick={onSubmitHandler}>Sign up</button>
            </div>
            <Link to="/" className="d-flex justify-content-center w-100"><button className="btn btn-link">Already have an account? Login</button></Link>
        </div>
    )
}

export default Signup;