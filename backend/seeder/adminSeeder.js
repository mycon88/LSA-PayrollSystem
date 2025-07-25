import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ name: 'admin' });
    if (existing) {
      console.log('Admin already exists');
      process.exit();
    }

    const password = 'Admin@123456789!'; // Strong default password
    await User.create({ name: 'admin', password });

    console.log('✅ Default admin user created');
    process.exit();
  } catch (err) {
    console.error('❌ Failed to create admin:', err.message);
    process.exit(1);
  }
};

seedAdmin();
