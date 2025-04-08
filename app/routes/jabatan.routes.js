import express from "express";
import { verifyToken, isHrdOrAdmin } from '../middlewares/authJWT.js';
import * as jabatanController from "../controllers/jabatan.controller.js";

const router = express.Router();

router.post("/", [verifyToken, isHrdOrAdmin], jabatanController.createJabatan);
router.get("/", [verifyToken, isHrdOrAdmin], jabatanController.getAllJabatan);
router.get("/:id", [verifyToken, isHrdOrAdmin], jabatanController.getJabatanById);
router.put("/:id", [verifyToken, isHrdOrAdmin], jabatanController.updateJabatan);
router.delete("/:id", [verifyToken, isHrdOrAdmin], jabatanController.deleteJabatan);

export default router;