import { DataTypes } from 'sequelize';
import sequelize from '../../../config/db.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: true },
  surname: { type: DataTypes.STRING, allowNull: true },
  birthdate: { type: DataTypes.DATE, allowNull: true },
  sex: { type: DataTypes.ENUM('ERKEK', 'KADIN'), allowNull: true },
  emailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  isPremium: { type: DataTypes.BOOLEAN, defaultValue: false },
  profilePhoto: { type: DataTypes.STRING, allowNull: true },
}, { tableName: 'users' });

export default User;
