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

// 📌 Get all unpaid fees
export const getUnpaidFees = async (req, res) => {
  try {
    const unpaidFees = await Fee.find({ status: 'unpaid' }).populate('student', 'name email');
    res.json(unpaidFees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Get fees with optional filters
export const getFilteredFees = async (req, res) => {
  try {
    const { studentId, semester, year, dueBefore, dueAfter } = req.query;

    const filter = {};

    if (studentId) filter.student = studentId;
    if (semester) filter.semester = semester;
    if (year) filter.year = Number(year);
    if (dueBefore) filter.dueDate = { ...filter.dueDate, $lte: new Date(dueBefore) };
    if (dueAfter) filter.dueDate = { ...filter.dueDate, $gte: new Date(dueAfter) };

    const fees = await Fee.find(filter).populate('student', 'name email');
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const assignFeeToStudent = async (req, res) => {
  try {
    const { studentId, amount, description, dueDate, remarks } = req.body;

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create fee record
    const fee = new Fee({
      student: studentId,
      amount,
      description,
      dueDate,
      remarks,
    });

    const savedFee = await fee.save();

    res.status(201).json({ message: 'Fee assigned successfully', fee: savedFee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const markFeeAsPaid = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMethod, receiptNumber, transactionId } = req.body;

    const fee = await Fee.findById(id);
    if (!fee) return res.status(404).json({ message: 'Fee not found' });

    fee.status = 'paid';
    fee.paidAt = new Date();
    fee.paymentMethod = paymentMethod;
    fee.receiptNumber = receiptNumber;
    fee.transactionId = transactionId;

    const updated = await fee.save();
    res.json({ message: 'Payment recorded', fee: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const filterFeesByMonth = async (req, res) => {
  const { month, year, student } = req.query;

  const query = {};
  if (month) query.month = month;
  if (year) query.year = parseInt(year);
  if (student) query.student = student;

  try {
    const fees = await Fee.find(query).populate('student', 'name email');
    const totalDue = fees
      .filter(fee => fee.status !== 'paid')
      .reduce((sum, fee) => sum + fee.amount, 0);

    res.json({
      filters: { month, year, student },
      totalDue,
      fees
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getFeeSummary = async (req, res) => {
  const { studentId } = req.query;

  try {
    const filter = {};
    if (studentId) filter.student = studentId;

    const fees = await Fee.find(filter);

    let totalAssigned = 0;
    let totalPaid = 0;
    let totalUnpaid = 0;
    let totalPartial = 0;

    fees.forEach((fee) => {
      totalAssigned += fee.amount;

      if (fee.status === 'paid') totalPaid += fee.amount;
      else if (fee.status === 'unpaid') totalUnpaid += fee.amount;
      else if (fee.status === 'partial') totalPartial += fee.amount;
    });

    const balance = totalUnpaid + totalPartial;

    res.json({
      totalAssigned,
      totalPaid,
      totalPartial,
      totalUnpaid,
      balance
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getStudentFeeStatus = async (req, res) => {
  try {
    const studentId = req.user.linkedStudentId || req.user._id; // handles student login or parent-linked

    const fees = await Fee.find({ student: studentId }).sort({ dueDate: 1 });

    const paidFees = fees.filter(fee => fee.status === 'paid');
    const unpaidFees = fees.filter(fee => fee.status === 'unpaid' || fee.status === 'partial');

    res.json({
      total: fees.length,
      paidCount: paidFees.length,
      unpaidCount: unpaidFees.length,
      paidFees,
      unpaidFees
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};