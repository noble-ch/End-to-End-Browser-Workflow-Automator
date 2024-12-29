import mongoose from "mongoose";

const GeminiResponseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    file: {
      filename: {
        type: String,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.GeminiResponse ||
  mongoose.model("GeminiResponse", GeminiResponseSchema);
