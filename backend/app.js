const express = require('express');
const app = express();
const contactsRoutes = require('./routes/contacts');
const messageRoutes = require('./routes/messages');
const generateMessageRoute = require('./routes/ollama');
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/api/contacts', contactsRoutes);
app.use('/api/messages', messageRoutes);
app.use('/generate-message', generateMessageRoute);

module.exports = app;
