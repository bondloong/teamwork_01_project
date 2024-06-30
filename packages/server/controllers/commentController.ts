import { Request, Response } from 'express';
import prisma from '../prisma';

export const getComments = async (_req: Request, res: Response): Promise<void> => {
  try {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

export const getCommentById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Missing required parameter: id' });
    return;
  }

  try {
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
    } else {
      res.json(comment);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comment' });
  }
};

// Получение комментариев для конкретного топика
export const getCommentsByTopicId = async (req: Request, res: Response): Promise<void> => {
  const { topicId } = req.params;

  if (!topicId) {
    res.status(400).json({ error: 'Missing required parameter: topicId' });
    return;
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { topicId },
      include: {
        author: true, // Включить все поля автора
      },
    });

    if (comments.length === 0) {
      res.status(404).json({ error: 'No comments found for this topic' });
    } else {
      res.json(comments);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

export const createComment = async (req: Request, res: Response): Promise<void> => {
  const { content, authorId, topicId } = req.body;

  if (!content || !authorId || !topicId) {
    res.status(400).json({ error: 'Missing required fields: content, authorId, topicId' });
    return;
  }

  try {
    const comment = await prisma.comment.create({
      data: { content, authorId, topicId },
      include: {
        author: true, // Включить все поля автора
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

export const updateComment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content || !id) {
    res.status(400).json({ error: 'Missing required field: content, id' });
    return;
  }

  try {
    const comment = await prisma.comment.update({
      where: { id },
      data: { content },
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Missing required parameter: id' });
    return;
  }

  try {
    await prisma.comment.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
