import fs from 'fs/promises';
import User from '../models/User.js';
import UserPhoto from '../models/UserPhoto.js';
import cloudinary from '../../../config/cloudinary.js';

export const addPhoto = async (userId, file) => {
  const photosCount = await UserPhoto.count({ where: { userId } });
  if (photosCount >= 6) throw new Error('Max 6 fotoğraf yükleyebilirsiniz');

  const result = await cloudinary.uploader.upload(file.path, {
    folder: `istunmatch/${userId}`,
  });

  const photo = await UserPhoto.create({
    url: result.secure_url,
    public_id: result.public_id,
    isProfile: false,
    userId
  });

  await fs.unlink(file.path);

  return photo;
};


export const setProfilePhoto = async (userId, photoId) => {
  await UserPhoto.update({ isProfile: false }, { where: { userId } });

  const photo = await UserPhoto.update({ isProfile: true }, { where: { id: photoId, userId }, returning: true });
  
  if (photo[1][0]) {
    await User.update({ profilePhoto: photo[1][0].url }, { where: { id: userId } });
    return photo[1][0];
  }

  throw new Error('Fotoğraf bulunamadı');
};

export const deletePhoto = async (userId, photoId) => {
  const photo = await UserPhoto.findOne({ where: { id: photoId, userId } });
  if (!photo) throw new Error('Fotoğraf bulunamadı');

  try {
    if (photo.public_id) {
      await cloudinary.uploader.destroy(photo.public_id);
    }
    await photo.destroy();
  } catch (error) {
    console.error('Error deleting photo from cloud:', error);
    throw new Error('Fotoğraf silinirken hata oluştu');
  }

  return true;
};