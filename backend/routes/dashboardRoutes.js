// routes/dashboardRoutes.js

import express from 'express';
import { getStudentDashboard } from '../controllers/dashboardController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get(
  '/student',
  protect,
  authorizeRoles('student', 'parent'),
  getStudentDashboard
);

export default router;
