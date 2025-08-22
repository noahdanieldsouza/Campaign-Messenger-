# AI-Powered Outreach System

## Your Task

Build a web application that generates personalized outreach messages using Ollama (local LLM).

## Setup Instructions

### For Candidates:

1. Create a PRIVATE GitHub repository named: `mlabs-exercise-[yourname]`
2. Add collaborators (will be provided separately)
3. Complete the requirements below
4. Push your solution and notify us

## Core Requirements

### Functionality

Build a system that can:

1. **Manage Contacts**

   - Store contact information (name, company, role, etc.)
   - CRUD operations

2. **Generate Messages**

   - Connect to Ollama to generate personalized outreach
   - Support different message types (intro, follow-up, meeting request)
   - Use contact context for personalization

3. **Track History**
   - Save generated messages
   - View conversation history per contact

### Technical Stack

- **Frontend**: Your choice (React, Vue, vanilla JS, etc.)
- **Backend**: Your choice (Node.js, Python, etc.)
- **Database**: Your choice (PostgreSQL, SQLite, etc.)
- **AI**: Ollama (must run locally via Docker)

### What to Deliver

- Working application that runs with `docker compose up`
- API that handles the business logic
- UI for interacting with the system
- Basic documentation

## Evaluation Criteria

- **Functionality** (40%): Does it work as specified?
- **Code Quality** (30%): Clean, maintainable, organized
- **Architecture** (20%): Good decisions, scalable design
- **Documentation** (10%): Clear setup and usage instructions

## Time Expectation

Please spend **4-6 hours** on this exercise. Focus on core functionality over polish.

## Notes

- You'll need to set up Ollama with at least one model (llama3.2, mistral, etc.)
- Focus on demonstrating your problem-solving and coding abilities
- Make reasonable assumptions and document them
- We value working code over perfect code

## Questions?

Document any assumptions in your README. Good luck!
