import express from 'express';
import {
  getStudentDashboard,
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
    getStudentWithFees,
} from '../controllers/studentController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Must be logged in
router.use(protect);

// Admin or Accountant can manage students
router.post('/', authorizeRoles('admin', 'accountant'), createStudent);
router.get('/', authorizeRoles('admin', 'accountant'), getStudents);
router.get('/:id', authorizeRoles('admin', 'accountant'), getStudentById);
router.put('/:id', authorizeRoles('admin', 'accountant'), updateStudent);
router.delete('/:id', authorizeRoles('admin', 'accountant'), deleteStudent);
// 📄 Get student profile with fees
router.get('/:id/with-fees', protect, authorizeRoles('admin', 'accountant', 'student'), getStudentWithFees);
router.get('/dashboard', protect, authorizeRoles('student'), getStudentDashboard);

export default router;
