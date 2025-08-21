import { DataTypes } from 'sequelize';
import sequelize from '../../../config/db.js';
import User from '../../users/models/User.js';

const Match = sequelize.define('Match', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userAId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  userBId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, { tableName: 'matches', updatedAt: false });

User.hasMany(Match, { as: 'matchesA', foreignKey: 'userAId' });
User.hasMany(Match, { as: 'matchesB', foreignKey: 'userBId' });

Match.belongsTo(User, { as: 'userA', foreignKey: 'userAId' });
Match.belongsTo(User, { as: 'userB', foreignKey: 'userBId' });

export default Match;
