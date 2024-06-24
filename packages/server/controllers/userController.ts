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
  const { first_name, second_name, phone, login, avatar, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { first_name, second_name, phone, login, avatar, email },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { first_name, second_name, phone, login, avatar, email } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { first_name, second_name, phone, login, avatar, email },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
