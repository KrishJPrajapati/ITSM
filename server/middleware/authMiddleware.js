import jwt from "jsonwebtoken";

/* ================= PROTECT ================= */

export const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Ensure consistent structure
      req.user = {
        id: decoded.id,
        role: decoded.role,
        designation: decoded.designation,
      };

      return next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  return res.status(401).json({
    message: "Not authorized, no token",
  });
};

/* ================= GENERIC ROLE CHECK ================= */

export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied (role restriction)",
      });
    }
    next();
  };
};

/* ================= GENERIC DESIGNATION CHECK ================= */

export const allowDesignations = (...designations) => {
  return (req, res, next) => {
    if (
      !req.user ||
      !designations.includes(req.user.designation)
    ) {
      return res.status(403).json({
        message: "Access denied (designation restriction)",
      });
    }
    next();
  };
};

/* ================= COMBINED ROLE + DESIGNATION ================= */

export const allowRoleWithDesignation = (role, designations) => {
  return (req, res, next) => {
    if (
      req.user &&
      req.user.role === role &&
      designations.includes(req.user.designation)
    ) {
      return next();
    }

    return res.status(403).json({
      message: "Access denied (role + designation restriction)",
    });
  };
};

/* ================= SPECIFIC (KEEP FOR COMPATIBILITY) ================= */

// Super Admin
export const superAdminOnly = allowRoles("superAdmin");

// Client HOD / Manager
export const clientHodOrManagerOnly = allowRoleWithDesignation(
  "clientEmployee",
  ["HOD", "Manager"]
);

// IT HR / HOD
export const hrOrHodOnly = allowRoleWithDesignation(
  "itEmployee",
  ["HR", "HR Manager", "HOD"]
);