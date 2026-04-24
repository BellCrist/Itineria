import express from 'express';
import profileController from '../controllers/profileController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/informations', profileController.getUserData);
router.put('/save-data', authenticateToken, profileController.saveUserData);

export default router;