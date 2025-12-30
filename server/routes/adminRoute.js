import express from 'express';
import { protect } from '../middlewares/userMiddleware.js';
import { getAllAppointments, setAvailability } from '../controllers/adminController.js';
import { admin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// middleware to protect routes
router.use(protect, admin);

// User routes
router.post('/set-availability', setAvailability);
router.get('/all-appointments', getAllAppointments);

export default router;