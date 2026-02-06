import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Client from '../models/client.js';

export const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // 2️⃣ Find client
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: client._id, role: 'client' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 5️⃣ Send response
    res.status(200).json({
      message: 'Login successful',
      token,
      client: {
        id: client._id,
        name: `${client.firstName} ${client.lastName}`,
        email: client.email
      }
    });

  } catch (error) {
    console.error('Client Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const createClientByAdmin = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      officeName,
      city,
      state,
      designation
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if email already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Client with this email already exists' });
    }

    // 🔐 Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🆔 Generate unique client ID
    const c_id = 'CID' + Date.now(); // Example: CID1700000000000

    const newClient = new Client({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
      officeName,
      city,
      state,
      designation,
      c_id
    });

    await newClient.save();

    res.status(201).json({
      message: 'Client created successfully',
      client: {
        id: newClient._id,
        c_id: newClient.c_id,
        name: `${newClient.firstName} ${newClient.lastName}`,
        email: newClient.email
      }
    });

  } catch (error) {
    console.error('Create Client Error:', error);
    res.status(500).json({ message: 'Server error while creating client' });
  }
};
