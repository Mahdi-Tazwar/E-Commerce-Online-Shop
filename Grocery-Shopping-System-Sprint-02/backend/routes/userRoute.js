const express = require('express');
const { registerUser, getUser, updatePassword, updateProfile, deleteUser, login, logout, forgotPassword, resetPassword } = require('../controllers/userController');
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/get',isAuthenticatedUser, getUser);
router.patch('/update/password',isAuthenticatedUser, updatePassword);
router.patch('/update/profile',isAuthenticatedUser, updateProfile);
router.post('/delete',isAuthenticatedUser, deleteUser);
router.post('/logout',isAuthenticatedUser, logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


module.exports = router;