import { Request, Response } from 'express';
import prisma from '../prisma';

export const getTopics = async (_req: Request, res: Response): Promise<void> => {
  try {
    const topics = await prisma.topic.findMany();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
};

export const getTopicById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
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

export const createTopic = async (req: Request, res: Response): Promise<void> => {
  const { title, content, authorId } = req.body;
  try {
    const topic = await prisma.topic.create({
      data: { title, content, authorId },
    });
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create topic' });
  }
};

export const updateTopic = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, content } = req.body;
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

export const deleteTopic = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.topic.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete topic' });
  }
};
