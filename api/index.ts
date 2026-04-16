import { apiApp } from '../frontend/app';
import { connectDB } from '../frontend/src/config/db';

// Connect to DB (Vercel serverless functions might reuse connections)
let isConnected = false;
const connect = async () => {
  if (isConnected) return;
  try {
    await connectDB();
    isConnected = true;
  } catch (error) {
    console.error('Failed to connect to DB in serverless function:', error);
    throw error;
  }
};

export default async (req: any, res: any) => {
  try {
    await connect();
    return apiApp(req, res);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
