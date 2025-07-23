// controllers/parentController.js
import Student from '../models/Student.js';
import Fee from '../models/Fee.js';

export const getParentDashboard = async (req, res) => {
  try {
    const parent = req.user;
    
    const students = await Student.find({ _id: { $in: parent.parentOf } });
    
    const fees = await Fee.find({ student: { $in: parent.parentOf } })
      .populate('student', 'name email');

    res.json({
      parent: parent.name,
      students,
      fees
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
