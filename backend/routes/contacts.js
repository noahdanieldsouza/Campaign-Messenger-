const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactsController');

router.get('/', controller.getContacts);
router.post('/', controller.createContact);
router.put('/:id', controller.updateContact);
router.delete('/:id', controller.deleteContacts);

module.exports = router;
