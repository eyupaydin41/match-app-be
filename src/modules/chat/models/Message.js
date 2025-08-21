import { DataTypes } from 'sequelize';
import sequelize from '../../../config/db.js';

const Message = sequelize.define('Message',
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'conversations', key: 'id' },
      onDelete: 'CASCADE',
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  { tableName: 'messages', timestamps: true }
);

export default Message;