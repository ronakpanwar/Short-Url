const express = require("express");
const urlRouter = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require('./routes/user')
const path = require("path");
const cookieparser = require('cookie-parser');
const { connectMongoDB } = require("./connection");
const {cheakForAuthontication ,authorizeRole} = require("./middlewares/auth")
const URL = require("./model/url")
const app = express();
const port = 8000;

const url = "mongodb://127.0.0.1:27017/short-url";

connectMongoDB(url).then(()=>console.log("mongo connected")).catch((err)=>console.log(err));

app.set('view engine', 'ejs');  
app.set('views' , path.resolve('./views'))


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(cheakForAuthontication);

app.use('/', staticRoute);
app.use('/user' ,userRoute);
app.use('/url',authorizeRole(['NORMAL','ADMIN']), urlRouter);
 
app.listen(port , ()=>{console.log("Server start on localhost//:8000")});