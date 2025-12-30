import mongoose from "mongoose";

/**
 * 1. AVAILABILITY SCHEMA
 * Defines the pool of time slots for a specific day.
 */
const availabilitySchema = new mongoose.Schema(
  {
    date: {
      type: String, // Format: YYYY-MM-DD
      required: true 
    },
    slots: [{
      time: { type: String, required: true },
      isBooked: { type: Boolean, default: false }
    }],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Ensure only one availability document exists per date
availabilitySchema.index({ date: 1 }, { unique: true });


export const Availability = mongoose.model("Availability", availabilitySchema);