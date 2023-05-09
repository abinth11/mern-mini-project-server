import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY ,
  api_secret:process.env.API_KEY 
});

// configure multer storage to use cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'freshBite',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

// configure multer to use the storage configuration
const upload = multer({ storage: storage });

export default upload
