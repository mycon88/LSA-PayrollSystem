import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Login
export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    res.json({
      _id: user._id,
      name: user.name,
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// Create another admin (must be logged in)
export const createAdmin = async (req, res) => {
  const { name, password, confirmPassword } = req.body;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{14,}$/;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 14 characters and include uppercase, lowercase, number, and special character.',
      });
    }

    const exists = await User.findOne({ name });
    if (exists) return res.status(400).json({ message: 'Admin already exists with that name' });

    const user = await User.create({ name, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create admin', error: err.message });
  }
};

// Update Admin User

export const updateAdmin = async (req, res) => {
  const { name, oldPassword, password, confirmPassword } = req.body;
  const { id } = req.params;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{14,}$/;

  try {
    const admin = await User.findById(id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    // ✅ Update name if provided
    if (name) admin.name = name;

    // ✅ Handle password change
    if (password) {
      if (!oldPassword) {
        return res.status(400).json({ message: 'Old password is required to change password' });
      }

      const isMatch = await admin.matchPassword(oldPassword);
      if (!isMatch) {
        return res.status(401).json({ message: 'Old password is incorrect' });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'New passwords do not match' });
      }

      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message:
            'Password must be at least 14 characters and include uppercase, lowercase, number, and special character.',
        });
      }

      admin.password = password; // Will be hashed before save
    }

    const updated = await admin.save();
    res.json({ _id: updated._id, name: updated.name });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update admin', error: err.message });
  }
};


// Delete Admin User

export const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await User.findById(id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    await admin.deleteOne(); // ✅ use deleteOne instead of remove
    res.json({ message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete admin', error: err.message });
  }
};

// Get All Admins with Search & Pagination

export const getAllAdmins = async (req, res) => {
  const { search = '', page = 1, limit = 10 } = req.query;

  try {
    const query = {
      name: { $regex: search, $options: 'i' },
    };

    const total = await User.countDocuments(query);
    const admins = await User.find(query)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      admins,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admins', error: err.message });
  }
};
