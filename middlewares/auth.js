const { getUser } = require('../sevice/auth');

function cheakForAuthontication(req,res,next){
    const cheakCookie = req.cookies?.token;
   
    req.user = null;
    if(!cheakCookie )
        return next();

    const token = cheakCookie;
    const user = getUser(token);

    req.user = user;
    next();
}

function authorizeRole(roles = []){
    return function cheakRole(req,res,next){
        if(!req.user) return res.redirect('/login');
        if(!roles.includes(req.user.role)) return res.end("Unauthorize");

        return next();
    }
}


module.exports = {
   cheakForAuthontication,
   authorizeRole,
};
