const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    bio: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    location: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["", "male", "female", "others"],
      default: "",
    },
    authorizedId: {
      type: String,

    },
    role: {
      type: String,
      default: "user",
    },
    validationToken: {
      type: String,
      select: false
    }
  });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;