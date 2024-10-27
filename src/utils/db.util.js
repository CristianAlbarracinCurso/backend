import {connect} from "mongoose";

async function dbConnection() {
    try {
        const db = await connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${db.connection.host}`);
    } catch (error) {
        console.log(error);
 
    }
}
export default dbConnection