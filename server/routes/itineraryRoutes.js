import express from 'express';
import itineraryController from '../controllers/itineraryController.js';

const router = express.Router();

router.get('/itinerary-list', itineraryController.getItineraryList);

export default router;