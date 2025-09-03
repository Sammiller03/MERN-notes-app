import mongoose from "mongoose";

/*
export - available to other files
const - you cannot reassign a constant like final in Java
async - means you can use await, the function likely involves connecting to a Database so let so dont block others whilst waiting
*/
export const connectDB = async () => {
    try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1); // exit with failure
    }
};

