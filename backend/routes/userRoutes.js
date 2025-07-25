import express from 'express';
import {
  loginUser,
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/create-admin', protect, createAdmin);
router.get('/', protect, getAllAdmins);
router.put('/:id', protect, updateAdmin);     // Update admin
router.delete('/:id', protect, deleteAdmin);  // Delete admin

export default router;
