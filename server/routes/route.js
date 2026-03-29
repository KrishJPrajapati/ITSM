import express from 'express';

// Client Controllers
import { 
  createClientByAdmin, 
  createClientByEmployee, 
  loginClientEmployee 
} from '../controllers/clientEmployeeController.js';

// IT Employee Controllers
import { 
  createItEmployee,
  loginItEmployee,
  updateItEmployee,
  deleteItEmployee
} from '../controllers/itEmployeeController.js';

// middleware auth
import { 
  protect, 
  superAdminOnly,
  hrOrHodOnly,
  clientHodOrManagerOnly
} from '../middleware/authMiddleware.js';

// Client Company Controllers
import {
  addClientCompany,
  updateClientCompany,
  deleteClientCompany,
  getAllClientCompanies
} from "../controllers/clientCompanyController.js";

import {
  createTicket,
  reassignEngineer,
  trackTicket,
  getAllTickets,
  sendCloseOtp,
  closeTicket
} from "../controllers/ticketController.js";

// Super Admin Controllers
import { loginSuperAdmin } from '../controllers/superAdminController.js';

const router = express.Router();

/* ================= CLIENT EMPLOYEE ROUTES ================= */

// login
router.post('/clients/login', loginClientEmployee);

// Super Admin creates client employee
router.post('/nimda/addclients', protect, superAdminOnly, createClientByAdmin);

// client HOD or Manager creates client employee
router.post('/employee/addclients', protect, clientHodOrManagerOnly, createClientByEmployee);

// IT HOD or Manager creates client employee
router.post('/employee/addclients', protect, hrOrHodOnly, createClientByEmployee);


/* ================= SUPER ADMIN ROUTES ================= */

// login
router.post('/nimda/login', loginSuperAdmin);


/* ================= IT EMPLOYEE ROUTES ================= */

// login
router.post('/employee/login', loginItEmployee);

// HR / HR Manager / HOD can create IT employee
router.post('/employee/add-it-employee', protect, hrOrHodOnly, createItEmployee);

// Super Admin can also create IT employee
router.post('/nimda/add-it-employee', protect, superAdminOnly, createItEmployee);

// Manager
router.post('/manager/add-it-employee', protect, hrOrHodOnly, createItEmployee);

// Update employee
router.put('/employee/update/:e_id', protect, hrOrHodOnly, updateItEmployee);

// Delete employee
router.delete('/employee/delete/:e_id', protect, superAdminOnly, deleteItEmployee);

/* ================= CLIENT COMPANY ROUTES ================= */

// Super Admin manages client companies
router.post('/nimda/add-company', protect, superAdminOnly, addClientCompany);
router.put('/nimda/update-company/:company_id', protect, superAdminOnly, updateClientCompany);
router.delete('/nimda/delete-company/:company_id', protect, superAdminOnly, deleteClientCompany);
router.get('/nimda/companies', protect, superAdminOnly, getAllClientCompanies);

/* ================= TICKET ROUTES ================= */

router.post('/ticket/create', protect, createTicket);
router.put('/ticket/reassign/:ticket_id', protect, reassignEngineer);

router.get('/ticket/:ticket_id', protect, trackTicket);
router.get('/tickets', protect, getAllTickets);

router.post('/ticket/send-otp/:ticket_id', protect, sendCloseOtp);
router.post('/ticket/close/:ticket_id', protect, closeTicket);

export default router;