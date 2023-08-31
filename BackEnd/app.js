const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send('welcome to the server');
})
app.listen(4000,()=>{
    console.log('server listen on port 4000');
})