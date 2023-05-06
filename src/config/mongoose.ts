const mongoose = require('mongoose');
export const connect = async () => {
  const url = process.env.DB_URL;
  const dbName =process.env.DB_NAME;

  try {
    await mongoose.connect(url, {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error:any) {
    throw new Error(error)
  }
}

export const user = require('../Schemas/userSchema.ts').user;
export const adminSchema = require('../Schemas/adminSchema.ts').admin;

