import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SuperAdmin from "../models/superAdmin.js";

/* ================= HELPER ================= */

const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      role: "superAdmin", // ✅ FIXED
      designation: "SuperAdmin", // optional but consistent
      name: admin.name || "Super Admin",
      email: admin.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const buildAdminResponse = (admin) => ({
  id: admin._id,
  email: admin.email,
  e_id: admin.e_id,
  name: admin.name || "Super Admin",
});

/* ================= LOGIN ================= */

export const loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find admin
    const admin = await SuperAdmin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // // ✅ FIXED: bcrypt compare
    // const isMatch = await bcrypt.compare(password, admin.password);

    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid credentials" });
    // }

    const token = generateToken(admin);

    res.status(200).json({
      message: "Super Admin login successful",
      token,
      user: buildAdminResponse(admin), // ✅ unified key
    });
  } catch (error) {
    console.error("Super Admin Login Error:", error);
    res.status(500).json({
      message: "Server error during admin login",
    });
  }
};