import { DataTypes } from 'sequelize';
import sequelize from '../../../config/db.js';
import User from '../../users/models/User.js';

const Like = sequelize.define('Like', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  fromUserId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  toUserId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, { tableName: 'likes', updatedAt: false });

User.hasMany(Like, { as: 'likesGiven', foreignKey: 'fromUserId' });
User.hasMany(Like, { as: 'likesReceived', foreignKey: 'toUserId' });

export default Like;
