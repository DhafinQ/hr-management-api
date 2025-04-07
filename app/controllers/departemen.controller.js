import db from "../models/index.js";
import bcrypt from 'bcryptjs';
const { Karyawan, Departemen } = db;

export const createDepartemen = async (req, res) => {
    try {
      const { NamaDepartemen, KepalaDepartemen, KodeDepartemen } = req.body;
  
      // Validate required fields
      if (!NamaDepartemen || !KepalaDepartemen || !KodeDepartemen) {
        return res.status(400).json({ message: "All required fields must be filled!" });
      }
  
      // Create Karyawan first (auto-increment ID)
      const departemen = await Departemen.create({
        NamaDepartemen,
        KepalaDepartemen,
        KodeDepartemen,
      });
  
  
      res.status(201).json({ message: "Departemen created successfully!", departemen });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const getAllDepartemen = async (req, res) => {
  try {
    const departemen = await Departemen.findAll();
    res.status(200).json(departemen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepartemenById = async (req, res) => {
  try {
    const departemen = await Departemen.findByPk(req.params.id);
    if (!departemen) {
      return res.status(404).json({ message: "Departemen not found" });
    }
    res.status(200).json(departemen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDepartemen = async (req, res) => {
    try {
      const { NamaDepartemen, KepalaDepartemen, KodeDepartemen } = req.body;
  
      const departemen = await Departemen.findByPk(req.params.id);
  
      if (!departemen) {
        return res.status(404).json({ message: "Departemen not found" });
      }
  
      // Update Departemen data
      await departemen.update({
        NamaDepartemen,
        KepalaDepartemen,
        KodeDepartemen
      });
  
  
      res.status(200).json({ message: "Departemen updated successfully!", departemen });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  

export const deleteDepartemen= async (req, res) => {
  try {
    const departemen = await Departemen.findByPk(req.params.id);
    if (!departemen) {
      return res.status(404).json({ message: "Departemen not found" });
    }
    await departemen.destroy();
    res.status(200).json({ message: "Departemen deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};