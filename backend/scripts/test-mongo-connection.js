/**
 * Test MongoDB Atlas connection.
 * Run: node scripts/test-mongo-connection.js
 * (from backend folder, or set NODE_PATH / use dotenv)
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('Set MONGO_URI in backend/.env');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
    console.log('Host:', mongoose.connection.host);
  } catch (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
