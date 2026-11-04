import { connectDB } from '../server/config/db.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  let dbStatus = 'disconnected';
  try {
    const conn = await connectDB();
    if (conn) {
      dbStatus = 'connected (' + conn.connection.host + ')';
    }
  } catch (e) {
    dbStatus = 'error: ' + e.message;
  }

  return res.status(200).json({
    status: 'online',
    database: 'MongoDB Atlas',
    connection: dbStatus,
    timestamp: new Date().toISOString(),
  });
}

