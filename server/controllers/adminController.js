import { Availability } from '../models/adminModel.js';
import Appointment from '../models/appointmentModel.js';
import User from '../models/userModel.js';

/**
 * @desc    Create/Update availability slots for a specific date
 * @route   POST /api/admin/availability
 * @access  Private/Admin
 */

export const setAvailability = async (req, res) => {
    try {
        let { date, slots } = req.body;
        slots = Array.isArray(slots) ? slots : JSON.parse(slots);
        // Format slots into the object structure required by the schema
        const formattedSlots = slots.map(time => ({
            time,
            isBooked: false
        }));

        // Update existing date or create new one (upsert)
        const availability = await Availability.findOneAndUpdate(
            { date },
            { slots: formattedSlots, isActive: true },
            { upsert: true, new: true }
        );

        res.status(200).json({ success: true, data: availability });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Get all appointments for Admin view
 * @route   GET /api/admin/appointments
 * @access  Private/Admin
 */
export const getPendingAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ status:"confirmed" })
            .populate('user', 'name email phone')
            .sort({ date: 1, timeSlot: 1 });

        res.status(200).json({ success: true, count:appointments.length, data: appointments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const profileUpdate = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, phone, email, gender } = req.body;
    const updates = {name, phone, email, gender, profileIsComplete: true };

    // check for email
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use by another account." });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password"); // Exclude password from response

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};