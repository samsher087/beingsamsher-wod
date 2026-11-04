import mongoose from 'mongoose';

const DEFAULT_URI =
  'mongodb+srv://info_db_user:mVZnTk06RiZIiZQe@cluster0.qvxniat.mongodb.net/beingsamsher?retryWrites=true&w=majority';

let cachedConn = null;

async function connectToMongo() {
  if (cachedConn && mongoose.connection.readyState >= 1) {
    return cachedConn;
  }
  const uri = process.env.MONGODB_URI || DEFAULT_URI;
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    cachedConn = conn;
    return conn;
  } catch (err) {
    console.error('[Mongo Error]:', err.message);
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let dbStatus = 'disconnected';
  try {
    const conn = await connectToMongo();
    if (conn) {
      dbStatus = 'connected (' + conn.connection.host + ')';
    }
  } catch (err) {
    dbStatus = 'error: ' + err.message;
  }

  return res.status(200).json({
    status: 'online',
    database: 'MongoDB Atlas',
    connection: dbStatus,
    timestamp: new Date().toISOString(),
  });
}
