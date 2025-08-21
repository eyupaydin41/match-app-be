import User from '../models/User.js';
import UserPhoto from '../models/UserPhoto.js';

export const getProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    include: { model: UserPhoto, as: 'photos' }
  });
  if (!user) throw new Error('Kullanıcı bulunamadı');
  return user;
};

export const updateProfile = async (userId, data) => {
  const allowedFields = ['name', 'surname', 'birthdate', 'sex', 'profilePhoto'];
  const updateData = {};

  for (let key of allowedFields) {
    if (data[key] !== undefined) updateData[key] = data[key];
  }

  await User.update(updateData, { where: { id: userId } });

  const updatedUser = await User.findByPk(userId, {
    include: { model: UserPhoto, as: 'photos' }
  });

  return updatedUser;
};
