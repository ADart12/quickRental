import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()

const URL = process.env.MONGO_DB_URL;

const connectDb = async() => {
    try{
        await mongoose.connect(URL);
        console.log("mongodb connected succesfully");
    }
        catch (err){
            console.log(err.message);
    }
}

export default connectDb;