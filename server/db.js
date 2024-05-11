const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://toorpusanthosh:admin@cluster0.uqzprwt.mongodb.net/csvparser?retryWrites=true&w=majority';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongoDB;