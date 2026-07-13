const express = require("express");
const auth = require("../middleware/auth");
const registrationController = require('../controllers/registration.controller');

const router = express.Router();

router.post('/:eventId/register', auth, registrationController.register);
router.get('/', auth, registrationController.getRegistration);
router.delete('/:id', auth, registrationController.cancelRegistration)

module.exports = router;