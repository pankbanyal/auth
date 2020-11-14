
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import db from './database/db.js'
import UserRoutes from './Routes/UserRoutes.js';
import BlogRoutes from './Routes/BlogRoutes.js'
import cors from 'cors'
const app = express();

dotenv.config();

//connecting to the databse
db();

//applying middlewares

    // cors middlewares
    app.use(cors());

    //bodyparser middlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));




    //routes middleware
    app.use('/api/user',UserRoutes);
    app.use('/api/blog',BlogRoutes)


    // errors middlewares

    app.use((req,res,next)=>{

        const error = new Error(`Not Found- ${req.originalUrl}`)
        res.status(404)
        next(error);

    });


app.use((err,req,res,next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode ;
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack 
    })
    next();

});


app.listen(process.env.PORT,()=>{
    console.log(`server started on localhost:${process.env.PORT}`)
})



