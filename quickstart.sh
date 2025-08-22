#!/bin/bash

# Quick Start Script (Optional - for candidates who want a jumpstart)
# This just creates the basic directory structure

echo "🚀 Creating project structure..."

# Create directories
mkdir -p backend
mkdir -p frontend
mkdir -p database

# Create placeholder files
touch docker-compose.yml
touch backend/README.md
touch frontend/README.md
touch .env.example

echo "📁 Created basic structure:"
echo "  ├── backend/"
echo "  ├── frontend/"
echo "  ├── database/"
echo "  ├── docker-compose.yml"
echo "  └── .env.example"
echo ""
echo "✅ Ready to start coding!"
echo "📖 Remember to read README.md and REQUIREMENTS.md"
