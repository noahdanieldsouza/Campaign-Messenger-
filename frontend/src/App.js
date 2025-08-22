import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateContact from './pages/CreateContact';
import EditContact from './pages/EditContact';
import MessageContact from './pages/MessageContact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-contact" element={<CreateContact />} />
        <Route path="/edit-contact" element={<EditContact />} />
        <Route path="/message-contact" element={<MessageContact />} />
      </Routes>
    </Router>
  );
}

export default App;

