const postsRouter = require('express').Router();
const { createPostCtrl, getAllPostsCtrl, getSinglePostsCtrl, getPostCountCtrl, deletePostCtrl, updatePostCtrl, updatePostImageCtrl, toggleLikeCtrl } = require('../controllers/postsController');
const photoUpload = require('../middlewares/photoUpload');
const { validateObjectId } = require('../middlewares/validateObjectId');
const {verifyToken} = require('../middlewares/verifyToken');

// /api/posts
postsRouter.route('/')
.post(verifyToken, photoUpload.single('image'), createPostCtrl)
.get(getAllPostsCtrl);

// /api/posts/count
postsRouter.route('/count').get(getPostCountCtrl);
// /api/posts/:id
postsRouter.route('/:id').get(validateObjectId, getSinglePostsCtrl)
.delete(validateObjectId, verifyToken, deletePostCtrl)
.put(validateObjectId, verifyToken,updatePostCtrl);

// /api/posts/update-image/:id
postsRouter.route('/update-image/:id')
.put(validateObjectId, verifyToken, photoUpload.single('image'), updatePostImageCtrl);


// api/post/like/:id
postsRouter.route('/like/:id').put(validateObjectId, verifyToken, toggleLikeCtrl)


module.exports = postsRouter;