import { connectDB, GalleryItem } from './_db.js';

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
      const items = await GalleryItem.find().sort({ order: 1, createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: items.length,
        items,
      });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const item = await GalleryItem.create(body);
      return res.status(201).json({ success: true, item });
    }

    if (req.method === 'DELETE') {
      const url = new URL(req.url, 'http://localhost');
      const id = req.query.id || url.pathname.split('/').pop();
      await GalleryItem.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Item deleted' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
}

