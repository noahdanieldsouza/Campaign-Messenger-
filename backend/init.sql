CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    role VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50)
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    contact_id INTEGER NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    message_type VARCHAR(50),  -- e.g., 'intro', 'follow-up', 'meeting_request'
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);