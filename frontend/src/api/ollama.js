import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});



//use an LLM to generate a message
export const generateMessage = (data) => api.post('/generate-message', data);
