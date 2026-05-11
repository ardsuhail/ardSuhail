import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // useNewUrlParser is deprecated in Mongoose 6, so we can omit it
     const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    // Q: What is the purpose of useUnifiedTopology in Mongoose connection options?
    // A: useUnifiedTopology is an option that tells Mongoose to use the new unified topology layer for MongoDB drivers. It provides better server discovery and monitoring, and is recommended for all applications. However, in Mongoose 6 and later, this option is enabled by default, so you can safely omit it from your connection options.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
export default connectDB;