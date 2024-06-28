import { Request, Response } from 'express';
import prisma from '../prisma';

// Получение всех топиков
export const getTopics = async (_req: Request, res: Response): Promise<void> => {
  try {
    const topics = await prisma.topic.findMany();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
};

// Получение топика по id
export const getTopicById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Missing required parameter: id' });
    return;
  }

  try {
    const topic = await prisma.topic.findUnique({ where: { id } });
    if (!topic) {
      res.status(404).json({ error: 'Topic not found' });
    } else {
      res.json(topic);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch topic' });
  }
};

// Создание нового топика
export const createTopic = async (req: Request, res: Response): Promise<void> => {
  const { title, content, authorId } = req.body;

  if (!title || !content || !authorId) {
    res.status(400).json({ error: 'Missing required fields: title, content, authorId' });
    return;
  }

  try {
    const topic = await prisma.topic.create({
      data: { title, content, authorId },
    });
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create topic' });
  }
};

// Обновление топика
export const updateTopic = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content || !id) {
    res.status(400).json({ error: 'Missing required fields: title, content, id' });
    return;
  }

  try {
    const topic = await prisma.topic.update({
      where: { id },
      data: { title, content },
    });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update topic' });
  }
};

// Удаление топика
export const deleteTopic = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Missing required parameter: id' });
    return;
  }

  try {
    await prisma.topic.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete topic' });
  }
};

// Добавление лайка к топику
export const addLikeToTopic = async (req: Request, res: Response): Promise<void> => {
  const { topicId, userId } = req.body;

  if (!topicId || !userId) {
    res.status(400).json({ error: 'Missing required fields: topicId, userId' });
    return;
  }

  try {
    const topic = await prisma.topic.update({
      where: { id: topicId },
      data: {
        likedUsers: {
          push: userId,
        },
      },
    });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add like to topic' });
  }
};

// Удаление лайка с топика
export const removeLikeFromTopic = async (req: Request, res: Response): Promise<void> => {
  const { topicId, userId } = req.body;

  if (!topicId || !userId) {
    res.status(400).json({ error: 'Missing required fields: topicId, userId' });
    return;
  }

  try {
    const topic = await prisma.topic.update({
      where: { id: topicId },
      data: {
        likedUsers: {
          set:
            (
              await prisma.topic.findUnique({
                where: { id: topicId },
              })
            )?.likedUsers.filter((id) => id !== userId) || [],
        },
      },
    });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove like from topic' });
  }
};
