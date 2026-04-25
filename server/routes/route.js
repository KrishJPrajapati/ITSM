import express from "express";

/* ================= CONTROLLERS ================= */
import { getClosedTickets } from "../controllers/logController.js";
import {
  getAllClientEmployees,
  updateClientEmployee,
  deleteClientEmployee
} from "../controllers/clientEmployeeController.js";
import {
  createClientByAdmin,
  createClientByEmployee,
  loginClientEmployee,
} from "../controllers/clientEmployeeController.js";

import {
  createItEmployee,
  loginItEmployee,
  updateItEmployee,
  deleteItEmployee,
  getAllItEmployees,
} from "../controllers/itEmployeeController.js";

import {
  addClientCompany,
  updateClientCompany,
  deleteClientCompany,
  getAllClientCompanies,
} from "../controllers/clientCompanyController.js";

import {
  createTicket,
  reassignEngineer,
  trackTicket,
  getAllTickets,
  getUserTickets,
  getAssignedTickets,
  updateTicketStatus,
  sendCloseOtp,
  closeTicket,
} from "../controllers/ticketController.js";

import {
  createAsset,
  getAssets,
  updateAsset,
  deleteAsset,
} from "../controllers/assetController.js";

import { loginSuperAdmin } from "../controllers/superAdminController.js";

/* ================= MIDDLEWARE ================= */

import {
  protect,
  superAdminOnly,
  hrOrHodOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= AUTH ================= */

router.post("/clients/login", loginClientEmployee);
router.post("/employee/login", loginItEmployee);
router.post("/nimda/login", loginSuperAdmin);

/* ================= CLIENT EMPLOYEE ================= */
// CLIENT EMPLOYEE MANAGEMENT
router.get("/clients/all", protect, getAllClientEmployees);

router.put("/clients/:id", protect, updateClientEmployee);

router.delete("/clients/:id", protect, deleteClientEmployee);

// router.get("/clients/all", protect, getAllClientEmployees);

router.post(
  "/clients/create-by-admin",
  protect,
  superAdminOnly,
  createClientByAdmin
);

router.post(
  "/clients/create",
  protect,
  (req, res, next) => {
    const { role, designation } = req.user;

    if (
      (role === "clientEmployee" &&
        ["HOD", "Manager"].includes(designation)) ||
      (role === "itEmployee" &&
        ["HR", "HR Manager", "HOD"].includes(designation))
    ) {
      return next();
    }

    return res.status(403).json({
      message: "Not authorized to create client employees",
    });
  },
  createClientByEmployee
);

/* ================= IT EMPLOYEE ================= */

router.post("/employee/create", protect, hrOrHodOnly, createItEmployee);

router.post(
  "/nimda/create-employee",
  protect,
  superAdminOnly,
  createItEmployee
);

router.put("/employee/update/:e_id", protect, hrOrHodOnly, updateItEmployee);

router.delete(
  "/employee/delete/:e_id",
  protect,
  superAdminOnly,
  deleteItEmployee
);
// GET
router.get("/employee/all", protect, getAllItEmployees);

// UPDATE (uses e_id)
router.put("/employee/update/:e_id", protect, updateItEmployee);

// DELETE (uses e_id)
router.delete("/employee/delete/:e_id", protect, deleteItEmployee);

/* ================= CLIENT COMPANY ================= */
router.post("/company/create", protect, superAdminOnly, addClientCompany);

router.put(
  "/company/update/:company_id",
  protect,
  superAdminOnly,
  updateClientCompany
);

router.delete(
  "/company/delete/:company_id",
  protect,
  superAdminOnly,
  deleteClientCompany
);

router.get("/company/all", protect, getAllClientCompanies);

/* ================= TICKETS ================= */

// CREATE
router.post("/ticket/create", protect, createTicket);

// TRACK SINGLE
router.get("/ticket/:ticket_id", protect, trackTicket);

// USER VIEW (client)
router.get("/ticket/user/:email", protect, getUserTickets);

// ENGINEER VIEW
router.get("/ticket/assigned/:e_id", protect, getAssignedTickets);

// MANAGER / HOD VIEW
router.get(
  "/tickets",
  protect,
  (req, res, next) => {
    const { role, designation } = req.user;

    if (
      role === "superAdmin" ||
      (role === "itEmployee" &&
        ["HOD", "Manager", "HR", "HR Manager"].includes(designation))
    ) {
      return next();
    }

    return res.status(403).json({
      message: "Access denied to all tickets",
    });
  },
  getAllTickets
);

// STATUS UPDATE (engineer)
router.put("/ticket/status/:ticket_id", protect, updateTicketStatus);

// REASSIGN (manager / HOD only)
router.put(
  "/ticket/reassign/:ticket_id",
  protect,
  (req, res, next) => {
    const { role, designation } = req.user;

    if (
      role === "superAdmin" ||
      (role === "itEmployee" &&
        ["HOD", "Manager"].includes(designation))
    ) {
      return next();
    }

    return res.status(403).json({
      message: "Not authorized to reassign tickets",
    });
  },
  reassignEngineer
);

// OTP + CLOSE
router.post("/ticket/send-otp/:ticket_id", protect, sendCloseOtp);
router.post("/ticket/close/:ticket_id", protect, closeTicket);

/* ================= ASSETS ================= */

router.post("/asset/create", protect, createAsset);
router.get("/asset/all", protect, getAssets);
router.put("/asset/:id", protect, updateAsset);
router.delete("/asset/:id", protect, deleteAsset);

/* ================= REMOTE LOGS ================= */

router.get("/logs/closed", protect, getClosedTickets);

export default router;