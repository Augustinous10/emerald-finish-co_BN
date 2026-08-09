import mongoose from "mongoose";

const quoteRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, default: null },
    serviceType: { type: String, default: null },
    propertyType: { type: String, default: null },
    budgetRange: { type: String, default: null },
    message: { type: String, default: null },
    status: {
      type: String,
      enum: ["new", "contacted", "quoted", "won", "lost"],
      default: "new",
    },
  },
  { timestamps: true },
);

export const QuoteRequest = mongoose.model("QuoteRequest", quoteRequestSchema);