const jwt = require('jsonwebtoken');



//verify Token 
function verifyToken(req, res, next) {
    const authToken = req.headers.authorization;
    if(authToken) {
        const token = authToken.split(' ')[1];
        try {
            const decodedPayload = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decodedPayload;
            console.log(decodedPayload);
            next()
        } catch (error) {
            
            return res.status(401).json({message: 'invalid token, access denied'});
        }
    } else {
        return res.status(401).json({message: 'No token provided, access denied'});
    }
}

//verify Token & Admin
function verifyTokenAndAdmin (req, res, next) {
    verifyToken(req, res, ()=> {
        if(req.user.isAdmin) {
            next();
        } else {
         return  res.status(403).json({message: 'you are not Authorized to access this section, only admin'});
        }
    })
}
//verify Token & only user himself
function verifyTokenAndOnlyUser(req, res, next) {
    verifyToken(req, res, ()=> {
        if(req.user.id === req.params.id) {
            next();
        } else {
         return  res.status(403).json({message: 'you are not allowed to update the user bio, only himself'});
        }
    })
}
//verify Token & Authorization
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
         return  res.status(403).json({message: 'you are not allowed to update the user bio, only himself'});
        }
    })
}


module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization
}