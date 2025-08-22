const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');

router.get('/analytics/all', controller.getAnalytics);
router.post('/', controller.createMessage);
router.get('/:contactId', controller.getMessagesByContact);


module.exports = router;
