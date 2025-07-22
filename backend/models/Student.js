import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    grade: { type: String },
    parentContact: { type: String },
    // ...add other fields as needed
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 🔗 Virtual field for fees
studentSchema.virtual('fees', {
  ref: 'Fee',
  localField: '_id',
  foreignField: 'student',

user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Student user login
    required: true,
    unique: true
  },
  grade: String,
  section: String,
  fees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fee'
    }
  ]
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
