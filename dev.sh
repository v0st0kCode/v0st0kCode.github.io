#!/bin/bash

# Portfolio Development Script
# This script helps you start the development server and provides useful commands

echo "🎨 Portfolio Development Helper"
echo "================================"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if port 8081 is available
if lsof -Pi :8081 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 8081 is already in use"
    echo "   You can either:"
    echo "   1. Kill the process using port 8081"
    echo "   2. Use a different port: npm run dev -- --port 8082"
    echo ""
    read -p "Do you want to try killing the process on port 8081? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        lsof -ti:8081 | xargs kill -9
        echo "✅ Process killed, starting server..."
    else
        echo "❌ Exiting..."
        exit 1
    fi
fi

echo "🚀 Starting development server on localhost:8081..."
echo "   Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev:8081
