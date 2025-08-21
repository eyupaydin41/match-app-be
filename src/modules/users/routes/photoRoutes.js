import express from 'express';
import multer from 'multer';
import { addPhotoController, setProfilePhotoController, deletePhotoController } from '../controllers/photoController.js';
import supabaseAuth from '../../auth/middleware/supabaseAuth.js';

const router = express.Router();
const upload = multer({ dest: 'tmp/' });

router.post('/', supabaseAuth, upload.single('photo'), addPhotoController);
router.patch('/:id', supabaseAuth, setProfilePhotoController);
router.delete('/:id', supabaseAuth, deletePhotoController);

export default router;
