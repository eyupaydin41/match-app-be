import Conversation from '../modules/chat/models/Conversation.js';
import Message from '../modules/chat/models/Message.js';
import User from "../modules/users/models/User.js";
import Match from '../modules/interactions/models/Match.js';
import Like from '../modules/interactions/models/Like.js';
import UserPhoto from '../modules/users/models/UserPhoto.js';

Conversation.hasMany(Message, { foreignKey: 'conversationId', as: 'messages' });
Conversation.belongsTo(Match, { foreignKey: 'matchId', as: 'match' });

Message.belongsTo(Conversation, { foreignKey: 'conversationId', as: 'conversation' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });

User.hasMany(Message, { foreignKey: 'senderId', as: 'messages' });
User.hasMany(Match, { as: 'matchesA', foreignKey: 'userAId' });
User.hasMany(Match, { as: 'matchesB', foreignKey: 'userBId' });
User.hasMany(Like, { as: 'likesGiven', foreignKey: 'fromUserId' });
User.hasMany(Like, { as: 'likesReceived', foreignKey: 'toUserId' });
User.hasMany(UserPhoto, { as: 'photos', foreignKey: 'userId' });

UserPhoto.belongsTo(User, { foreignKey: 'userId' });

Match.belongsTo(User, { as: 'userA', foreignKey: 'userAId' });
Match.belongsTo(User, { as: 'userB', foreignKey: 'userBId' });

export { Conversation, Message, User, Match, UserPhoto};
