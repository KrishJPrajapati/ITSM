import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import SuperAdmin from '../models/superAdmin.js';

export const loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
      console.log('email and pass not found')
    }

    // 2️⃣ Find admin by email
    const admin = await SuperAdmin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // 3️⃣ Compare password
    const isMatch = password === admin.password;
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: 'superadmin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 5️⃣ Send response
    res.status(200).json({
      message: 'Super Admin login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        e_id: admin.e_id
      }
    });

  } catch (error) {
    console.error('Super Admin Login Error:', error);
    res.status(500).json({ message: 'Server error during admin login' });
  }
};
