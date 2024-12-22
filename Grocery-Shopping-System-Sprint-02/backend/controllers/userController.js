const User = require("../models/userModel");
const getToken = require("../utils/jwtToken");
const crypto = require('crypto');

exports.registerUser = async (req, res, next) => {
try{
  const userInfo = req.body;

  if (await User.findOne({ email: userInfo.email })) {
    return res.status(400).json({ message: "Email already exists" });
  }
  
  if (userInfo.authorizedId.trim().length === 0) {
    userInfo.role = "user";
  } else {
    if(userInfo.authorizedId.includes("admin")) {
      userInfo.role = "admin";
    } else if (userInfo.authorizedId.includes("staff")) {
        userInfo.role = "staff";
    }
    else {
      return res.status(400).json({message: "Invalid Authentication ID"});
    }
  }
  
  const newUser = new User(userInfo);
  await newUser.save();
  const token = getToken(newUser, res);
  res.status(200).json({user: newUser, token: token, message: "User Registration Successful"});
} catch(err){
  res.status(400).json({message: err.message});
}

};

exports.getUser = async (req, res, next) => {

  try{
    const user = await User.findById(req.user.id);
    res.status(200).json({user: user, message: "User fetch successfull"});
  } catch(err){
    res.status(400).json({message: err.message});
  }

};

exports.updateProfile = async (req, res, next) => {

  try{
    const userInfo = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, userInfo, { new: true, runValidators: true });
    res.status(200).json({user: user, message: "Profile updated successfully"});
  } catch (err) {
    res.status(400).json({message: err.message});
  }

};

exports.updatePassword = async (req, res, next) => {

  try{
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return res.status(400).json({message: "Old password is incorrect"});
    }

    user.password = req.body.newPassword;
    await user.save();

    const token = getToken(user, res);
    res.status(200).json({user: user, token: token, message: "Password updated successfully"});
  } catch (err) {
    res.status(400).json({message: err.message});
  }

};

exports.login = async (req, res, next) => {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({message: "Invalid email or password"});
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({message: "Invalid email or password"});
    }
    const token = getToken(user, res);
    res.status(200).json({user: user, token: token, message: "Login Successful"});
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

exports.logout = async (req, res, next) => {

  try {
    res.clearCookie('token');
    res.status(200).json({message: "Logged Out"});
  } catch (err) {
      res.status(500).json({message: err.message});
    }

};

exports.deleteUser = async (req, res, next) => {

  try {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.password);
    if (!isPasswordMatched) {
      return res.status(400).json({message: "Password is incorrect"});
    }
    await User.findByIdAndDelete(req.user.id);
    res.clearCookie('token');
    res.status(200).json({message: "User deleted"});
  } catch (err) {
    res.status(500).json({message: err.message});
  }

};

exports.forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not Authorized" });
    }
    const token = crypto.randomBytes(20).toString("hex");
    user.validationToken = token;
    user.save();
    res.status(200).json({ token, message: "Token Generated"});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const body = req.body;
    const user = await User.findOne({ validationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid Token" });
    }
    user.password = body.password;
    user.validationToken = undefined;
    user.save();
    res.status(200).json({ message: "Password Reset Successful" });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};