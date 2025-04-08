import db from "../models/index.js";
import bcrypt from 'bcryptjs';
import { checkAuthorization } from "../utils/auth.util.js";


const { Karyawan, Cuti } = db;

export const createCuti = async (req, res) => {
    try {
      const { JenisCuti, TanggalMulai, TanggalSelesai } = req.body;

      const IDKaryawan = req.user.Karyawan.IDKaryawan;
  
      // Validate required fields
      if (!JenisCuti || !TanggalMulai || !TanggalSelesai) {
        return res.status(400).json({ message: "All required fields must be filled!" });
      }
  
      // Create Cuti first (auto-increment ID)
      const cuti = await Cuti.create({
        IDKaryawan, 
        JenisCuti,
        TanggalMulai,
        TanggalSelesai,
      });
  
  
      res.status(201).json({ message: "Cuti created successfully!", cuti });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getAllCuti = async (req, res) => {
    try {
      const cuti = await Cuti.findAll();
      res.status(200).json(cuti);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getCutiByKaryawanID = async (req, res) => {
    try {
      const iDKaryawan = req.params.id;
      
      const authError = await checkAuthorization(req, res, ["Admin", "HRD"], iDKaryawan);
      if (authError) return authError;

      const cutiRecords = await Cuti.findAll({
        where: {IDKaryawan : iDKaryawan},
      });

      if (!cutiRecords.length) {
        return res.status(404).json({ message: "No cuti records found." });
      }  

      res.status(200).json(cutiRecords);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getCutiById = async (req, res) => {
    try {
      const cuti = await Cuti.findByPk(req.params.id);
      if (!cuti) {
        return res.status(404).json({ message: "Cuti not found" });
      }

      const authError = await checkAuthorization(req, res, ["Admin", "HRD"], cuti.IDKaryawan);
      if (authError) return authError;

      res.status(200).json(cuti);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const updateCutiStatus = async (req, res) => {
      try {
        const { StatusPersetujuan } = req.body;
    
        const cuti = await Cuti.findByPk(req.params.id);
    
        if (!cuti) {
          return res.status(404).json({ message: "Cuti not found" });
        }
    
        // Update Departemen data
        await cuti.update({
          StatusPersetujuan
        });
    
    
        res.status(200).json({ message: "Cuti status updated successfully!", cuti });
      } catch (error) {
        res.status(500).json({ message: error });
      }
    };
    
  
  export const deleteCuti = async (req, res) => {
    try {
      const cuti = await Cuti.findByPk(req.params.id);
      if (!cuti) {
        return res.status(404).json({ message: "Cuti not found" });
      }

      const authError = await checkAuthorization(req, res, ["Admin", "HRD"], cuti.IDKaryawan);
      if (authError) return authError;

      if(cuti.StatusPersetujuan !== "Ditolak"){
        return res.status(412).json({ message: "Cuti condition not met the requirement for deletion" });
      }
      await cuti.destroy();
      res.status(200).json({ message: "Cuti deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };