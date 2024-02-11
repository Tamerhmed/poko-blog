const asyncHandler = require('express-async-handler');
const {User, validateUpdateUser} = require('../models/User');
const {Post} = require('../models/Post');
const {Comment} = require('../models/comments');
const path = require('path');
const fs = require('fs');
const {
     cloudinaryRemoveImage,
      cloudinaryUploadImage,
    cloudinaryRemoveMultipleImage
    } = require('../utils/cloudinary');

//get all users profile
const getAllUsersCtrl = asyncHandler(async(req, res)=> {
    // console.log(req.headers.authorization)
    
    const users = await User.find({}).select('-password').populate('posts');
    res.status(200).json(users);
});


//get user profile
const getUserProfileCtrl = asyncHandler(async(req, res)=> {
    // const {error} = validateUpdateUser(req.params.id);

    // if(error) {
    //     return res.status(403).json({message: 'You are not authorized'})
    // }
    
    const user = await User.findById(req.params.id).select('-password').populate('posts');
    // console.log(user)
    if(!user) {
        return res.status(404).json({message: 'User not found'});
    } 

    res.status(200).json(user);
});

// update user profile

const updateUserProfileCtrl = asyncHandler(async(req, res) => {
     const {error} = validateUpdateUser(req.body);

    if(error) {
        return res.status(403).json({message: 'You are not authorized'})
    }

    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username:req.body.username,
            password: req.body.password,
            bio: req.body.bio
        }
    }, {new: true}).select('-password');
    
    res.status(200).json(updatedUser)
    
});

// get users total number
const getUsersCountCtrl = asyncHandler(async(req, res)=> {
    const users = await User.count();
    res.status(200).json(users);
});

// upload user profile pic
const profilePhotoUploadCtrl = asyncHandler(async(req, res)=> {
    if(!req.file) {
        return res.status(400).json({message: 'No file provided'});
    }
    // get the path to the image
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  
    //upload to cloudinary
    const result = await cloudinaryUploadImage(imagePath);
    // console.log(result);
    // get the user from database
    const user = await User.findById(req.user.id);

    // console.log(user);
    //delete the old profile photo
    if(user.profilePhoto.publicId !== null) {
        await cloudinaryRemoveImage(user.profilePhoto.publicId);
    }
    //change the profile photo field in the db
    user.profilePhoto = {
        url: result.secure_url,
        publicId: result.public_id
    }

    await user.save();
    //send response to the user
    res.status(200).json(
        {
            message: 'your profile photo has been uploaded',
            profilePhoto: {url: result.secure_url, publicId: result.public_id}
        }
    );

    //remove image from the server
    fs.unlinkSync(imagePath)
});

// delete user
const deleteUserProfileCtrl = asyncHandler(async(req, res)=> {
    // get the user from db
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json({message: 'user not found'});
    }

    //get all posts from DB
    const posts = await Post.find({user: user._id});
    
    // get all public ids from the posts
    const publicIds = posts?.map((post)=>{
        return post.image.publicId
    });
    // delete all posts image from cloudinary that belong to this user
    if(publicIds?.length > 0) {
        await cloudinaryRemoveMultipleImage(publicIds);
    }

    // delete the profile picture from cloudinary
    if(user?.profilePhoto.publicId !== null) {
        await cloudinaryRemoveImage(user.profilePhoto.publicId);
    }

    //delete user posts & comments
    await Post.deleteMany({ user: user._id});
    await Comment.deleteMany({ user: user._id});
    
    //delete the user from db
    await User.findByIdAndDelete(req.params.id);

    //send a response to the client
    res.status(200).json({message: 'your account has been deleted'})

})


module.exports = {
    getAllUsersCtrl,
    getUserProfileCtrl,
    updateUserProfileCtrl,
    getUsersCountCtrl,
    profilePhotoUploadCtrl,
    deleteUserProfileCtrl
}
