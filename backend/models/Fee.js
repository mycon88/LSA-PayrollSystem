import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['unpaid', 'paid', 'partial'],
      default: 'unpaid',
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paidAt: {
      type: Date,
    },
    remarks: {
      type: String,
    },

    // 🆕 Add these for monthly/term breakdowns
    month: {
      type: String, // e.g., 'January', 'February'
    },
    year: {
      type: Number, // e.g., 2025
    },
    term: {
      type: String, // e.g., '1st Semester', '2nd Term'
    },
  },
  {
    timestamps: true,
  }
);

const Fee = mongoose.model('Fee', feeSchema);
export default Fee;
