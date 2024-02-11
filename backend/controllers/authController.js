const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const {User, validateRegisterUser, validateLoginUser} = require('../models/User');

const registerUserCtrl = asyncHandler(async(req,res)=> {
    //validation
    const {error} = validateRegisterUser(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message});
    }

    //is user already exists in mongodb
    let user = await User.findOne({email: req.body.email});

    if(user) {
        return res.status(400).json({message: 'User Already exist'});
    }
    
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user and save it to db
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

    await user.save();
    // console.log(user)
    //send a response to client
    res.status(201).json({message: 'you registered successfully, please log in'});
});

const loginUserCtrl = asyncHandler(async(req, res)=> {
    //validation
    const {error} = validateLoginUser(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message});
    }
    // is user exist
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return res.status(400).json({message: 'Invalid Credentials'});
    }

    // check the password
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordMatch){
        return res.status(400).json({message: 'Invalid Credentials'});
    }

    //todo sending email (verify account if not verified)

    // generate token (jwt)
    const token = user.generateAuthToken();
    // response to client
    res.status(200).json({
        _id: user._id,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        token,
        username: user.username
    })
});



module.exports = {
    registerUserCtrl,
    loginUserCtrl
}