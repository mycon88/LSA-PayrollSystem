import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  fee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fee',
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: ['cash', 'card', 'bank transfer', 'gcash', 'paypal'],
    required: true,
  },
  receiptNumber: {
    type: String,
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // admin/accountant who processed it
  }
}, {
  timestamps: true,
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
