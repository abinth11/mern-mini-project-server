const mongoose = require('mongoose');
const connect = async () => {
  const url = 'mongodb://localhost:27017';
  const dbName = 'freshBite';

  try {
    await mongoose.connect(url, {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw new Error(error)
  }
};

const user = require('../Schemas/userSchema').user;
const admin = require('../Schemas/adminSchema').admin;

module.exports = {
    connect,
    user,
    admin
}