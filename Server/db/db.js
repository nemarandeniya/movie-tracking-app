import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connect to DB");
    } catch (error) {
        console.log();
    }
}

export default connectDb;