# Submission Checklist

## Before You Submit

### Repository
- [ ] Repository is PRIVATE
- [ ] Named: `mlabs-exercise-[yourname]`
- [ ] Collaborators added (as instructed)

### Code
- [ ] Application runs with `docker compose up`
- [ ] All core requirements implemented
- [ ] No hardcoded secrets or API keys
- [ ] Code is reasonably clean and organized

### Documentation
- [ ] README includes:
  - [ ] How to run the application
  - [ ] Any setup steps needed
  - [ ] Technology choices explanation
  - [ ] Any important assumptions
  - [ ] What you would improve with more time

### Functionality
- [ ] Can create/read/update/delete contacts
- [ ] Can generate messages using Ollama
- [ ] Can view message history
- [ ] Error handling for common cases

## How to Submit

1. Push all code to your private repository
2. Ensure the application works from a fresh clone:
   ```bash
   git clone [your-repo]
   cd [your-repo]
   docker compose up
   # Application should be accessible
   ```
3. Email us with:
   - Link to your private repository
   - Brief summary of your approach
   - Time spent
   - Any challenges or trade-offs

## Self-Assessment Questions

Consider including answers to these in your README:
- What architecture decisions did you make and why?
- What trade-offs did you make given the time constraint?
- What would you do differently with unlimited time?
- What part of your solution are you most proud of?
