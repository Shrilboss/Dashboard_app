// server/routes/userRoutes.js
import express from 'express';
import { getUsers, createUser, deleteUser, updateUser } from '../controllers/userController.js';
const router = express.Router();
import authenticate from '../middleware/authMiddleware.js';

router.get('/',authenticate, getUsers);
router.post('/',authenticate, createUser);
router.put('/:id',authenticate, updateUser);
router.delete('/:id',authenticate, deleteUser);

export default router;
