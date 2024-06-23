import { Router } from 'express';
import {
  getLikedTopics,
  getLikedTopicsByUser,
  getLikedTopicsByTopic,
  createLikedTopic,
  deleteLikedTopic,
} from '../controllers/likedTopicsController';

const router = Router();

router.get('/', getLikedTopics);
router.get('/user/:userId', getLikedTopicsByUser);
router.get('/topic/:topicId', getLikedTopicsByTopic);
router.post('/', createLikedTopic);
router.delete('/:id', deleteLikedTopic);

export default router;
