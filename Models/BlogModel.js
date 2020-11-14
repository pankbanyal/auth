
import mongoose from 'mongoose';
const Schema = mongoose.Schema ;


const BlogSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    }
},{
    timestamps:true
})


const blog = mongoose.model('Blog',BlogSchema);


export default blog