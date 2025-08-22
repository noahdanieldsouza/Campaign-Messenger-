# About
This project includes three core functionalities: creating a contact, editing a contact, and messaging a contact. 


## To Run

In the root directory, run "docker-compose up". This will start each of the four containers: frontend, backend, ollama, and postgres_db. 

On the first build, the Ollama container will take a few minutes to run - this is because it automatically pulls the Gemma model, which can take some time. 



### Decisions

React – component-based and responsive. Ideal for building a dynamic UI to manage contacts and message history with minimal state management overhead.

Node.js/Express.js – lightweight and efficient. Well suited for RESTful APIs, and allows for minimal overhead in development.

PostgreSQL – reliable and robust. Perfect for storing structured data like contacts and generated messages, with strong support for relational queries.

Ollama (Gemma) – fast and local: Gemma will work even on a machine with limited disk space, enabling personalized message generation. 


### Tradeoffs

LLM choice: I selected Gemma because it is a smaller model, which helps reduce the risk of running into system resource limitations when running Ollama in a Docker container.
