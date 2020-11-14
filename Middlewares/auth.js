

import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';


const auth = asyncHandler( async (req,res,next) =>{
    if(!req.headers['authorization']){
        throw new Error('missing token');
    }else{
        const token = req.headers['authorization'].split(' ')[1]
        if(!token){
            throw new Error('no token Available')
        }
        const decoded = jwt.verify(token,process.env.SECRET);
          req.user = decoded ;
        next();

    }
})



export default auth;