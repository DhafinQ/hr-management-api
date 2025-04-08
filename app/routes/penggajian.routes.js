import express from "express";
import { verifyToken, isHrdOrAdmin } from '../middlewares/authJWT.js';
import * as penggajianController from "../controllers/penggajian.controller.js";

const router = express.Router();

router.post("/", [verifyToken, isHrdOrAdmin], penggajianController.createGaji);
router.get("/", [verifyToken, isHrdOrAdmin], penggajianController.getAllGaji);
router.get("/karyawan/:id", [verifyToken], penggajianController.getGajiByKaryawanID); //
router.get("/:id", [verifyToken], penggajianController.getGajiById); //
router.put("/:id", [verifyToken, isHrdOrAdmin], penggajianController.updateGaji);
router.delete("/:id", [verifyToken, isHrdOrAdmin], penggajianController.deleteGaji);

export default router;