# Docker Compose Configuration

## This is a HINT file - create your own docker-compose.yml

You'll need to set up services for:
1. Your application (frontend and/or backend)
2. Database 
3. Ollama

Example structure:
```yaml
version: '3.8'

services:
  # Ollama for LLM
  ollama:
    image: ollama/ollama:latest
    # What ports does Ollama need?
    # What volumes for model storage?
    
  # Database
  # What database will you use?
  # PostgreSQL? SQLite? MongoDB?
  
  # Your application
  # How will you structure this?
  # Separate frontend/backend or combined?

volumes:
  # What persistent storage do you need?
```

## Ollama Model Setup

After starting Ollama, you'll need to pull a model:
```bash
docker exec -it [container_name] ollama pull llama3.2
# or
docker exec -it [container_name] ollama pull mistral
```

## Tips
- Services can reference each other by service name
- Use environment variables for configuration
- Consider health checks and depends_on
- Remember to expose the right ports
