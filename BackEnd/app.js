const express=require('express');
const app=express();
 const bodyParser=require('body-parser');
 const mysql=require('mysql');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.send('welcome to the server');
})

const pool=mysql.createPool({
    connectionLimit:10,
    host            :'localhost',
    user            :'root',
    password        :"",
    database        :"mybusiness"
})


app.listen(4000,()=>{
    console.log('server listen on port 4000');
})