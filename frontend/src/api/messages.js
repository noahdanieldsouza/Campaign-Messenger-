import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});



//save a message in the messages table
export const createMessage = (data) => api.post('/messages', data);

//get all messages for a single contact
export const getMessagesByContact = (contactId) => api.get(`/messages/${contactId}`);

//get data about all messages
export const getMessageAnalytics = () => api.get('/messages/analytics/all');


