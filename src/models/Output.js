import mongoose from "mongoose";

// Define the Output Schema
const OutputSchema = new mongoose.Schema(
  {
    recordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Record",
      required: true,
    },
    script: {
      type: String,
      required: true,
    },
    output: {
      type: String,
    },
    imagePaths: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Output model
const Output = mongoose.models.Output || mongoose.model("Output", OutputSchema);

export default Output;
