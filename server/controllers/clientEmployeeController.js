import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Client from "../models/clientEmployee.js";

/* ================= HELPER FUNCTIONS ================= */

const validateClientInput = ({
  firstName,
  lastName,
  email,
  password,
  department,
  DOB,
}) => {
  return firstName && lastName && email && password && department && DOB;
};

const generateClientId = () => "CID" + Date.now();

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/* ✅ STANDARD TOKEN GENERATOR */
const generateToken = (client) => {
  return jwt.sign(
    {
      id: client._id,
      role: "clientEmployee",
      designation: client.designation,
      name: `${client.firstName} ${client.lastName}`,
      email: client.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

/* ✅ STANDARD RESPONSE */
const buildClientResponse = (client) => ({
  id: client._id,
  client_id: client.client_id,
  name: `${client.firstName} ${client.lastName}`,
  email: client.email,
  department: client.department,
  designation: client.designation,
  companyName: client.companyName,
});

/* ================= LOGIN ================= */

export const loginClientEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const isMatch = await bcrypt.compare(password, client.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(client);

    res.status(200).json({
      message: "Login successful",
      token,
      user: buildClientResponse(client), // ✅ unified key
    });
  } catch (error) {
    console.error("Client Login Error:", error);
    res.status(500).json({
      message: "Server error during login",
    });
  }
};

/* ================= CREATE CLIENT ================= */

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
      DOB,
    } = req.body;

    if (!validateClientInput(req.body)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingClient = await Client.findOne({ email });

    if (existingClient) {
      return res.status(400).json({
        message: "Client with this email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    const client_id = generateClientId();

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
      client_id,
    });

    await newClient.save();

    res.status(201).json({
      message: `Client employee created successfully by ${creatorRoleLabel}`,
      user: buildClientResponse(newClient), // ✅ unified
    });
  } catch (error) {
    console.error("Create Client Error:", error);
    res.status(500).json({
      message: "Server error while creating client employee",
    });
  }
};

export const getAllClientEmployees = async (req, res) => {
  try {
    const clients = await Client.find().select("-password");

    res.status(200).json({
      message: "Clients fetched successfully",
      clients,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching clients",
    });
  }
};
export const updateClientEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // If password is updated → hash it
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }

    Object.assign(client, req.body);
    await client.save();

    res.status(200).json({
      message: "Client updated successfully",
      user: buildClientResponse(client),
    });
  } catch (error) {
    console.error("Update Client Error:", error);
    res.status(500).json({
      message: "Server error while updating client",
    });
  }
};

export const deleteClientEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("Delete Client Error:", error);
    res.status(500).json({
      message: "Server error while deleting client",
    });
  }
};


/* ================= WRAPPERS ================= */

export const createClientByAdmin = (req, res) =>
  createClientEmployee(req, res, "Super Admin");

export const createClientByEmployee = (req, res) =>
  createClientEmployee(req, res, "Employee");