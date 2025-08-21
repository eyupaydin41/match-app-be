import express from 'express';
import multer from 'multer';
import supabaseAuth from '../../auth/middleware/supabaseAuth.js';
import { getProfileController,updateProfileController } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', supabaseAuth, getProfileController);
router.patch('/profile', supabaseAuth, updateProfileController);

export default router;
