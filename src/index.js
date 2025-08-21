import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import userRouter from './modules/users/routes/userRoutes.js';
import authRouter from './modules/auth/routes/authRoutes.js';
import photoRouter from './modules/users/routes/photoRoutes.js';
import interactionRouter from './modules/interactions/routes/interactionRoutes.js';
import chatRouter from './modules/chat/routes/chatRoutes.js';
import "./config/associations.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/photo', photoRouter);    
app.use('/interaction', interactionRouter);
app.use('/chat', chatRouter)