const express= require('express');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const bodyParser=require('body-parser');
const Users=require("./Models/userSchema.js");

const SECRET_KEY='MERN_STACK';

const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//mongo database connection from localhost
const url="mongodb://127.0.0.1:27017/businessLink";

mongoose.connect(url,{
    useNewUrlParser:true,useUnifiedTopology:true
})
.then(result=>console.log('database connected'))
.catch(err=>console.log(err))


app.get('/',(req,res)=>{
    res.send('welcome to our index page')
})


app.post('/register', async (req,res)=>{
    try{
        console.log(req.body);
        const {firstName,lastName,email,telephone,password,businessName,businessAddress}=req.body;
        const hashedpassword=await bcrypt.hash(password,10);
        const newUser=new Users({firstName,lastName,email,telephone,password:hashedpassword,businessName,businessAddress});
        await newUser.save();
            return  res.status(201).json({message:"account is sucessful created"});
    }catch(error){
        console.log(error.message)
       return res.status(500).json({error:error.message});
    }

})

app.get('/register',async( req,res)=>{
    try{
        const user=await Users.find();
        console.log(user)
        return res.status(201).json(users)
    }catch(error){
        return res.status(500).json({error:"There was an error, System unable to get user"})
    }
})

app.post('/login', async (req , res)=>{
    try{
        const {email,password}=req.body;
        console.log(req.body)
        const User= await Users.findOne({email})
       
        if(!User){
            return res.status(401).json({error:'user email not found'})
        }
        //console.log(User)
        const isValidPassword= await bcrypt.compare(password,User.password)
        
        if(!isValidPassword){
            return res.status(401).json({error:'invalid user password'})
        }
        const token=jwt.sign({userId:User._id},SECRET_KEY,{expiresIn:'1hr'})
        return res.status(201).json({token:token,message:'Login is success'})
    }catch(error){
        return res.status(500).json({error:'Error  Logging in'})
    }
})


app.listen(4000,()=>{
    console.log('server listen on port 4000');
})