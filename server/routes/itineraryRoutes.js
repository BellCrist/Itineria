import express from 'express';
import itineraryController from '../controllers/itineraryController.js';

const router = express.Router();

router.get('/my-itineraries', itineraryController.getItineraryList);
router.get('/search', itineraryController.searchItineraries);
router.get('/:id', itineraryController.getItineraryById);
router.put('/:id', itineraryController.updateItinerary);
router.post('/new-itinerary', itineraryController.createItinerary);
router.delete('/:id', itineraryController.deleteItinerary);

export default router;