// controllers/dashboardController.js

import Fee from '../models/Fee.js';
import Student from '../models/Student.js';

export const getStudentDashboard = async (req, res) => {
  try {
    let studentId;

    // 🎓 If role is student, use their own _id
    if (req.user.role === 'student') {
      studentId = req.user.linkedStudentId || req.user._id;
    }

    // 👨‍👩‍👧 If role is parent, use linked student
    if (req.user.role === 'parent') {
      if (!req.user.linkedStudentId) {
        return res.status(400).json({ message: 'No student linked to parent account.' });
      }
      studentId = req.user.linkedStudentId;
    }

    // ❌ Invalid access
    if (!studentId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const totalFees = await Fee.find({ student: studentId });
    const paidFees = totalFees.filter(fee => fee.status === 'paid');
    const unpaidFees = totalFees.filter(fee => fee.status === 'unpaid' || fee.status === 'partial');

    res.json({
      studentId,
      totalFeesCount: totalFees.length,
      paidCount: paidFees.length,
      unpaidCount: unpaidFees.length,
      unpaidTotal: unpaidFees.reduce((sum, fee) => sum + fee.amount, 0),
      latestFees: totalFees.slice(-5).reverse()
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
