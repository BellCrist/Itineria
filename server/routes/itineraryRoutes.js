import express from 'express';
import itineraryController from '../controllers/itineraryController.js';

const router = express.Router();

router.get('/itinerary-list', itineraryController.getItineraryList);
router.get('/:id', itineraryController.getItineraryById);
router.put('/:id', itineraryController.updateItinerary);
router.post('/new-itinerary', itineraryController.createItinerary);

export default router;