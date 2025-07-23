import express from 'express';
import {
  getStudentFeeStatus,
  getFeeSummary,
  filterFeesByMonth,
  markFeeAsPaid,
  assignFeeToStudent,
  getFilteredFees,
  getUnpaidFees,
  getFeeHistoryByStudent,
  getMonthlyFeeBreakdown,
  payFee,
  createFee,
  getAllFees,
  getFeesByStudent,
  getAllStudentFees,
  updateFee,
  deleteFee,
} from '../controllers/feeController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Only admin/accountant can manage fees
router.post('/', authorizeRoles('admin', 'accountant'), createFee);
router.get('/', authorizeRoles('admin', 'accountant'), getAllFees);
router.get('/student/:studentId', authorizeRoles('admin', 'accountant', 'student'), getFeesByStudent);
router.put('/:id', authorizeRoles('admin', 'accountant'), updateFee);
router.delete('/:id', authorizeRoles('admin', 'accountant'), deleteFee);
// Only student can pay their own fee
router.put('/pay/:feeId', protect, authorizeRoles('student'), payFee);
// For students (view their own breakdown)
router.get('/breakdown', protect, authorizeRoles('student'), getMonthlyFeeBreakdown);

// For admin/accountant (view breakdown of a student by ID)
router.get('/breakdown/:studentId', protect, authorizeRoles('admin', 'accountant'), getMonthlyFeeBreakdown);

// 👇 Admin view route
router.get('/admin/all', protect, authorizeRoles('admin', 'accountant'), getAllStudentFees);

// Get all student fees (for admin)
router.get('/fees/all', protect, authorizeRoles('admin'), getAllFees);

// Admin or student can view history
router.get('/history/:id', protect, getFeeHistoryByStudent);

// Admin view
router.get('/all', protect, authorizeRoles('admin'), getAllFees);

// Admin or Accountant can view unpaid fees
router.get('/unpaid', protect, authorizeRoles('admin', 'accountant'), getUnpaidFees);

// Filtered fee list
router.get('/filter', protect, authorizeRoles('admin', 'accountant'), getFilteredFees);

// Admin-only: assign new fee to a student
router.post('/assign', protect, authorizeRoles('admin'), assignFeeToStudent);
router.put('/:id/pay', protect, authorizeRoles('admin', 'accountant'), markFeeAsPaid);

// 📅 Filter fees by month/year/student
router.get('/filter', protect, authorizeRoles('admin', 'accountant', 'student', 'parent'), filterFeesByMonth);
router.get('/summary', protect, authorizeRoles('admin', 'accountant', 'student', 'parent'), getFeeSummary);
router.get('/student-status', protect, authorizeRoles('student', 'parent'),
  getStudentFeeStatus);


export default router;
