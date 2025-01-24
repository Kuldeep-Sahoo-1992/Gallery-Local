import mongoose from "mongoose";

const connectToMongo = async () => {
    const res=await mongoose.connect("mongodb://localhost:27017/gallery")
    if (res) {
        console.log("Connected to Mongodb");
    }
}
export default connectToMongo