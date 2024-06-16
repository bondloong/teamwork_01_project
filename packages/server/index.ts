import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
const port = Number(process.env.API_SERVER_PORT) || 3001;

app.use('/api', (_, res) => {
  res.json('👋 Howdy from the server API:)');
});

app.get('*', (_, res) => {
  res.json('You are awesome)');
});

const dbUrl = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

const dbName = process.env.MONGO_INITDB_DATABASE;
const client = new MongoClient(dbUrl);

const connectDb = async (onSuccess: () => void): Promise<void> => {
  try {
    await client.connect();
    console.log('Connected successfully to datebase');

    onSuccess();

    const db = client.db(dbName);
    console.log('Database: ', db);
  } catch (error) {
    console.log('Could not connect to datebase', error);
  }
};

const startApp = (): void => {
  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
};

connectDb(startApp);
