const express = require('express');
const router = express.Router();
const ollamaController = require('../controllers/ollamaController');

router.post('/', ollamaController.generateMessage);

module.exports = router;
