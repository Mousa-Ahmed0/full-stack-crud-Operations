const express=require('express');
require('dotenv').config();
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api',require('./api/task.api'));
//
mongoose.connect(process.env.CONNECTION_STRING,{ useNewUrlParser: true , useUnifiedTopology: true })
    .then((result)=>{
        console.log("connect db");
        app.listen(port,()=>console.log(`http://localhost:${port}`))
    })
    .catch((error)=>{
        console.log(`Error: ${error}`);
    });
//
app.get('/',(req,res)=>{
    res.send("The brave coders")
})