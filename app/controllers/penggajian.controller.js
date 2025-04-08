import db from "../models/index.js";
import bcrypt from 'bcryptjs';
import { checkAuthorization } from "../utils/auth.util.js";

const { Karyawan, Penggajian } = db;

export const createGaji = async (req, res) => {
    try {
        const { IDKaryawan, GajiPokok, Potongan, TanggalPembayaran } = req.body;

        // Validate required fields
        if (!IDKaryawan || !GajiPokok || !Potongan || !TanggalPembayaran) {
            return res.status(400).json({ message: "All required fields must be filled!" });
        }

        const TotalGajiBersih = GajiPokok - Potongan;

        const gaji = await Penggajian.create({
            IDKaryawan,
            GajiPokok,
            Potongan,
            TotalGajiBersih,
            TanggalPembayaran,
        });

        res.status(201).json({ message: "Gaji created successfully!", gaji });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllGaji = async (req, res) => {
    try {
        const gaji = await Penggajian.findAll();
        res.status(200).json(gaji);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getGajiByKaryawanID = async (req, res) => {
    try {
        const idKaryawan = req.params.id;

        const authError = await checkAuthorization(req, res, ["Admin", "HRD"], idKaryawan);
        if (authError) return authError;

        const gaji = await Penggajian.findAll({
            where: { IDKaryawan: idKaryawan }
        });
        res.status(200).json(gaji);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getGajiById = async (req, res) => {
    try {
        const gaji = await Penggajian.findByPk(req.params.id);

        if (!gaji) {
            return res.status(404).json({ message: "Penggajian not found" });
        }

        const authError = await checkAuthorization(req, res, ["Admin", "HRD"], gaji.IDKaryawan);
        if (authError) return authError;

        res.status(200).json(gaji);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateGaji = async (req, res) => {
    try {
        const { IDKaryawan, GajiPokok, Potongan, TanggalPembayaran } = req.body;

        // Validate required fields
        if (!IDKaryawan || !GajiPokok || !Potongan || !TanggalPembayaran) {
            return res.status(400).json({ message: "All required fields must be filled!" });
        }

        const gaji = await Penggajian.findByPk(req.params.id);

        if (!gaji) {
            return res.status(404).json({ message: "Penggajian not found" });
        }

        const TotalGajiBersih = GajiPokok - Potongan;

        // Update Departemen data
        await gaji.update({
            IDKaryawan,
            GajiPokok,
            Potongan,
            TotalGajiBersih,
            TanggalPembayaran,
        });


        res.status(200).json({ message: "Gaji updated successfully!", gaji });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};


export const deleteGaji = async (req, res) => {
    try {
        const gaji = await Penggajian.findByPk(req.params.id);
        if (!gaji) {
            return res.status(404).json({ message: "Gaji not found" });
        }
        await gaji.destroy();
        res.status(200).json({ message: "Gaji deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};