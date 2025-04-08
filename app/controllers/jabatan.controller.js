import db from "../models/index.js";
import bcrypt from 'bcryptjs';
const { Jabatan } = db;

export const createJabatan = async (req, res) => {
    try {
      const { NamaJabatan, GajiPokok, Tunjangan, DeskripsiJabatan } = req.body;
  
      // Validate required fields
      if (!NamaJabatan || !GajiPokok || !Tunjangan || !DeskripsiJabatan) {
        return res.status(400).json({ message: "All required fields must be filled!" });
      }
  
      // Create Jabatan first (auto-increment ID)
      const jabatan = await Jabatan.create({
        NamaJabatan,
        GajiPokok,
        Tunjangan,
        DeskripsiJabatan
      });
  
  
      res.status(201).json({ message: "Jabatan created successfully!", jabatan });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const getAllJabatan = async (req, res) => {
  try {
    const jabatan = await Jabatan.findAll();
    res.status(200).json(jabatan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJabatanById = async (req, res) => {
  try {
    const jabatan = await Jabatan.findByPk(req.params.id);
    if (!jabatan) {
      return res.status(404).json({ message: "Jabatan not found" });
    }
    res.status(200).json(jabatan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateJabatan = async (req, res) => {
    try {
      const { NamaJabatan, GajiPokok, Tunjangan, DeskripsiJabatan } = req.body;
  
      const jabatan = await Jabatan.findByPk(req.params.id);
  
      if (!jabatan) {
        return res.status(404).json({ message: "Jabatan not found" });
      }
  
      // Update Jabatan data
      await jabatan.update({
        NamaJabatan,
        GajiPokok,
        Tunjangan,
        DeskripsiJabatan
      });
  
  
      res.status(200).json({ message: "Jabatan updated successfully!", jabatan });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  

export const deleteJabatan= async (req, res) => {
  try {
    const jabatan = await Jabatan.findByPk(req.params.id);
    if (!jabatan) {
      return res.status(404).json({ message: "Jabatan not found" });
    }
    await jabatan.destroy();
    res.status(200).json({ message: "Jabatan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};