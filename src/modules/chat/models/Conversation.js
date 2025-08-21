import { DataTypes } from 'sequelize';
import sequelize from '../../../config/db.js';
import Match from '../../interactions/models/Match.js';

const Conversation = sequelize.define('Conversation',
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    matchId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'matches', key: 'id' },
      onDelete: 'CASCADE',
    },
  },
  { tableName: 'conversations', timestamps: true }
);

export default Conversation;
