import express from 'express';
import { likeUserController, getMatchesController } from '../controllers/interactionController.js';
import supabaseAuth from '../../auth/middleware/supabaseAuth.js';

const router = express.Router();

router.post('/like', supabaseAuth, likeUserController);
router.get('/matches', supabaseAuth, getMatchesController);

export default router;
