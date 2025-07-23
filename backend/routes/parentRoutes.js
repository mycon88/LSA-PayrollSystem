// routes/parentRoutes.js
import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { getParentDashboard } from '../controllers/parentController.js';

const router = express.Router();

router.get('/dashboard', protect, authorizeRoles('parent'), getParentDashboard);

export default router;
