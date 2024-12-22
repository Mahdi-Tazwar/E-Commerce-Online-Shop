import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import handleAxiosError from "../../../utils/ErrorHandler";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isEditPassword, setIsEditPassword] = useState(false);
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value });
    };

    const onPasswordChangeHandler = (e) => {
        setPasswordForm({...passwordForm, [e.target.name]: e.target.value });
    };

    const formatdate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }


    useEffect(()=>{
        axios.get('/api/user/get')
        .then((response)=>{
            const theUser = response.data.user;
            if (response.data.user.dateOfBirth!==null) {
                const date = formatdate(theUser.dateOfBirth);
                theUser.dateOfBirth = date;
            }
            setUser(theUser);
        })
        .catch(handleAxiosError);
    },[])

    const editProfile = () => {
        axios.patch('/api/user/update/profile', {...user})
        .then((response)=>{
            toast.success(response.data.message);
            const theUser = response.data.user;
            if (response.data.user.dateOfBirth!==null) {
                const date = formatdate(theUser.dateOfBirth);
                theUser.dateOfBirth = date;
            }
            setUser(theUser);
        })
        .catch(handleAxiosError)
        setIsEditProfile(false);

    }

    const editPassword = () => {
        const isEmpty = !Object.values(passwordForm).every(value => value.trim().length !== 0);
        if (isEmpty) {
            toast.error("Please fill all the required fields");
            return;
        }

        const isPasswordMatch = passwordForm.newPassword !== passwordForm.confirmPassword;
        if (isPasswordMatch) {
            toast.error("Passwords do not match");
            return;
        }

        axios.patch('/api/user/update/password', {...passwordForm})
       .then((response)=>toast.success(response.data.message))
       .catch(handleAxiosError)
        setIsEditPassword(false);
    }

    const deleteUser = () => {
        axios.post('/api/user/delete', {password: passwordForm.newPassword})
       .then((response)=>{
            toast.success(response.data.message);
            navigate("/");
        }).catch(handleAxiosError);
        setIsDelete(false);
    }

    const set = (props) => {
        if (props === "password"){
            setIsEditPassword(true);
            setIsDelete(false);
            setIsEditProfile(false);
        } else if (props === "profile") {
            setIsEditProfile(true);
            setIsEditPassword(false);
            setIsDelete(false);
        } else {
            setIsDelete(true);
            setIsEditProfile(false);
            setIsEditPassword(false);   
        }
    }

    return (
        <>
        <div className="d-flex flex-column align-items-center w-100">
            <h2 className="text-center">Profile</h2>
                <div className="d-flex flex-column gap-2 align-items-center border" style={{width: "30%", padding: "20px", borderRadius: "10px"}}>
                    {!isEditPassword && !isEditProfile && !isDelete && <>
                    <p className="text-box">{user.name}</p>
                    <p className="text-box">{user.email}</p>
                    {user.bio!=="" && <p className="text-box">{user.bio}</p>}
                    {user.location!=="" && <p className="text-box">{user.location}</p>}
                    {user.gender!=="" && <p className="text-box">{user.gender}</p>}
                    {user.dateOfBirth!==null && <p className="text-box">{user.dateOfBirth}</p>}
                    <div className="d-flex w-100">
                        <button className='btn btn-primary w-50' onClick={()=>set("profile")}>Edit Pofile</button>
                        <button className='btn btn-success mx-2 w-50' onClick={()=>set("password")}>Edit Password</button>
                    </div>
                    <button className='btn btn-link' onClick={()=>set("delete")}>Profile Deletion</button></>}
                    {!isEditPassword && isEditProfile && !isDelete && <>
                    <input className="form-control" type="text" name="name" value={user.name} onChange={onChangeHandler} placeholder="Name"/>
                    <input className="form-control" type="email" name="email" value={user.email} onChange={onChangeHandler} placeholder="Email"/>
                    <textarea className="form-control" type="text" name="bio" value={user.bio} onChange={onChangeHandler} placeholder="Bio (Optional)"/>
                    <input className="form-control" type="text" name="location" value={user.location} onChange={onChangeHandler} placeholder="Address (Optional)" />
                    <input className="form-control" type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={onChangeHandler} />
                    <select className="form-select" name="gender" value={user.gender} onChange={onChangeHandler}>
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                    <button className='btn btn-primary w-100' onClick={editProfile}>Save</button></>}
                    {isEditPassword && !isEditProfile && !isDelete && <>
                    <input className="form-control" type="password" name="oldPassword" onChange={onPasswordChangeHandler} placeholder="Old Password"/>
                    <input className="form-control" type="password" name="newPassword" onChange={onPasswordChangeHandler} placeholder="New Password" />
                    <input className="form-control" type="password" name="confirmPassword" onChange={onPasswordChangeHandler} placeholder="Confirm Password" />
                    <button className='btn btn-success w-100' onClick={editPassword}>Save</button></>}
                    {!isEditPassword && !isEditProfile && isDelete && <>
                    <input className="form-control" type="password" name="newPassword" onChange={onPasswordChangeHandler} placeholder="Enter you password to procceed"/>
                    <button className='btn btn-primary w-100' onClick={deleteUser}>Confirm Deletion</button></>}
                </div>
        </div>
        </>
    )
}

export default Profile;