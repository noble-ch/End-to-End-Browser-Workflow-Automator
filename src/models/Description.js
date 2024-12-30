import mongoose from 'mongoose';

const DescriptionSchema = new mongoose.Schema(
  {
    generatedDescription: {
      type: String,
      required: true,
    },
    recordId: {
     type: String,
     required: true,   
    }
  },
  {
    timestamps: true,
  }
);

const Description = mongoose.models.Description || mongoose.model('Description', DescriptionSchema);

export default Description;
