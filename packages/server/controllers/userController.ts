import { Request, Response } from 'express';
import prisma from '../prisma';

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Missing required parameter: id' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { first_name, second_name, yandexUserId } = req.body;

  if (!first_name || !second_name || !yandexUserId) {
    res
      .status(400)
      .json({ error: 'Missing required fields: first_name, second_name, yandexUserId' });
    return;
  }

  try {
    const user = await prisma.user.create({
      data: { first_name, second_name, yandexUserId },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { first_name, second_name } = req.body;

  if (!id) {
    res.status(400).json({ error: 'Missing required parameter: id' });
    return;
  }

  if (!first_name || !second_name) {
    res.status(400).json({ error: 'Missing required fields: first_name, second_name' });
    return;
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: { first_name, second_name },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Missing required parameter: id' });
    return;
  }

  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
