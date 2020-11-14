
import express from 'express';
import asyncHandler from 'express-async-handler'
import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check,validationResult } from 'express-validator';

import auth from '../Middlewares/auth.js'

const router = express.Router();


router.post('/register',[
    check('username','please provide a valid username').not().isEmpty(),
    check('email','please provide a valid email').isEmail(),
    check('password','password must be at least 4 digits long').isLength({
        min:4
    })
], asyncHandler (async (req,res)=>{

     const errors = validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
     }
     const { username,email,password} = req.body;
     const existingUser = await User.findOne({email:email});

     if(existingUser){
         throw new Error('User Already exists')
     }else{

        const newUser = new User({
            username,
            email,
            password
        });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUser.password,salt);

        newUser.password = hashedPassword ;

        const user = await newUser.save();
        const payload={
            _id:user._id
        }

        const token = jwt.sign(payload,process.env.SECRET,{expiresIn:60*60});
               return res.status(200).json({
                   token,
                   user
               });
     }
}))


router.post('/login',[
    check('email','please provide a valid email').isEmail(),
    check('password','please provide password').not().isEmpty()
], asyncHandler (async (req,res)=>{

     const errors = validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
     }
     const {email,password} = req.body;
     const user = await User.findOne({email:email});

     if(!user){
         throw new Error('No User Found')
     }else{
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            throw new Error('Password do not Match');
        }
        const payload = {
            _id:user._id
        }
        const token = jwt.sign(payload,process.env.SECRET,{expiresIn:60*60});
               return res.status(200).json({
                   token,
                   user
               });
     }
}))


router.get('/me',auth,asyncHandler (async (req,res)=>{
    const user = await User.findById(req.user._id).select('-password')
    if(!user){
        throw new Error('no user found')
    }
    return res.status(200).json(user);
}))



export default router;