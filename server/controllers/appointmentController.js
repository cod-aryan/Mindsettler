import Appointment from '../models/appointmentModel.js';

export const bookSession = async (req, res) => {
    try {
        const { sessionType, date, timeSlot, paymentMethod } = req.body;

        const appointment = await Appointment.create({
            user: req.user._id,
            sessionType, // Online or Offline [cite: 28]
            date,
            timeSlot,
            paymentMethod, // UPI or Cash 
            status: 'Pending' // Initial status must be Pending 
        });

        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Get logged in user appointments
// @route   GET /api/appointments/my-sessions
// @access  Private
export const getMyAppointments = async (req, res) => {
    try {
        // Find appointments belonging to the logged-in user (from protect middleware) [cite: 51]
        const appointments = await Appointment.find({ user: req.user._id })
            .sort({ createdAt: -1 }); // Show latest first

        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update appointment status (Admin Only)
// @route   PATCH /api/appointments/status/:id
// @access  Private/Admin
export const updateStatus = async (req, res) => {
    try {
        const { status, consultantId } = req.body;
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        // Admin approves and assigns a consultant
        appointment.status = status;
        if (consultantId) {
            appointment.consultant = consultantId;
        }
        await appointment.save();
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};