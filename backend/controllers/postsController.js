const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');
const {Post, validateCreatePost, validateUpdatePost} = require('../models/Post');
const {cloudinaryUploadImage, cloudinaryRemoveImage} = require('../utils/cloudinary');
const { validateObjectId } = require('../middlewares/validateObjectId');
const { Comment } = require('../models/comments');


/**---------------------------------------
 * @desc Create New Post
 * @route /api/posts
 * @method POST
 * @access private (only logged ib user)
 ----------------------------------------*/

 const createPostCtrl = asyncHandler( async(req, res) => {
    // validation for image
    if(!req.file) {
        return res.status(400).json({message: 'no image provided'});
    }

    //validation for data
    const {error} = validateCreatePost(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message});
    }

    //upload photo
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);

    // create new post and save it to db
    const post = await Post.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        user: req.user.id,
        image: {
            url: result.secure_url,
            publicId: result.public_id
        }
    })

    // send response to the user
    res.status(201).json(post);

    //delete image from the server
    fs.unlinkSync(imagePath);

 });

 /**---------------------------------------
 * @desc Get all  Post
 * @route /api/posts
 * @method GET
 * @access public
 ----------------------------------------*/

 const getAllPostsCtrl = asyncHandler(async(req, res)=> {
    const POST_PER_PAGE = 3;
    const {pageNumber, category} = req.query;
    let posts;

    if(pageNumber) {
        posts = await Post.find()
        .skip((pageNumber - 1) * POST_PER_PAGE)
        .limit(POST_PER_PAGE).sort({createdAt: -1}).populate('user', ['-password']);
    } else if(category) {
        posts = await Post.find({category}).sort({createdAt: -1}).populate('user', ['-password']);
    } else {
        posts = await Post.find({}).sort({ createdAt: -1}).populate('user', ['-password']);
    }

    res.status(200).json(posts);
 })
 /**---------------------------------------
 * @desc Get single Post
 * @route /api/posts
 * @method GET
 * @access public
 ----------------------------------------*/

 const getSinglePostsCtrl = asyncHandler(async(req, res)=> {
    const post = await Post.findById(req.params.id).populate('user', ['-password'])
    .populate('comments');

    if(!post) {
        return res.status(404).json({message: 'Post not found'});
    }

    res.status(200).json(post);
 })

 /**---------------------------------------
 * @desc Get single Post
 * @route /api/posts/:id
 * @method GET
 * @access public
 ----------------------------------------*/

 const getPostCountCtrl = asyncHandler(async(req, res)=> {
    const count = await Post.find().count();

    res.status(200).json(count);
 });

 /**---------------------------------------
 * @desc delete single Post
 * @route /api/posts/:id
 * @method delete
 * @access public
 ----------------------------------------*/

 const deletePostCtrl = asyncHandler(async(req, res)=> {
    const post = await Post.findById(req.params.id);

    if(!post) {
        return res.status(404).json({message: 'post not found'});
    }

    console.log(req.user);
    if(req.user.id || req.user.isAdmin === post.user.toString()) {
        await Post.findByIdAndDelete(req.params.id);
        await cloudinaryRemoveImage(post.image.publicId);

        //@todo delete comments
        await Comment.deleteMany({postId: post._id});
        
        res.status(200).json(
            {
                message: 'Post has been deleted successfully',
                postId: post._id
            });
    } else {
        res.status(403).json({message: 'access denied'})
    }
 });

  /**---------------------------------------
 * @desc update single Post
 * @route /api/posts/:id
 * @method PUT
 * @access public
 ----------------------------------------*/
 const updatePostCtrl = asyncHandler(async(req, res)=> {
    const {error} = validateUpdatePost(req.body);

    if(error) {
        return res.status(400).json({message: error.details[0].message});

    }

    const post = await Post.findById(req.params.id);

    if(!post) {
        return res.status(404).json({message: 'post not found'});
    }

    if(req.user.id !== post.user.toString()) {
        return res.status(403).json({message: 'access denied'});
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        $set:{
            title: req.body.title,
            description: req.body.description,
            category: req.body.category
        }
    }, {new: true}).populate('user', ['-password']);

    //send response to the user
    res.status(200).json(updatedPost)
 })

  /**---------------------------------------
 * @desc update Post image
 * @route /api/posts/update-image/:id
 * @method PUT
 * @access public
 ----------------------------------------*/
 const updatePostImageCtrl = asyncHandler(async(req, res)=> {
  

    if(!req.file) {
        return res.status(400).json({message: 'Please provide an image'});

    }

    const post = await Post.findById(req.params.id);

    if(!post) {
        return res.status(404).json({message: 'post not found'});
    }

    if(req.user.id !== post.user.toString()) {
        return res.status(403).json({message: 'access denied'});
    }

    //delete post old image
    await cloudinaryRemoveImage(post.image.publicId);

    //upload new photo
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);

    //update image in db
    const updatedImage = await Post.findByIdAndUpdate(req.params.id, {
        $set: {
            image: {
                url: result.secure_url,
                publicId:result.public_id
            }
        }
    }, {new: true});
    //send response to the user
    res.status(200).json(updatedImage);

    fs.unlinkSync(imagePath);
 });

  /**---------------------------------------
 * @desc toggle like comment
 * @route /api/posts/like/:id
 * @method PUT
 * @access private (only logged in user)
 ----------------------------------------*/
const toggleLikeCtrl = asyncHandler(async(req, res)=> {

    const loggedInUser = req.user.id;
    const {id: postId} = req.params;

    let post = await Post.findById(postId);

    if(!post) {
        return res.status(404).json({message: 'post not found'});
    }

    const isPostAlreadyLiked = post.likes.find((user)=>
     user.toString() === loggedInUser);

     if(isPostAlreadyLiked) {
        post = await Post.findByIdAndUpdate(postId, {
            $pull: {likes: loggedInUser}
        },
         {new: true});
     } else {
        post = await Post.findByIdAndUpdate(postId, {
            $push: {likes: loggedInUser}
        },
         { new: true});
     }

     res.status(200).json(post);
})

 module.exports = {
    createPostCtrl,
    getAllPostsCtrl,
    getSinglePostsCtrl,
    getPostCountCtrl,
    deletePostCtrl,
    updatePostCtrl,
    updatePostImageCtrl,
    toggleLikeCtrl
 }