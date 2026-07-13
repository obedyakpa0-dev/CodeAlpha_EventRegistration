const express = require('express');
const eventController = require('../controllers/event.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, eventController.createEvent);
router.get('/', eventController.getEvent);
router.get('/:id', eventController.getEventById);
router.put('/:id', auth,eventController.updateEvent);
router.delete('/:id',auth,eventController.deleteEvent);


module.exports = router;
