import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';

// Force DNS to use Google's Public DNS to bypass local block
dns.setServers(['8.8.8.8', '8.8.4.4']);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const testConnection = async () => {
  try {
    console.log('Using URI:', process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@'));
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('SUCCESS: Connected to MongoDB Atlas!');
    process.exit(0);
  } catch (error) {
    console.error('FAILURE: Connection failed:', error.message);
    if (error.message.includes('querySrv')) {
        console.log('TIP: The DNS (SRV) is still blocked. Please provide the "Standard Connection String" starting with mongodb://');
    }
    process.exit(1);
  }
};

testConnection();
