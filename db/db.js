import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Databse Connected Successfully");
  } catch (error) {
    console.log(error.message || error);
  }
};

export default connectDb;
