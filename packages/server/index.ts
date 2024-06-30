import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express from 'express';
import axios from 'axios';
import { MongoClient } from 'mongodb';

import userRoutes from './routes/userRoutes';
import topicRoutes from './routes/topicRoutes';
import commentRoutes from './routes/commentRoutes';

const corsOptions = {
  origin: 'http://localhost:8080', // specify the exact origin
  credentials: true, // allow credentials
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json()); // Добавление json middleware

const port = Number(process.env.SERVER_PORT) || 3002;

app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/comments', commentRoutes);

app.get('*', (_, res) => {
  res.json('You are awesome)');
});

// Вывод переменных окружения для отладки
console.log('MongoDB connection details:', process.env.CLOUD_DEV_DB_URL);

const dbUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.CLOUD_DEV_DB_URL
    : `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_CONTAINER}:${process.env.MONGO_PORT}`;

console.log(dbUrl);
const client = new MongoClient(dbUrl || '');

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

    // todo: удалить в будущем
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
  });
};

connectDb(startApp);
