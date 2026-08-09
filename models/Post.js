import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    tags: { type: [String], default: [] },
    coverImage: { type: String, default: null }, // Cloudinary URL
    published: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true },
);

export const BlogPost = mongoose.model("BlogPost", blogPostSchema);