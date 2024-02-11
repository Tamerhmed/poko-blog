const asyncHandler = require('express-async-handler');
const { Comment, validateCreateComment, validateUpdateComment } = require('../models/comments');
const { User } = require('../models/User');


/**---------------------------------------
 * @desc Create New Comment
 * @route /api/comments
 * @method POST
 * @access private (only logged ib user)
 ----------------------------------------*/

 const createCommentCtrl = asyncHandler (async(req, res)=> {
    const {error} = validateCreateComment(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message});
    }

    console.log(req.body);
    const profile = await User.findById(req.user.id);

    const comment = await Comment.create({
        postId: req.body.postId,
        text: req.body.text,
        user: req.user.id,
        username: profile.username
    })

    res.status(201).json(comment);

 });

 /**---------------------------------------
 * @desc Get all comments
 * @route /api/comments
 * @method GET
 * @access private (only admin)
 ----------------------------------------*/

 const getAllCommentsCtrl = asyncHandler(async(req, res)=> {
    const comments = await Comment.find().populate('user');

    res.status(200).json(comments)
 });

 /**---------------------------------------
 * @desc delete comments
 * @route /api/comments/:id
 * @method DELETE
 * @access private (only admin or owner of the comment)
 ----------------------------------------*/

 const deleteCommentCtrl = asyncHandler(async(req, res)=> {
   
    const comment = await Comment.findById(req.params.id)

    if(!comment) {
        return res.status(404).json({message: 'Comment Not found'})
    }

    if(req.user.id || req.user.isAdmin === comment.user.toString()) {
        await Comment.findByIdAndDelete(req.params.id);

        res.status(200).json({message: 'comment has been deleted'});
    } else {
        res.status(403).json({message: 'access denied'})
    }

    console.log(req.user)
 });

 /**---------------------------------------
 * @desc update comments
 * @route /api/comments/:id
 * @method PUT
 * @access private (only admin or owner of the comment)
 ----------------------------------------*/

 const updateCommentCtrl = asyncHandler(async (req, res)=> {
    // console.log(req.user)
    const {error} = validateUpdateComment(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message});
    }

    const comment = await Comment.findById(req.params.id);
    if(!comment) {
        return res.status(404).json({message: 'comment not found'});
    }

    if(req.user.id !== comment.user.toString()) {
        res.status(403).json({message: 'access denied'});
    }

    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
        $set: {
            text: req.body.text
        }
    }, {new: true});

    res.status(200).json(updatedComment);
 })

 module.exports = {
    createCommentCtrl,
    getAllCommentsCtrl,
    deleteCommentCtrl,
    updateCommentCtrl
 }