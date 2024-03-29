const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim:true,
        minlength: 2,
        maxlength:100,
    },
    email: {
        type: String,
        required: true,
        trim:true,
        minlength: 5,
        maxlength:100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength:4
    },
     profilePhoto: {
        type: Object,
        default:{
            url: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            publicId: null,
        }
    },
     bio: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default:false,
    },
    isAccountVerified: {
        type:Boolean,
        default: false
    }
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// Populate Posts that belongs to this user when he/she get his/her profile

UserSchema.virtual('posts', {
    ref: 'Post',
    foreignField: 'user',
    localField: '_id',
})


// Generate Auth Token
UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.SECRET_KEY)
}


const User = mongoose.model('User', UserSchema);




// validate register user
function validateRegisterUser(obj) {
    const schema = Joi.object({
        username:Joi.string().trim().min(2).max(100).required(),
        email:Joi.string().trim().min(5).max(100).required().email(),
        password:Joi.string().trim().min(5).required(),
    })

    return schema.validate(obj);
}
// validate login user
function validateLoginUser(obj) {
    const schema = Joi.object({
        email:Joi.string().trim().min(5).max(100).required().email(),
        password:Joi.string().trim().min(5).required(),
    })

    return schema.validate(obj);
}
// validate update user
function validateUpdateUser(obj) {
    const schema = Joi.object({
        username:Joi.string().trim().min(5).max(100),
        password:Joi.string().trim().min(5),
        bio: Joi.string(),
    })

    return schema.validate(obj);
}



module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
};