import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, lowercase: true, trim: true, default: "featured" },
    imageUrl: { type: String, required: true }, // Cloudinary URL
    published: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const GalleryItem = mongoose.model("GalleryItem", galleryItemSchema);