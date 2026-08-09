import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

function makeUploader(folder) {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `ubudasa/${folder}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "avif"],
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    },
  });
  return multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB
}

export const uploadBlogCover = makeUploader("blog").single("cover");
export const uploadGalleryImage = makeUploader("gallery").single("image");