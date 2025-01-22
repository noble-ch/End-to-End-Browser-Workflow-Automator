import mongoose from "mongoose";

const ScheduledTaskSchema = new mongoose.Schema({
  recordId: String,
  scriptId: String,
  script: String,
  scheduledTime: Date,
  recurrence: {type: String, default: "none"},
  status: { type: String, default: "pending" }, // Assuming default status is pending
});

export default mongoose.models.ScheduledTask ||
  mongoose.model("ScheduledTask", ScheduledTaskSchema);