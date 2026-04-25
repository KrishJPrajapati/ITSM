import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ItEmployee from "../models/itEmployee.js";

/* ================= HELPER FUNCTIONS ================= */

const generateEmployeeId = () => "EMP" + Date.now();

const validateEmployeeInput = ({
  firstName,
  lastName,
  email,
  password,
  date_joined,
  DOB,
}) => {
  return firstName && lastName && email && password && date_joined && DOB;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/* ✅ STANDARD TOKEN GENERATOR */
const generateToken = (employee) => {
  return jwt.sign(
    {
      id: employee._id,
      role: "itEmployee",
      designation: employee.designation,
      name: `${employee.firstName} ${employee.lastName}`,
      email: employee.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

/* ✅ STANDARD RESPONSE */
const buildEmployeeResponse = (employee) => ({
  id: employee._id,
  e_id: employee.e_id,
  name: `${employee.firstName} ${employee.lastName}`,
  email: employee.email,
  designation: employee.designation,
  date_joined: employee.date_joined,
});

/* ================= CREATE IT EMPLOYEE ================= */

export const createItEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      designation,
      date_joined,
      DOB,
      phoneNumber,
    } = req.body;

    if (!validateEmployeeInput(req.body)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingEmployee = await ItEmployee.findOne({ email });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "Employee with this email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const e_id = generateEmployeeId();

    const newEmployee = new ItEmployee({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      designation,
      date_joined,
      DOB,
      phoneNumber,
      e_id,
    });

    await newEmployee.save();

    res.status(201).json({
      message: "IT Employee created successfully",
      employee: buildEmployeeResponse(newEmployee),
    });
  } catch (error) {
    console.error("Create Employee Error:", error);
    res.status(500).json({
      message: "Server error while creating employee",
    });
  }
};

/* ================= LOGIN IT EMPLOYEE ================= */

export const loginItEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const employee = await ItEmployee.findOne({ email });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(employee);

    res.status(200).json({
      message: "Login successful",
      token,
      user: buildEmployeeResponse(employee), // ✅ unified key
    });
  } catch (error) {
    console.error("Login Employee Error:", error);
    res.status(500).json({
      message: "Server error during login",
    });
  }
};

/* ================= UPDATE IT EMPLOYEE ================= */

export const updateItEmployee = async (req, res) => {
  try {
    const { e_id } = req.params;

    const employee = await ItEmployee.findOne({ e_id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }

    Object.assign(employee, req.body);
    await employee.save();

    res.status(200).json({
      message: "Employee updated successfully",
      employee: buildEmployeeResponse(employee),
    });
  } catch (error) {
    console.error("Update Employee Error:", error);
    res.status(500).json({
      message: "Server error while updating employee",
    });
  }
};

/* ================= DELETE IT EMPLOYEE ================= */

export const deleteItEmployee = async (req, res) => {
  try {
    const { e_id } = req.params;

    const employee = await ItEmployee.findOneAndDelete({ e_id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Delete Employee Error:", error);
    res.status(500).json({
      message: "Server error while deleting employee",
    });
  }
};

export const getAllItEmployees = async (req, res) => {
  try {
    const employees = await ItEmployee.find().select("-password");

    res.status(200).json({
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching employees",
    });
  }
};