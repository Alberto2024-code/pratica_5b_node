import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

// 1. Corregido: Se debe llamar a config() así
dotenv.config();

// 2. Configuración
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'proyecto_wed/novedades',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

// 3. Corregido: Usar export en lugar de module.exports
export const upload = multer({ storage: storage });