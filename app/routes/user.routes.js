// app/routes/user.routes.js
import express from 'express';
import { allAccess, userBoard, adminBoard, HrdBoard } from '../controllers/user.controller.js';
import { verifyToken, isAdmin, isHrd, isHrdOrAdmin } from '../middlewares/authJWT.js';
 
const router = express.Router();
 
router.get('/all', allAccess);
 
router.get('/user', [verifyToken], userBoard);
 
router.get('/hrd', [verifyToken, isHrd], HrdBoard);
 
router.get('/admin', [verifyToken, isAdmin], adminBoard);
 
export default router;