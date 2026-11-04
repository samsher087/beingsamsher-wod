import { connectDB, PublicVideo } from './_db.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();

    if (req.method === 'GET') {
      const videos = await PublicVideo.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: videos.length,
        videos,
      });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const video = await PublicVideo.create(body);
      return res.status(201).json({ success: true, video });
    }

    if (req.method === 'DELETE') {
      const url = new URL(req.url, 'http://localhost');
      const id = req.query.id || url.pathname.split('/').pop();
      await PublicVideo.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Video deleted' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
}

