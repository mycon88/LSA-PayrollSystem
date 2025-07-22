import express from 'express';
import {
  createUser,
  getUsers,
  getAllUsers
} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js'; // ⬅️ split for clarity

const router = express.Router();

// Public or unprotected endpoints (if any)
// router.get('/', getUsers); // ❓ Be careful exposing unprotected routes

// Protected Routes
router.get('/all', protect, authorizeRoles('admin'), getAllUsers);

// Admin and Accountant can add users
router.post('/add', protect, authorizeRoles('admin', 'accountant'), createUser);

// Example: Admin only — redundant with /add route
router.post('/', protect, authorizeRoles('admin'), createUser); 

export default router;
