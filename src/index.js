// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { PORT } from './constants.js';
import { app } from './app.js';

dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        app.listen(PORT || 3000, () => {
            console.log(`Server is running on port: ${PORT}`);

        })
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })
    })
    .catch((err) => {
        console.log("MongoDb connection failed !!! ", err);

    })
















/*
import express from 'express';
const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listning on port ${provess.env.PORT}`);
            
        })

    } catch (error) {
        console.log("ERROR: ", error);
    }
})() */