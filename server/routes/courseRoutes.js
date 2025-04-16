import express from 'express';
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getCourses);
router.post('/', authenticate, createCourse);
router.put('/:id', authenticate, updateCourse);
router.delete('/:id', authenticate, deleteCourse);

export default router;
