import express from 'express';
import supabaseAuth from '../middleware/supabaseAuth.js';
import { loginController, loginMController } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', supabaseAuth, loginController);
// router.post('/loginManually', loginMController);


export default router;