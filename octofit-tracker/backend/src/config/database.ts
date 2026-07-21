import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  await mongoose.connect(connectionString);
  console.log('Connected to octofit_db');
  return mongoose.connection;
};

export const disconnectDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    await mongoose.disconnect();
  }
};

export default mongoose.connection;
