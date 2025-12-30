import { Availability } from '../models/adminModel.js';
import Appointment from '../models/appointmentModel.js';
import { Transaction, WalletTransaction } from '../models/transactionModel.js';
import User from '../models/userModel.js';

/**
 * @desc    Create/Update availability slots for a specific date
 * @route   POST /api/admin/availability
 * @access  Private/Admin
 */

export const setAvailability = async (req, res) => {
    try {
        const { date, slots } = req.body; // slots is an array of strings: ["9:00 AM", "10:00 AM"]

        // Format slots into the object structure required by the schema
        const slots_arr = JSON.parse(slots);
        const formattedSlots = slots_arr.map(time => ({
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
 * @desc    Approve a pending UPI Top-up and credit wallet
 * @route   PATCH /api/admin/approve-topup/:id
 * @access  Private/Admin
 */
export const approveTopup = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction || transaction.status !== 'Pending') {
            return res.status(400).json({ message: "Invalid transaction or already processed" });
        }
        const user = await User.findById(transaction.user);
        if (!user) return res.status(404).json({ message: "User not found" });
        // 1. Update User Balance
        user.walletBalance += transaction.amount;
        await user.save();

        // 2. Update Transaction Status
        transaction.status = 'Completed';
        await transaction.save();

        // 3. Create a record in Wallet History (Ledger)
        await WalletTransaction.create({
            user: user._id,
            amount: transaction.amount,
            type: 'credit',
            purpose: 'topup',
            status: 'completed',
            referenceId: transaction.transactionId, // Store the UPI Ref ID
            balanceAfter: user.walletBalance
        });

        res.status(200).json({ success: true, message: "Wallet topped up successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Get all appointments for Admin view
 * @route   GET /api/admin/appointments
 * @access  Private/Admin
 */
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('user', 'name email')
            .sort({ date: 1, timeSlot: 1 });

        res.status(200).json({ success: true, count:appointments.length, data: appointments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};