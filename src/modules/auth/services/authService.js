import User from '../../users/models/User.js';

export const loginService = async (supabaseUser) => {
  const [user, created] = await User.findOrCreate({
    where: { email: supabaseUser.email },
    defaults: {
      id: supabaseUser.uid,
      emailVerified: true,
      isPremium: supabaseUser.isPremium
    }
  });

  return { user, created };
};
