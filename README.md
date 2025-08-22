# About
This project includes three core functionalities: creating a contact, editing a contact, and messaging a contact. 


## To Run

In the root directory, run "docker-compose up". This will start each of the four containers: frontend, backend, ollama, and postgres_db. 

On the first build, the Ollama container will take a few minutes to run - this is because it automatically pulls the Gemma model, which can take some time. 



### Tech Stack

React – component-based and responsive. Ideal for building a dynamic UI to manage contacts and message history with minimal state management overhead.

Node.js/Express.js – lightweight and efficient. Well suited for RESTful APIs, and allows for minimal overhead in development.

PostgreSQL – reliable and robust. Perfect for storing structured data like contacts and generated messages, with strong support for relational queries.

Ollama (Gemma) – fast and local: Gemma will work even on a machine with limited disk space, enabling personalized message generation. 


### Tradeoffs

LLM choice: I selected Gemma because it is a smaller model, which helps reduce the risk of running into system resource limitations when running Ollama in a Docker container.

Message Format: Given time constraints, I chose to build a simple analytics dashboard rather than build chatbox-style messaging, as the former makes better use of my RESTful API and database. 

Error handling: To make the project more frontend-friendly (so that one might test it fully without looking at the code), I chose to display errors to the frontend rather than saving them along with metadata in a SQL table (as can help debug in large-scale applications)

Contact uniqueness: Contacts with BOTH the same name and email address are assumed to be duplicates - an error is thrown for attempting to create a duplicate contact. 
