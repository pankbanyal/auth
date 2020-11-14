
import mongoose from 'mongoose';


const db = async ()=>{

    try {

        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true
        });

        console.log('successfully connected to the database...')
        
    } catch (error) {
       console.log(err)
        process.exit(1);
    }

}

export default db ;

