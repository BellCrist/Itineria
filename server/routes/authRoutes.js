import express from 'express';
import authController from '../controllers/authController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refreshToken);
router.get('/me', authenticateToken, authController.getCurrentUser);

export default router;