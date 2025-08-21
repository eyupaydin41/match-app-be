import express from 'express';
import { getUserConversations, getConversationById, getMessages, sendMessage } from '../controllers/chatController.js';
import supabaseAuth from '../../auth/middleware/supabaseAuth.js';

const router = express.Router();

router.get('/conversation', supabaseAuth, getUserConversations);
router.get('/conversation/:id', supabaseAuth, getConversationById);

router.get('/message/:conversationId', supabaseAuth, getMessages);
router.post('/message', supabaseAuth, sendMessage);

export default router;
