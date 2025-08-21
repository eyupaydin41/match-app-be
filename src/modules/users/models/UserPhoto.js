import { DataTypes } from 'sequelize';
import sequelize from '../../../config/db.js';

const UserPhoto = sequelize.define('UserPhoto', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  public_id: { type: DataTypes.STRING, allowNull: false },
  isProfile: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'user_photos' });


export default UserPhoto;