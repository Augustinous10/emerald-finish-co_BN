// middleware/upload.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const blogStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ubudasa/blog",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const galleryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ubudasa/gallery",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

export const uploadBlogCover = multer({ storage: blogStorage }).single("coverImage");
export const uploadGalleryImage = multer({ storage: galleryStorage }).single("image");