import { Router } from 'express';
import {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
  addLikeToTopic,
  removeLikeFromTopic,
} from '../controllers/topicController';

const router = Router();

router.get('/', getTopics);
router.get('/:id', getTopicById);
router.post('/', createTopic);
router.post('/like/add', addLikeToTopic);
router.post('/like/remove', removeLikeFromTopic);
router.put('/:id', updateTopic);
router.delete('/:id', deleteTopic);

export default router;
