const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    telephone:{type:String,required:true,unique:true,max:10},
    businessName:{type:String,required:true,unique:true},
    businessAddress:{type:String,required:true},
});

const Users=mongoose.model('Users',userSchema);
module.exports=Users;