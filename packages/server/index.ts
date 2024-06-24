import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express from 'express';
import axios from 'axios';
import { MongoClient } from 'mongodb';

import userRoutes from './routes/userRoutes';
import topicRoutes from './routes/topicRoutes';
import commentRoutes from './routes/commentRoutes';
import likedTopicsRoutes from './routes/likedTopicsRoutes';

const app = express();
app.use(cors());
app.use(express.json()); // Добавление json middleware

const port = Number(process.env.SERVER_PORT) || 3002;

app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likedTopics', likedTopicsRoutes);

app.get('*', (_, res) => {
  res.json('You are awesome)');
});

// Вывод переменных окружения для отладки
console.log('MongoDB connection details:', process.env.DATABASE_URL);

const dbUrl =
  'mongodb+srv://admin:parol1@spaseship.whiq1c1.mongodb.net/starship?retryWrites=true&w=majority&appName=spaseship';
const client = new MongoClient(dbUrl);

const connectDb = async (onSuccess: () => void): Promise<void> => {
  try {
    await client.connect();
    console.log('Connected successfully to database');

    onSuccess();
  } catch (error) {
    console.log('Could not connect to database', error);
  }
};

const startApp = (): void => {
  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);

    axios
      .get(`http://localhost:${port}/api/users`)
      .then((response) => {
        console.log('users:', response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error);
      });

    axios
      .get(`http://localhost:${port}/api/topics`)
      .then((response) => {
        console.log('topics:', response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the topics!', error);
      });

    axios
      .get(`http://localhost:${port}/api/comments`)
      .then((response) => {
        console.log('comments:', response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the comments!', error);
      });

    axios
      .get(`http://localhost:${port}/api/likedTopics`)
      .then((response) => {
        console.log('likedTopics:', response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the likedTopics!', error);
      });
  });
};

connectDb(startApp);
