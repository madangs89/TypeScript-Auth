import mongoose from "mongoose";

export const connectDb = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
