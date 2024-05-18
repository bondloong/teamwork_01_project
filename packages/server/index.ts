import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
dotenv.config();

import express from 'express';
import { createClientAndConnect } from './db';

const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();

app.use(
  express.static(path.join(__dirname, '..', 'client', 'dist'), {
    extensions: ['html'],
  })
);

app.get('/api', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
