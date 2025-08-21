import { addPhoto, setProfilePhoto, deletePhoto } from '../services/photoService.js';

export const addPhotoController = async (req, res) => {
  try {
    const photo = await addPhoto(req.user.uid, req.file);
    res.json({ ok: true, photo });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

export const setProfilePhotoController = async (req, res) => {
  try {
    const photo = await setProfilePhoto(req.user.uid, req.params.id);
    res.json({ ok: true, photo });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

export const deletePhotoController = async (req, res) => {
  try {
    await deletePhoto(req.user.uid, req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};
