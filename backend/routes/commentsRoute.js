const commentsRouter = require('express').Router();
const { createCommentCtrl, getAllCommentsCtrl, deleteCommentCtrl, updateCommentCtrl } = require('../controllers/commentsController');
const { verifyToken, verifyTokenAndAdmin} = require('../middlewares/verifyToken');
const {validateObjectId} = require('../middlewares/validateObjectId');


// /api/comments
commentsRouter.route('/')
.post(verifyToken, createCommentCtrl)
.get(verifyTokenAndAdmin, getAllCommentsCtrl);

// /api/comments/:id
commentsRouter.route('/:id')
.delete(validateObjectId,verifyToken, deleteCommentCtrl)
.put(validateObjectId, verifyToken, updateCommentCtrl);









module.exports = commentsRouter;