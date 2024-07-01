import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import cors from 'cors';

import express from 'express';

import userRoutes from './routes/userRoutes';
import topicRoutes from './routes/topicRoutes';
import commentRoutes from './routes/commentRoutes';

const IS_DEV = process.env.NODE_ENV === 'development';

let processEnv: dotenv.DotenvConfigOutput;

if (IS_DEV) {
  processEnv = dotenv.config({ path: '.env.dev' });
} else {
  processEnv = dotenv.config();
}

// Библиотека dotenv-expand используетя для того, чтобы в .env файлах можно было использовать другие env-переменные при определении env-переменных: TEST1=${TEST}
dotenvExpand.expand(processEnv);

const app = express();
app.use(cors());
app.use(express.json()); // Добавление json middleware

const PORT = Number(process.env.API_SERVER_PORT);

// @TODO удалить
app.use((req, _res, next) => {
  console.log(req);

  next();
});

app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/comments', commentRoutes);

app.get('*', (_, res) => {
  res.json('You are awesome)');
});

const startApp = (): void => {
  app.listen(PORT, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${PORT}`);
  });
};

startApp();
