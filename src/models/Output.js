import mongoose from "mongoose";

const OutputSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  script: { type: String, required: true },
  stdout: { type: String },
  stderr: { type: String },
  screenshots: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Output || mongoose.model("Output", OutputSchema);