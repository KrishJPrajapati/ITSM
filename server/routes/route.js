import express from 'express';

// Client Controllers
import { createClientByAdmin, loginClient } from '../controllers/clientController.js';
// middleware auth
import { protect, superAdminOnly } from '../middleware/authMiddleware.js';

// Super Admin Controllers
import { loginSuperAdmin } from '../controllers/superAdminController.js';

const router = express.Router();

/* ================= CLIENT ROUTES ================= */
router.post('/clients/login', loginClient);


/* ================= SUPER ADMIN ROUTES ================= */
router.post('/nimda/login', loginSuperAdmin);

router.post('/nimda/addclients', protect, superAdminOnly, createClientByAdmin);

export default router;
