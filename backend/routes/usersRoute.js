const usersRouter = require('express').Router();
const {getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, getUsersCountCtrl, profilePhotoUploadCtrl, deleteUserProfileCtrl} = require('../controllers/usersController');
const photoUpload = require('../middlewares/photoUpload');
const { validateObjectId } = require('../middlewares/validateObjectId');
const {verifyTokenAndAdmin, verifyToken,verifyTokenAndOnlyUser, verifyTokenAndAuthorization} = require('../middlewares/verifyToken');
// /api/users/profile
usersRouter.route('/profile').get(verifyTokenAndAdmin,getAllUsersCtrl);

// /api/users/profile/:id

usersRouter.route('/profile/:id')
.get(validateObjectId,getUserProfileCtrl)
.put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl)
.delete(validateObjectId, verifyTokenAndAuthorization, deleteUserProfileCtrl);



// /api/users/profile/profile-photo-upload
usersRouter.route('/profile/profile-photo-upload')
.post(verifyToken, photoUpload.single('image'),profilePhotoUploadCtrl);

// /api/users/count
usersRouter.route('/count').get(verifyTokenAndAdmin, getUsersCountCtrl);


module.exports = usersRouter;
