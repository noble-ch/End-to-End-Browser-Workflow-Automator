import mongoose from 'mongoose';

const GeminiResponseSchema = new mongoose.Schema({
  response: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.GeminiResponse || mongoose.model('GeminiResponse', GeminiResponseSchema);
