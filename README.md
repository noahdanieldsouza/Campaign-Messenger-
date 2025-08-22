# About
This project includes three core functionalities: creating a contact, editing a contact, and messaging a contact. It is meant to engage voters in order to drive voting turnout and ultimately build grassroots progressive power. 

## To Run

In the root directory, run "docker-compose up". This will start each of the four containers: frontend, backend, ollama, and postgres_db.

During the first build, the Ollama container will take a few minutes to run. This is because it automatically pulls the Gemma model, which can take some time. 

Open "localhost:3000" on your browser - this is the default frontend URL. 

## Example Flow

1. Select "Create New Contact", and then add at a minimum a name and an email for that contact.
2. Select "Edit Existing Contact", and fill in additional fields - this will help the LLM generate a more tailored message.
3. Select "Message a Contact", and select your contact from the drop-down. Select the message type and click "generate". The generate button will grey out while the LLM is working, and then the message will appear in an editable text box. Edit the message as you wish and then click "save" - it will appear in that contact's message history.
4. View analytics in the home page - add, edit, message, or delete contacts to see the analytics dashboard change. 


### Tech Stack

React – component-based and responsive. Ideal for building a dynamic UI to manage contacts and message history with minimal state management overhead.

Node.js/Express.js – lightweight and efficient. Well suited for RESTful APIs, and allows for minimal overhead in development.

PostgreSQL – reliable and robust. Perfect for storing structured data like contacts and generated messages, with strong support for relational queries.

Ollama (Gemma) – fast and local: Gemma will work even on a machine with limited disk space, enabling personalized message generation. 

### Project Structure

root --> docker-compose, .env setup

/frontend --> react app running on localhost:3000

/backend --> Node.js & Express API running on localhost:5000 + init.sql to initialize SQL tables

### Tradeoffs

LLM choice: I selected Gemma because it is a smaller model, which helps reduce the risk of running into system resource limitations when running Ollama in a Docker container.

Build Order: I chose to build Ollama BEFORE the frontend (in docker-compose), so that the frontend cannot be accessed until Ollama has pulled Gemma. This prevents a user from trying to generate a message before Ollama has loaded a model. 

Message Format: Given time constraints, I chose to build a simple analytics dashboard rather than a chatbox-style messaging system, as the former makes better use of my RESTful API and database. 

Error handling: To make the project more frontend-friendly (so that one might test it fully without looking at the code), I chose to display errors to the frontend rather than saving them along with metadata in a SQL table ( this can help debug in large-scale applications)

Contact uniqueness: Contacts with BOTH the same name and email address are assumed to be duplicates - an error is thrown for attempting to create a duplicate contact. 

SQL vs NoSQL: Postgres works well for this small-scale application; however, using a NoSQL database for append-only and high-write (messages) data will scale better, and the messages can naturally embed in their associated contact documents. However, Postgres has less setup locally. 

### Improvements and Next Steps: 

High priority: 

- Add a real-time messaging system (send and receive) in a chatbox-like format.
- Add user login to support the creation of multiple message chains.

Medium Priority: 

- Add support for custom model selection (LLama, etc) on a per-message basis.
- Improve contact matching - suggest "contact may already exist" for similar name + email combinations.

Low Priority: 

- Improve UI; add Movement Labs branding, headers, footers, etc.
- Add frontend documentation to help users get started
