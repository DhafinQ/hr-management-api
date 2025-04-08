import db from "../models/index.js";
import { Op } from "sequelize";
import bcrypt from 'bcryptjs';
import { checkAuthorization } from "../utils/auth.util.js";


const { Karyawan, Absensi } = db;

export const checkInAbsensi = async (req, res) => {
    try {

      const { StatusKehadiran } = req.body;
      const IDKaryawan = req.user.Karyawan.IDKaryawan;
      var WaktuCheckIn = new Date();
      WaktuCheckIn.setHours(WaktuCheckIn.getHours() + 7);

      const today = new Date().toISOString().split("T")[0];
      const existingRecord = await Absensi.findOne({
        where: {
          IDKaryawan: IDKaryawan,
          WaktuCheckIn: { [Op.between]:  [`${today} 00:00:00`, `${today} 23:59:59`] },
        },
      });
  
      if (existingRecord) {
        return res.status(400).json({ message: "You have already checked in today." });
      }  

      if(!StatusKehadiran){
        return res.status(400).json({ message: "All required fields must be filled!" });
      }

      let absen = null;

      if(StatusKehadiran === "Hadir"){
            absen = await Absensi.create({
            IDKaryawan,
            WaktuCheckIn,
            StatusKehadiran
          });
      }else{
        const WaktuCheckOut = WaktuCheckIn;
        absen = await Absensi.create({
            IDKaryawan,
            WaktuCheckIn,
            WaktuCheckOut,
            StatusKehadiran
          });
      }
  
      res.status(201).json({ message: "Check in stored successfully!", absen });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getAllAbsensiByDate = async (req, res) => {
    try {
      const { date } = req.query; 
  
      let whereCondition = {};
      
      if (date) {
        whereCondition.WaktuCheckIn = { [Op.gte]: new Date(date), [Op.lt]: new Date(date + "T23:59:59") };
      }
  
      const absensi = await Absensi.findAll({ where: whereCondition });
  
      if (!absensi.length) {
        return res.status(404).json({ message: "No absensi records found for the given date(s)." });
      }
  
      res.status(200).json(absensi);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getAbsensiByKaryawanID = async (req, res) => {
    try {
      const iDKaryawan = req.params.id;
      
      const authError = await checkAuthorization(req, res, ["Admin", "HRD"], iDKaryawan);
      if (authError) return authError;

      const absensiRecords = await Absensi.findAll({
        where: {IDKaryawan : iDKaryawan},
      });

      if (!absensiRecords.length) {
        return res.status(404).json({ message: "No absensi records found." });
      }  

      res.status(200).json(absensiRecords);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getAbsensiById = async (req, res) => {
    try {
      const absensi = await Absensi.findByPk(req.params.id);
      if (!absensi) {
        return res.status(404).json({ message: "Absensi not found" });
      }

      const authError = await checkAuthorization(req, res, ["Admin", "HRD"], absensi.IDKaryawan);
      if (authError) return authError;

      res.status(200).json(absensi);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const checkOutAbsensi = async (req, res) => {
      try {
        const IDKaryawan = req.user.Karyawan.IDKaryawan;
    
      const today = new Date().toISOString().split("T")[0];

        const absensi = await Absensi.findOne({
            where: {
              IDKaryawan: IDKaryawan,
              WaktuCheckIn: { [Op.between]:  [`${today} 00:00:00`, `${today} 23:59:59`] },
            },
          });
    
        if (!absensi) {
          return res.status(404).json({ message: "Absensi not found" });
        }

        if (absensi.WaktuCheckOut !== null) {
            return res.status(400).json({ message: "You have already Check out today" });
        }

        const authError = await checkAuthorization(req, res, ["Admin", "HRD"], absensi.IDKaryawan);
        if (authError) return authError;
    
        if(absensi.StatusKehadiran !== "Hadir"){
            return res.status(412).json({ message: "The kehadiran status not met the requirement for checking out" });
        }

        var WaktuCheckOut = new Date();
        WaktuCheckOut.setHours(WaktuCheckOut.getHours() + 7);

        // Update Absensi data
        await absensi.update({
            WaktuCheckOut
        });
    
        res.status(200).json({ message: "Absensi status updated successfully!", absensi });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
    
  
  export const deleteAbsensi = async (req, res) => {
    try {
      const absensi = await Absensi.findByPk(req.params.id);
      if (!absensi) {
        return res.status(404).json({ message: "Absensi not found" });
      }

      const authError = await checkAuthorization(req, res, ["Admin", "HRD"], absensi.IDKaryawan);
      if (authError) return authError;

      await absensi.destroy();
      res.status(200).json({ message: "Absensi deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };