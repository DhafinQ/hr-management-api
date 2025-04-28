import db from "../models/index.js";
import bcrypt from 'bcryptjs';
const { Karyawan, User } = db;

export const createKaryawan = async (req, res) => {
    try {
      const { NamaLengkap, NIP, IDJabatan, IDDepartemen, TanggalBergabung, StatusKaryawan, NoHP, Alamat, HakAkses, email, password } = req.body;
  
      // Validate required fields
      if (!NamaLengkap || !NIP || !TanggalBergabung || !StatusKaryawan || !HakAkses || !email || !password) {
        return res.status(400).json({ message: "All required fields must be filled!" });
      }
  
      // Create Karyawan first (auto-increment ID)
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
  
      // Create associated User entry
      const hashedPassword = await bcrypt.hash(password, 8);
      const user = await User.create({
        IDKaryawan: karyawan.IDKaryawan, // Auto-linked via Karyawan ID
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({ message: "Karyawan and User created successfully!", karyawan, user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const getAllKaryawan = async (req, res) => {
  try {
    const karyawan = await Karyawan.findAll();
    res.status(200).json(karyawan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getKaryawanById = async (req, res) => {
  try {
    const karyawan = await Karyawan.findByPk(req.params.id, {
        include: [{ model: User, attributes: ['email'] }], // Include related User info
      });
    if (!karyawan) {
      return res.status(404).json({ message: "Karyawan not found" });
    }

    // Flatten the structure to include email directly
    const result = {
      ...karyawan.toJSON(), // Convert Sequelize instance to plain JSON
      email: karyawan.User?.email, // Extract email from the User model
    };
    delete result.User; // Remove the User object if not needed in the response


    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateKaryawan = async (req, res) => {
    try {
      const { email, password, ...karyawanData } = req.body; // Separate User fields from Karyawan fields
  
      const karyawan = await Karyawan.findByPk(req.params.id, { include: User });
  
      if (!karyawan) {
        return res.status(404).json({ message: "Karyawan not found" });
      }
  
      // Update Karyawan data
      await karyawan.update(karyawanData);
  
      // Update associated User data (if provided)
      if (email || password) {
        const updateUser = {};
        if (email && karyawan.User &&  karyawan.User.email !== email) updateUser.email = email;
        if (password) updateUser.password = await bcrypt.hash(password, 8);
  
        await User.update(updateUser, { where: { IDKaryawan: karyawan.IDKaryawan } });
      }
  
      res.status(200).json({ message: "Karyawan and User updated successfully!", karyawan });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  

export const deleteKaryawan = async (req, res) => {
  try {
    const karyawan = await Karyawan.findByPk(req.params.id);
    if (!karyawan) {
      return res.status(404).json({ message: "Karyawan not found" });
    }
    await karyawan.destroy();
    res.status(200).json({ message: "Karyawan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};