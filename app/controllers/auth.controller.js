// app/controllers/auth.controller.js
import db from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authConfig from '../config/auth.config.js';
 
const { User, Karyawan } = db;
 
export const signup = async (req, res) => {
  try {
    // Extract both Karyawan and User fields
    const { 
    NamaLengkap, NIP, IDJabatan, IDDepartemen, TanggalBergabung, 
      StatusKaryawan, NoHP, Alamat, HakAkses, email, password 
    } = req.body;

    if ( !NamaLengkap || !NIP || !TanggalBergabung || !StatusKaryawan || !HakAkses || !email || !password) {
      return res.status(400).json({ message: "All required fields must be filled!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create Karyawan first
    const karyawan = await Karyawan.create({
      NamaLengkap,
      NIP,
      IDJabatan,
      IDDepartemen,
      TanggalBergabung,
      StatusKaryawan,
      NoHP,
      Alamat,
      HakAkses,
    });

    // Create User linked to Karyawan
    const user = await User.create({
      IDKaryawan: karyawan.IDKaryawan,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully!", user, karyawan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user and include their Karyawan details
      const user = await User.findOne({
        where: { email },
        include: Karyawan, // Retrieve linked Karyawan data
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
  
      // Verify password
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ message: "Invalid password!" });
      }
  
      // Generate token
      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400, // 24 hours
      });
  
      res.status(200).json({
        id: user.id,
        email: user.email,
        karyawanId: user.Karyawan.id,
        namaLengkap: user.Karyawan.NamaLengkap,
        hakAkses: user.Karyawan.HakAkses, // Use HakAkses instead of roles
        accessToken: token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
