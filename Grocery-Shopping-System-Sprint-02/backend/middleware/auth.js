const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = async (req, res, next) => {

  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized"});
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (err) {
    res.status(400).json({ message: err.message});
  }

};

exports.authorizeRoles = (...roles) => {

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({ message: "Unauthorized"});
    }
    next();
    
  };
};