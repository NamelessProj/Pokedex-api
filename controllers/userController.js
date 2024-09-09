// Import libraries
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');

// @desc Login a user with a token
// @route POST /api/user/login
// @access Public
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        res.status(401);
        throw new Error("Please fill the required fields.");
    }

    const user = await User.findOne({email});
    if(user && await user.matchPassword(password)){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            last_name: user.last_name,
            first_name: user.first_name,
            email: user.email
        });
    }else{
        res.status(401);
        throw new Error("A problem occur with your password or your email.");
    }
});

// @desc Creating a user into the DB
// @route POST /api/user/register
// @access Public
const register = asyncHandler(async (req, res) => {
    const {last_name, first_name, email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        res.status(400);
        throw new Error("Thanks to fill the required fields.");
    }

    // Checking if the user already exist
    const userExists = await User.findOne({email: email});
    if(userExists){
        res.status(400);
        throw new Error("The user already exists.");
    }

    // Creating the user
    const user = await User.create({
        last_name,
        first_name,
        email,
        password
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            last_name: user.last_name,
            first_name: user.first_name,
            email: user.email
        });
    }else{
        res.status(400);
        throw new Error("An error occur while attempting to create the user. Please retry later.");
    }
});

// @desc Update a user from the DB using his id
// @route PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body._id);

    if(!user){
        res.status(400);
        throw new Error("The user doesn't exists.");
    }

    user.last_name = req.body.last_name || user.last_name;
    user.first_name = req.body.first_name || user.first_name;
    user.email = req.body.email || user.email;

    if(req.body.password){
        user.password = req.body.password;
    }

    const updatedUser = await user.save();

    if(updateUserProfile){
        res.status(201).json({
            _id: updateUserProfile._id,
            last_name: updateUserProfile.last_name,
            first_name: updateUserProfile.first_name,
            email: updateUserProfile.email
        });
    }else{
        res.status(400);
        throw new Error("An error occur while modifying the profile. Please retry later.");
    }
});

// @desc Logout a user
// @route POST /api/user/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message: `User disconnected successfully.`});
});

// @desc Getting a user from the DB using his id
// @route POST /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params._id);

    if(user){
        res.status(200).json({
            _id: user._id,
            last_name: user.last_name,
            first_name: user.first_name,
            email: user.email
        });
    }else{
        res.status(400);
        throw new Error("The user doesn't exist.");
    }
});

module.exports = {
    login,
    logout,
    register,
    updateUserProfile,
    getUserProfile,
}