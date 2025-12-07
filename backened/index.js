//const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/mydatabase')
mongoose.connect(process.env.MONGO_CONN)
    .then(()=> console.log("MongoDB Connected"))
    .catch((err)=>console.log(err));

const express=require('express');
const bodyParser=require('body-parser');

const Auth= require('./routes/auth');
const productRouter= require('./routes/productRouter');
const app=express();
const cors=require('cors');
app.use(cors());
require('dotenv').config();
//require('./Models/db');
const PORT =process.env.PORT || 8080;
app.get('/ping',(req,resp)=>{
    resp.send("PONG");
});
app.use(bodyParser.json());
app.use(cors());
app.use('/auth',Auth);
app.use('/products',productRouter);
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
 // app.listen(5000, () => console.log("Server running on 5000"));

})