import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    serviceType: { type: String, enum: ['Individual', 'Corporate', 'Workshop'] },
    message: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);