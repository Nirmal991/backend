import mongoose from "mongoose";
import { DB_NAME, MONGODB_URL } from '../constants.js';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDb connected !! DB HOST: ${connectionInstance}`);
        console.log("Mongo URI:", process.env.MONGODB_URI);
        console.log(connectionInstance.connection.host);
    } catch (error) {
        console.log();
        console.log("MONGODB CONNECTION ERROR: ", error);
        process.exit(1);
    }
}

export default connectDB;













