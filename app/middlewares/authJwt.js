// app/middlewares/authJwt.js
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import authConfig from '../config/auth.config.js';
 
const { User, Karyawan } = db;
 
export const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
 
  if (!token) {
    return res.status(403).json({ message: 'No token provided!' });
  }
 
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), authConfig.secret);
    req.userId = decoded.id;
 
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized! No User found' });
    }
 
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized! ' + err });
  }
};
 
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, { include: Karyawan });
 
    if (user?.Karyawan?.HakAkses === 'Admin') {
      next();
      return;
    }
 
    res.status(403).json({ message: 'Require Admin Role!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
export const isHrd = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, { include: Karyawan });
 
    if (user?.Karyawan?.HakAkses === 'HRD') {
      next();
      return;
    }
 
    res.status(403).json({ message: 'Require HRD Role!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
export const isHrdOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {include: Karyawan});
 
    if (["HRD","Admin"].includes(user?.Karyawan.HakAkses)) {
      next();
      return;
    }
 
    res.status(403).json({ message: 'Require HRD or Admin Role!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};