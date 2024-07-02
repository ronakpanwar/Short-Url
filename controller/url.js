const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({length:8});
const URL = require('../model/url');
const fs = require("fs");

async function handleGenrateNewShotUrl(req,res){
    const body = req.body;
    const urls =await URL.find({});
   const shortid = uid.rnd();
   if(!body.url){
    return res.status(400).json({msg:"url is required"});
   }

   await URL.create({
        shortId:shortid,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.user._id,
   });
   return res.render('home', {
    id:shortid,
    
   })

}


async function handleRenderTheUrl(req,res){
    const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({shortId,},{
    $push:{
        visitHistory:{
            timestamp:Date.now(),
        }
    }
   });

   fs.appendFile('test.txt',`${Date.now()} ${shortId}`, (err)=>{
    return res.redirect(entry.redirectURL);
   });
}

async function handleShowAllData(req, res){
    const result = await URL.find({});
    res.json(result);
}


async function handleGetAnalytical(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalclics:result.visitHistory.length , analytics: result.visitHistory });
}


module.exports = {
    handleGenrateNewShotUrl,
    handleRenderTheUrl,
    handleShowAllData,
    handleGetAnalytical,
};