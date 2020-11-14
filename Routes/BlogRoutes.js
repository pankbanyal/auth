

import express from 'express';
import asyncHandler from 'express-async-handler';
import { check,validationResult } from 'express-validator';
import auth from '../Middlewares/auth.js'
import Blog from '../Models/BlogModel.js'

const router = express.Router();




router.get('/myblogs',auth,asyncHandler(async (req,res)=>{

    const blogs = await Blog.find({userId:req.user._id});
    if(!blogs){

        throw new Error('No Blogs are available..')
    }
    return res.status(200).json(blogs)
}));

router.post('/create',auth,[
    check('title','please provide title').not().isEmpty(),
    check('description','please provide description').not().isEmpty()
],asyncHandler(async (req,res)=>{


    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(500).json({error:error.array()});
    }else{

        const { title,description } = req.body;
        const newBlog = new Blog({
            userId:req.user._id,
            title,
            description
        })
        const blog = await newBlog.save()
         return res.status(200).json(blog)

    }
}));


router.get('/:blogid',auth,asyncHandler(async (req,res)=>{
    const blog = await Blog.findById(req.params.blogid);
    if(!blog){
        throw new Error('no blog Found');
    }
    return res.status(200).json(blog);
}))

router.delete('/:blogid',auth,asyncHandler(async (req,res)=>{
    await Blog.findByIdAndDelete(req.params.blogid);
    return res.status(200).json({msg:"successfully deleted"})

}))

export default router ;