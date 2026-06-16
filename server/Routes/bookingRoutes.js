import express from 'express';
import auth from '../middleWare/authMiddleware.js';
import { createBooking, updateStatus, getMyBookings } from '../controller/bookingController.js';

const router = express.Router();

router.post('/', auth, createBooking);

router.get("/my-bookings", auth, getMyBookings);

router.patch('/:id/status',auth, updateStatus);


export default router;