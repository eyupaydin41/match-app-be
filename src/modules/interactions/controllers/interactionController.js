import { likeUser, getMatches } from '../services/interactionService.js';

export const likeUserController = async (req, res) => {
  try {
    const fromUserId = req.user.uid;
    const { toUserId } = req.body;

    const like = await likeUser(fromUserId, toUserId);
    res.status(200).json(like);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMatchesController = async (req, res) => {
  try {
    const userId = req.user.uid;
    const matches = await getMatches(userId);
    res.status(200).json(matches);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
