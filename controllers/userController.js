const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")



const registerUser = asyncHandler( async(req, res) =>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All Fields are mandatory!");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }
    res.json({message: "Register the user"});
});

const loginUser = asyncHandler( async(req, res) =>{
    res.json({message: "Login user"});
});

const currentUser = asyncHandler( async(req, res) =>{
    res.json({message: "Current user information"});
});


module.exports = {registerUser, loginUser, currentUser};