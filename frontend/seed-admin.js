import mongoose from 'mongoose';
import { Admin } from './src/models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('Connected to MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL || 'yuvrajkumar4588@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Yuvraj@123';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = new Admin({
      email: adminEmail,
      password: adminPassword,
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);

  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seedAdmin();