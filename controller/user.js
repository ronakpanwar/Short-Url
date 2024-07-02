const User = require('../model/user');
const { v4: uuidv4 } = require('uuid');
const {setUser} = require("../sevice/auth");

async function handleSignUp(req , res){

const {name , email , password} = req.body;
await User.create({
    name , 
    email,
    password,
});

res.redirect('/');

}

async function handleLogin(req, res){
   const {email , password} = req.body;
   const user = await User.findOne({email, password});
   if(!user){
    return res.render('login' ,{
        error : "Enter correct email and password",
    });
   }


   const token = setUser(user);
   res.cookie("token" , token);

   return res.redirect('/');
}

module.exports = {
    handleSignUp,
    handleLogin,
}

