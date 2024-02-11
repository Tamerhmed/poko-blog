const authRouter = require('express').Router();
const {registerUserCtrl, loginUserCtrl} = require('../controllers/authController');


//api/auth/register
authRouter.post('/register', registerUserCtrl);

//api/auth/login
authRouter.post('/login', loginUserCtrl);



module.exports = authRouter;