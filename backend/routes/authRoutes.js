import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔐 Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// 🧑‍🎓 Student dashboard (Protected for 'student' role only)
router.get('/student/dashboard', protect, authorizeRoles('student'), (req, res) => {
  res.json({ message: `Welcome, ${req.user.name}` });
});

export default router;
