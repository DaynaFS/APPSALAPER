const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');

router.post('/send', NotificationController.sendNotification);

module.exports = router;
