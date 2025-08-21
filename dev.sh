#!/bin/bash

# Development script for Skrubb Landing Page
# This script runs both the backend server and CSS watch process

echo "🚀 Starting Skrubb Landing Page development environment..."

# Function to cleanup background processes
cleanup() {
    echo "🛑 Shutting down development environment..."
    pkill -f "tailwindcss.*input.css"
    pkill -f "node server.js"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start CSS watch process in background
echo "🎨 Starting Tailwind CSS watch process..."
npm run build:watch &
TAILWIND_PID=$!

# Wait a moment for CSS to build
sleep 2

# Start the backend server
echo "🔧 Starting backend server..."
npm run dev &
SERVER_PID=$!

echo "✅ Development environment started!"
echo "📱 Backend server: http://localhost:3000"
echo "🎨 CSS watching: src/input.css → dist/output.css"
echo "🛑 Press Ctrl+C to stop all processes"

# Wait for both processes
wait $TAILWIND_PID $SERVER_PID
