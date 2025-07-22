import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });  // load .env

import app from './app.js';
import connectDB from './config/db.js'; // ✅ use default import

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
