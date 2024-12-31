import mongoose from "mongoose";

// Define the ExecutionOutput Schema
const ExecutionOutputSchema = new mongoose.Schema(
  {
    recordId: {
      type: String,
      required: true,
    },
    scriptId: {
      type: String, 
      required: true,
    },
    runCount: {
      type: Number,
      default: 0,
    },
    outputPath: {
      type: String, // Path to output files
      required: true,
    },
    runId: {
      type: String,
      required: true,
    },
    screenshots: [
      {
        path: {
          type: String, // Path to each screenshot
          required: true,
        },
        timestamp: {
          type: Date, // Time the screenshot was taken
          default: Date.now,
        },
      },
    ],
    logs: {
      type: [String], // Array of log messages
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "running", "completed", "failed"],
      default: "pending",
    },
    error: {
      type: String, // Error message if the execution fails
      default: null,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const ExecutionOutput =
  mongoose.models.ExecutionOutput ||
  mongoose.model("ExecutionOutput", ExecutionOutputSchema);

export default ExecutionOutput;
