import mongoose from "mongoose";

const ScheduledTaskSchema = new mongoose.Schema({
  recordId: { type: String, required: true },
  scriptId: { type: String, unique: true, required: true },
  script: { type: String, required: true },
  scheduledTime: { type: Date, required: true },
  status: { type: String, enum: ["scheduled", "completed", "canceled"], required: true },
  recurrence: { type: String, enum: ["daily", "weekly", "monthly", "one-time"], required: true },
});

export default mongoose.models.ScheduledTask || mongoose.model("ScheduledTask", ScheduledTaskSchema);
