import express from "express";
import { verifyToken, isHrdOrAdmin } from '../middlewares/authJWT.js';
import * as absensiController from "../controllers/absensi.controller.js";

const router = express.Router();

router.post("/checkin", [verifyToken], absensiController.checkInAbsensi);
router.patch("/checkout", [verifyToken], absensiController.checkOutAbsensi);
router.get("/", [verifyToken, isHrdOrAdmin], absensiController.getAllAbsensiByDate);
router.get("/karyawan/:id", [verifyToken], absensiController.getAbsensiByKaryawanID); //
router.get("/:id", [verifyToken], absensiController.getAbsensiById); //
router.delete("/:id", [verifyToken, isHrdOrAdmin], absensiController.deleteAbsensi); //

export default router;