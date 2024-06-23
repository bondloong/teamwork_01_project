import { Request, Response } from 'express';
import prisma from '../prisma';

// Получение всех лайков
export const getLikedTopics = async (_req: Request, res: Response): Promise<void> => {
  try {
    const likedTopics = await prisma.likedTopics.findMany();
    res.json(likedTopics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch liked topics' });
  }
};

// Получение лайков для конкретного пользователя
export const getLikedTopicsByUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const likedTopics = await prisma.likedTopics.findMany({ where: { userId } });
    res.json(likedTopics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch liked topics for user' });
  }
};

// Получение лайков для конкретного топика
export const getLikedTopicsByTopic = async (req: Request, res: Response): Promise<void> => {
  const { topicId } = req.params;
  try {
    const likedTopics = await prisma.likedTopics.findMany({ where: { topicId } });
    res.json(likedTopics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch liked topics for topic' });
  }
};

// Создание нового лайка
export const createLikedTopic = async (req: Request, res: Response): Promise<void> => {
  const { userId, topicId } = req.body;
  try {
    const likedTopic = await prisma.likedTopics.create({
      data: { userId, topicId },
    });
    res.status(201).json(likedTopic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create liked topic' });
  }
};

// Удаление лайка
export const deleteLikedTopic = async (req: Request, res: Response): Promise<void> => {
  const { userId, topicId } = req.body;
  try {
    const likedTopic = await prisma.likedTopics.findUnique({
      where: {
        userId_topicId: {
          userId,
          topicId,
        },
      },
    });

    if (!likedTopic) {
      res.status(404).json({ error: 'Liked topic not found' });
      return;
    }

    await prisma.likedTopics.delete({
      where: {
        id: likedTopic.id,
      },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete liked topic' });
  }
};
