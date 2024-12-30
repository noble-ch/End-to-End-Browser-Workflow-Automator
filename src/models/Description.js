import mongoose from 'mongoose';

const DescriptionSchema = new mongoose.Schema(
    {
        generatedDescription: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        file: {
            type: String, // Store the file path or file URL
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Description = mongoose.models.Description || mongoose.model('Description', DescriptionSchema);

export default Description;
