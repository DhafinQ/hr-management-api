import express from "express";
import { verifyToken, isHrdOrAdmin } from '../middlewares/authJWT.js';
import * as cutiController from "../controllers/cuti.controller.js";

const router = express.Router();

router.post("/", [verifyToken], cutiController.createCuti);
router.get("/", [verifyToken, isHrdOrAdmin], cutiController.getAllCuti);
router.get("/karyawan/:id", [verifyToken], cutiController.getCutiByKaryawanID); //
router.get("/:id", [verifyToken], cutiController.getCutiById); //
router.put("/:id", [verifyToken, isHrdOrAdmin], cutiController.updateCutiStatus);
router.delete("/:id", [verifyToken], cutiController.deleteCuti); //

export default router;