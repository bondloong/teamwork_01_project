import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByYandexUserId,
  getUserTheme,
  setUserTheme,
} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/theme/:id', getUserTheme);
router.put('/theme', setUserTheme);
router.get('/:id', getUserById);
router.get('/yandex/:yandexUserId', getUserByYandexUserId);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
