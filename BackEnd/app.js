const express= require('express');
const mongoose=require('mongoose');
const app=express();
 const bodyParser=require('body-parser');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const url="mongodb://127.0.0.1:27017/businessLink";

mongoose.connect(url,{
    useNewUrlParser:true,useUnifiedTopology:true
})
.then(result=>console.log('database connected'))
.catch(err=>console.log(err))


app.get('/',(req,res)=>{
    res.send('welcome to the server');
})


app.listen(4000,()=>{
    console.log('server listen on port 4000');
})