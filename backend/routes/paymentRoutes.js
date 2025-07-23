import express from 'express';
import { makePayment, getStudentPayments, getPaymentsByFee } from '../controllers/paymentController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add payment (admin or accountant only)
router.post('/', protect, authorizeRoles('admin', 'accountant'), makePayment);

// View payment history
router.get('/student/:studentId', protect, getStudentPayments);
router.get('/fee/:feeId', protect, getPaymentsByFee);

export default router;
