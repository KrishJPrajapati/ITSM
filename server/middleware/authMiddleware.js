import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // contains id + role
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const superAdminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'superadmin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Super Admin only.' });
  }
};

export const clientHodOrManagerOnly = (req, res, next) => {
  if (
    req.user &&
    req.user.role === 'clientEmployee' &&
    (req.user.designation === 'HOD' || req.user.designation === 'Manager')
  ) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Only HOD or Manager can add clients.' });
  }
};

export const hrOrHodOnly = (req, res, next) => {
  if (
    req.user &&
    req.user.role === 'employee' &&
    ['HR', 'HR Manager', 'HOD'].includes(req.user.designation)
  ) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Only HR, HR Manager, or HOD can create IT employees.' });
  }
};
