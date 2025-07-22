import Fee from '../models/Fee.js';
import Student from '../models/Student.js';

// 💵 Create Fee for a Student
export const createFee = async (req, res) => {
  try {
    const fee = await Fee.create(req.body);
    res.status(201).json(fee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📊 Get All Fees (admin/accountant)
export const getAllFees = async (req, res) => {
  const { year, semester } = req.query;

  const query = {};
  if (year) query.year = year;
  if (semester) query.semester = semester;

  try {
    const fees = await Fee.find(query).populate('student', 'name email role');
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🧾 Get Fees for a Specific Student
export const getFeesByStudent = async (req, res) => {
  try {
    const fees = await Fee.find({ student: req.params.studentId });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🛠️ Update Fee Status or Details
export const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!fee) return res.status(404).json({ message: 'Fee not found' });
    res.json(fee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ❌ Delete Fee
export const deleteFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);
    if (!fee) return res.status(404).json({ message: 'Fee not found' });
    res.json({ message: 'Fee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const payFee = async (req, res) => {
  const { feeId } = req.params;

  try {
    const student = await Student.findOne({ user: req.user._id });

    if (!student || !student.fees.includes(feeId)) {
      return res.status(403).json({ message: 'Unauthorized or fee not assigned to you' });
    }

    const fee = await Fee.findById(feeId);
    if (!fee) return res.status(404).json({ message: 'Fee not found' });

    fee.status = 'paid';
    fee.paidAt = new Date();

    await fee.save();

    res.json({ message: 'Fee payment recorded', fee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMonthlyFeeBreakdown = async (req, res) => {
  try {
    const { year, semester } = req.query;

    // Identify student
    const studentId = req.user.role === 'student'
      ? (await Student.findOne({ user: req.user._id }))._id
      : req.params.studentId;

    // Build query
    const query = { student: studentId };
    if (year) {
      query.month = new RegExp(`\\b${year}\\b`); // Matches e.g., 'July 2025'
    }

    const allFees = await Fee.find(query).sort({ month: 1 });

    // Optional: Filter by semester
    const semesterMonths = {
      '1': ['January', 'February', 'March', 'April', 'May', 'June'],
      '2': ['July', 'August', 'September', 'October', 'November', 'December']
    };

    let filteredFees = allFees;

    if (semester && semesterMonths[semester]) {
      filteredFees = allFees.filter(fee => {
        const [monthName] = fee.month.split(' ');
        return semesterMonths[semester].includes(monthName);
      });
    }

    const breakdown = filteredFees.map(fee => ({
      month: fee.month,
      amount: fee.amount,
      status: fee.status,
      paidAt: fee.paidAt || null
    }));

    res.json(breakdown);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getAllStudentFees = async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate('student', 'name email rollNumber')
      .sort({ createdAt: -1 });

    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getFeeHistoryByStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const history = await Fee.find({ student: studentId })
      .sort({ year: -1, month: 1 }) // recent first
      .select('-__v')
      .lean();

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};