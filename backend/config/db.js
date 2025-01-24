import mongoose from "mongoose";

const connectToMongo = async () => {
    const res = await mongoose.connect(
      "mongodb+srv://gofood:Sahoo1234567890@cluster0.8o0ds.mongodb.net/gallerylocal?retryWrites=true&w=majority&appName=Cluster0"
    );
    if (res) {
        console.log("Connected to Mongodb");
    }
}
export default connectToMongo