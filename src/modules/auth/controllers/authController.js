import { loginService } from '../services/authService.js';
// import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

/* const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
); */

export const loginController = async (req, res) => {
  try {
    const { user, created } = await loginService(req.user);
    res.json({ ok: true, user, created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

/* export const loginMController = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(401).json({ error: error.message });

  res.json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    user: data.user
  });
} Generate jwt token using Postman */