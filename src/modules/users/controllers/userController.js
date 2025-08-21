import { getProfile,updateProfile } from '../services/userService.js';

export const getProfileController = async (req, res) => {
  try {
    const user = await getProfile(req.user.uid);
    res.json({ ok: true, user });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const user = await updateProfile(req.user.uid, req.body);
    res.json({ ok: true, user });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};
