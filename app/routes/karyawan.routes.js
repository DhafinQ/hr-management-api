import express from "express";
import { verifyToken, isHrdOrAdmin } from '../middlewares/authJWT.js';
import * as karyawanController from "../controllers/karyawan.controller.js";

const router = express.Router();

// 🔐 Only Admin or HRD can manage Karyawan data
router.post("/", [verifyToken, isHrdOrAdmin], karyawanController.createKaryawan);
router.get("/", [verifyToken, isHrdOrAdmin], karyawanController.getAllKaryawan);
router.get("/:id", [verifyToken, isHrdOrAdmin], karyawanController.getKaryawanById);
router.put("/:id", [verifyToken, isHrdOrAdmin], karyawanController.updateKaryawan);
router.delete("/:id", [verifyToken, isHrdOrAdmin], karyawanController.deleteKaryawan);

export default router;