import { Op } from 'sequelize';
import Like from '../models/Like.js';
import Match from '../models/Match.js';
import User from '../../users/models/User.js';
import Conversation from '../../chat/models/Conversation.js';

export const likeUser = async (fromUserId, toUserId) => {
  if (fromUserId === toUserId) throw new Error("Kendini like edemezsin");

  const existingLike = await Like.findOne({ where: { fromUserId, toUserId } });
  if (existingLike) return existingLike;

  const like = await Like.create({ fromUserId, toUserId });

  const reverseLike = await Like.findOne({ where: { fromUserId: toUserId, toUserId: fromUserId } });
  if (reverseLike) {
    const match = await Match.create({ userAId: fromUserId, userBId: toUserId });
    await Conversation.create({ matchId: match.id })
  }

  return like;
};

export const getMatches = async (userId) => {
  return await Match.findAll({
    where: {
      [Op.or]: [{ userAId: userId }, { userBId: userId }]
    },
    include: [
      { model: User, as: 'userA', attributes: ['id', 'name', 'surname', 'profilePhoto'] },
      { model: User, as: 'userB', attributes: ['id', 'name', 'surname', 'profilePhoto'] }
    ]
  });
};