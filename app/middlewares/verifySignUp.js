// app/middlewares/verifySignUp.js
import db from '../models/index.js';
 
const { ROLES, User, Karyawan } = db;
 
export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const karyawanByNIP = await Karyawan.findOne({
      where: { NIP: req.body.NIP }
    });
    if (karyawanByNIP) {
      return res.status(400).json({ message: 'NIP is already exist!' });
    }
 
    const userByEmail = await User.findOne({
      where: { email: req.body.email }
    });
    if (userByEmail) {
      return res.status(400).json({ message: 'Email is already exist!' });
    }
 
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (const role of req.body.roles) {
      if (!ROLES.includes(role)) {
        return res.status(400).json({ message: `Role ${role} does not exist!` });
      }
    }
  }
  next();
};