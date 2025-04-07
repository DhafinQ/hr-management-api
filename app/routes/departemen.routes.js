import express from "express";
import { verifyToken, isHrdOrAdmin } from '../middlewares/authJWT.js';
import * as departemenController from "../controllers/departemen.controller.js";

const router = express.Router();

router.post("/", [verifyToken, isHrdOrAdmin], departemenController.createDepartemen);
router.get("/", [verifyToken, isHrdOrAdmin], departemenController.getAllDepartemen);
router.get("/:id", [verifyToken, isHrdOrAdmin], departemenController.getDepartemenById);
router.put("/:id", [verifyToken, isHrdOrAdmin], departemenController.updateDepartemen);
router.delete("/:id", [verifyToken, isHrdOrAdmin], departemenController.deleteDepartemen);

export default router;