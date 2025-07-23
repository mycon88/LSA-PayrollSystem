import Payment from '../models/Payment.js';
import Fee from '../models/Fee.js';
import Student from '../models/Student.js';

// 🎯 1. Make a payment
export const makePayment = async (req, res) => {
  try {
    const { studentId, feeId, amountPaid, method, receiptNumber } = req.body;

    const fee = await Fee.findById(feeId);
    if (!fee) return res.status(404).json({ message: 'Fee not found' });

    if (fee.student.toString() !== studentId)
      return res.status(400).json({ message: 'Fee does not belong to the student' });

    // Save payment
    const payment = new Payment({
      student: studentId,
      fee: feeId,
      amountPaid,
      method,
      receiptNumber,
      recordedBy: req.user._id,
    });
    await payment.save();

    // Calculate total paid so far
    const allPayments = await Payment.find({ fee: feeId });
    const totalPaid = allPayments.reduce((sum, p) => sum + p.amountPaid, 0);

    // Update fee status
    if (totalPaid >= fee.amount) {
      fee.status = 'paid';
      fee.paidAt = new Date();
    } else if (totalPaid > 0) {
      fee.status = 'partial';
    }
    await fee.save();

    res.status(201).json({ message: 'Payment recorded', payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📄 2. Get all payments per student
export const getStudentPayments = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const payments = await Payment.find({ student: studentId })
      .populate('fee', 'description amount status')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📄 3. Get payments per fee
export const getPaymentsByFee = async (req, res) => {
  try {
    const feeId = req.params.feeId;
    const payments = await Payment.find({ fee: feeId })
      .populate('student', 'name email')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
