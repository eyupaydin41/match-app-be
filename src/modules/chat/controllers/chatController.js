import {
  getUserConversationsService,
  getConversationByIdService,
  sendMessageService,
  getMessagesService
} from '../services/chatService.js';

export const getUserConversations = async (req, res) => {
  try {
    const userId = req.user.uid;
    const conversations = await getUserConversationsService(userId);
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getConversationById = async (req, res) => {
  try {
    const userId = req.user.uid;
    const conversationId = req.params.id;

    const conversation = await getConversationByIdService(conversationId);
    if (!conversation) return res.status(404).json({ error: 'Conversation not found' });

    const match = conversation.match;
    if (match.userAId !== userId && match.userBId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(conversation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.uid;
    const { conversationId, content } = req.body;

    const message = await sendMessageService(conversationId, senderId, content);
    if (!message) return res.status(404).json({ error: 'Conversation not found' });

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;

    const messages = await getMessagesService(conversationId);
    if (!messages) return res.status(404).json({ error: 'Conversation not found' });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
