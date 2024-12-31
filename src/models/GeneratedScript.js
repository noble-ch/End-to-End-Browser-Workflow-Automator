import mongoose from "mongoose";

// Define the GeneratedScript Schema
const GeneratedScriptSchema = new mongoose.Schema(
  {
    recordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Record",
      required: true,
    },
    script: {
      type: String, // The Puppeteer script as a string
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the GeneratedScript model
const GeneratedScript =
  mongoose.models.GeneratedScript ||
  mongoose.model("GeneratedScript", GeneratedScriptSchema);

export default GeneratedScript;
