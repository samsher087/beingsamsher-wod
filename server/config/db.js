import mongoose from 'mongoose';

let cachedConn = null;

const DEFAULT_URI =
  'mongodb+srv://info_db_user:mVZnTk06RiZIiZQe@cluster0.qvxniat.mongodb.net/beingsamsher?retryWrites=true&w=majority';

export const connectDB = async () => {
  if (cachedConn && mongoose.connection.readyState >= 1) {
    return cachedConn;
  }

  const uri = process.env.MONGODB_URI || DEFAULT_URI;

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    cachedConn = conn;
    console.log(`[MongoDB Connected]: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    // Do not crash the entire process in serverless mode
    return null;
  }
};
