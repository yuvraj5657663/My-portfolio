import { apiApp } from '../frontend/app';
import { connectDB } from '../frontend/src/config/db';

// Connect to DB (Vercel serverless functions might reuse connections)
let isConnected = false;
const connect = async () => {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
};

export default async (req: any, res: any) => {
  await connect();
  return apiApp(req, res);
};
