import express from 'express';
import { bookSession, updateStatus, getMyAppointments, getAvailability } from '../controllers/appointmentController.js';
import { protect } from '../middlewares/userMiddleware.js';
import { admin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// middleware to protect routes
router.use(protect);
// User routes
router.post('/book', bookSession);

// Admin only route
router.patch('/status/:id', admin, updateStatus);
router.get('/my-sessions', getMyAppointments);
router.get('/get-availability', getAvailability)

export default router;