
import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const UserScheama = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:4
    }
},{
    timestamps:true
})


const User = mongoose.model('User',UserScheama)

export default User;