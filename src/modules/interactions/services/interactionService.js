import { Op } from 'sequelize';
import Like from '../models/Like.js';
import Match from '../models/Match.js';
import User from '../../users/models/User.js';

export const likeUser = async (fromUserId, toUserId) => {
  if (fromUserId === toUserId) throw new Error("Kendini like edemezsin");

  const existingLike = await Like.findOne({ where: { fromUserId, toUserId } });
  if (existingLike) return existingLike;

  const like = await Like.create({ fromUserId, toUserId });

  const reverseLike = await Like.findOne({ where: { fromUserId: toUserId, toUserId: fromUserId } });
  if (reverseLike) {
    await Match.create({ userAId: fromUserId, userBId: toUserId });
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