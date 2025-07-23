import User from '../models/User.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, contactInfo, linkedStudentId } = req.body;

    // Optional: Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({
      name,
      email,
      password,
      role,
      contactInfo,
      linkedStudentId,
    });

    await user.save();
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// 🚀 Get all users (protected route)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // hide passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};