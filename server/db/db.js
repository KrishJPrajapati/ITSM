import mongoose from 'mongoose';

const connectDB = async (USERNAME,PASSWORD) => {
  try {
    await mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ki7edur.mongodb.net/?appName=Cluster0`);
    console.log('Main MongoDB database Connected');
  } catch (error) {
    console.error('DB Connection Error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
