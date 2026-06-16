import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config.js/dbConfig.js';



import app from './app.js';

app.use(cors());

app.get('/', (req, res) => {
    res.send("server is running ");
})


const connectDb_Run_server = async () => {
    try {
        await connectDb();

        app.listen(3000, () => {
            console.log("server is running is port 3000");
        })
    } catch (error) {
        console.log("error While connecting DB or running server: ", error)
    }
}

connectDb_Run_server();



// bhattaaditya976_db_user
// lQJ9sTj2yA2jLK3l

// mongodb+srv://bhattaaditya976_db_user:<db_password>@cluster0.rxylgeq.mongodb.net/?appName=Cluster0