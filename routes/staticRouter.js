const express = require("express");
const URL = require('../model/url');
const { authorizeRole } = require("../middlewares/auth");
const router = express.Router();

router.get('/admin/urls' , authorizeRole(['ADMIN']) , async(req,res)=>{
    const allData =await URL.find({});
    res.render('home',{
        urls:allData,
    });
})

router.get('/' ,authorizeRole(['NORMAL','ADMIN']), async(req, res)=>{
 
    const allData =await URL.find({createdBy:req.user._id});
    res.render('home',{ 
        urls:allData,
    });
})

router.get('/signup' , (req,res)=>{
    return res.render('signup');
})

router.get('/login' , (req,res)=>{
    return res.render('login');
})


module.exports = router;