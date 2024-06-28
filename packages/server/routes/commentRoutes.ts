import { Router } from 'express';
import {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getCommentsByTopicId,
} from '../controllers/commentController';

const router = Router();

router.get('/', getComments);
router.get('/:id', getCommentById);
router.get('/topic/:topicId', getCommentsByTopicId);
router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;
