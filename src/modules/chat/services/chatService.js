import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import Match from '../../interactions/models/Match.js';
import User from '../../users/models/User.js';
import { Op } from 'sequelize';

export const getUserConversationsService = async (userId) => {
  return await Conversation.findAll({
    include: [
      {
        model: Match,
        as: 'match',
        where: {
          [Op.or]: [{ userAId: userId }, { userBId: userId }]
        },
        include: [
          { model: User, as: 'userA', attributes: ['id', 'name', 'profilePhoto'] },
          { model: User, as: 'userB', attributes: ['id', 'name', 'profilePhoto'] },
        ]
      },
      {
        model: Message,
        as: 'messages',
        limit: 1,
        order: [['createdAt', 'DESC']],
        include: [{ model: User, as: 'sender', attributes: ['id', 'name', 'profilePhoto'] }]
      }
    ]
  });
};

export const getConversationByIdService = async (conversationId) => {
  return await Conversation.findOne({
    where: { id: conversationId },
    include: [
      {
        model: Message,
        as: 'messages',
        include: [
            { 
                model: User, 
                as: 'sender', 
                attributes: ['id', 'name', 'profilePhoto'] 
            }
        ]
      },
      {
        model: Match,
        as: 'match',
        include: [
          { model: User, as: 'userA', attributes: ['id', 'name', 'profilePhoto'] },
          { model: User, as: 'userB', attributes: ['id', 'name', 'profilePhoto'] },
        ]
      }
    ]
  });
};

export const sendMessageService = async (conversationId, senderId, content) => {
  return await Message.create({ conversationId, senderId, content });
};

export const getMessagesService = async (conversationId) => {
  const conversation = await Conversation.findByPk(conversationId, {
    include: [{ model: Message, as: 'messages' }]
  });
  return conversation ? conversation.messages : null;
};
