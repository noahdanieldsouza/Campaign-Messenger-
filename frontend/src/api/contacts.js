import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

console.log("API Base URL:", api.defaults.baseURL);


//get all contacts

export const getContacts = () => api.get('/contacts');

//create a contact given contact information
export const createContact = (data) => api.post('/contacts', data);

//update a contact with id == id given contact information
export const updateContact = (id, data) => api.put(`/contacts/${id}`, data);

//delete a contact with id ==id
export const deleteContact = (id) => api.delete(`/contacts/${id}`);
