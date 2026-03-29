import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Client from '../models/clientEmployee.js';

/* ================= HELPER FUNCTIONS ================= */

// validate required fields based on NEW schema
const validateClientInput = ({ 
  firstName, 
  lastName, 
  email, 
  password, 
  department, 
  DOB 
}) => {
  return firstName && lastName && email && password && department && DOB;
};

// generate client_id (updated name)
const generateClientId = () => 'CID' + Date.now();

// hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// response builder (aligned with new schema)
const buildClientResponse = (client) => ({
  id: client._id,
  client_id: client.client_id,
  name: `${client.firstName} ${client.lastName}`,
  email: client.email,
  department: client.department,
  designation: client.designation,
  companyName: client.companyName
});


/* ================= CLIENT EMPLOYEE LOGIN ================= */

export const loginClientEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const client = await Client.findOne({ email });
    if (!client) return res.status(404).json({ message: 'Client not found' });

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: client._id, role: 'clientEmployee', designation:client.designation },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      client: buildClientResponse(client)
    });

  } catch (error) {
    console.error('Client Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};


/* ================= COMMON CLIENT EMPLOYEE CREATION LOGIC ================= */

const createClientEmployee = async (req, res, creatorRoleLabel) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      companyName,
      officeName,
      city,
      state,
      designation,
      department,
      headName,
      DOB
    } = req.body;

    // validate required
    if (!validateClientInput(req.body)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // check existing email
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Client with this email already exists' });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // generate client_id
    const client_id = generateClientId();

    // create document
    const newClient = new Client({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
      companyName,
      officeName,
      city,
      state,
      designation,
      department,
      headName,
      DOB,
      client_id
    });

    await newClient.save();

    res.status(201).json({
      message: `Client employee created successfully by ${creatorRoleLabel}`,
      client: buildClientResponse(newClient)
    });

  } catch (error) {
    console.error('Create Client Error:', error);
    res.status(500).json({ message: 'Server error while creating client employee' });
  }
};




/* ================= ROLE-SPECIFIC WRAPPERS ================= */

export const createClientByAdmin = (req, res) =>
  createClientEmployee(req, res, 'Super Admin');

export const createClientByEmployee = (req, res) =>
  createClientEmployee(req, res, 'Employee');