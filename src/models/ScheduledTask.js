import mongoose from 'mongoose';

const ScheduledTaskSchema = new mongoose.Schema({
  scheduledTime: {
    type: Date,
    required: true
  },
  aIGeneratedCode: {
    type: String,
    required: true
  },
  recordId: {
    type: String,
    required: true
  }
});

const ScheduledTask = mongoose.models.ScheduledTask || mongoose.model('ScheduledTask', ScheduledTaskSchema);

export default ScheduledTask;
