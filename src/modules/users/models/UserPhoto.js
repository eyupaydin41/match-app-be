import { DataTypes } from 'sequelize';
import sequelize from '../../../config/db.js';
import User from './User.js';

const UserPhoto = sequelize.define('UserPhoto', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  isProfile: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'user_photos' });

User.hasMany(UserPhoto, { as: 'photos', foreignKey: 'userId' });
UserPhoto.belongsTo(User, { foreignKey: 'userId' });

export default UserPhoto;