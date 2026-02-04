#!/bin/bash

# Script to deploy Valentine's website to GitHub and Vercel

echo "🚀 Starting deployment process..."

# Step 1: Add GitHub remote (you need to create the repo first!)
echo ""
echo "📦 Adding GitHub remote..."
git remote add origin https://github.com/Caleb5Mathew/website1.git 2>/dev/null || echo "Remote already exists or repo not created yet"
git branch -M main

# Step 2: Push to GitHub
echo ""
echo "⬆️  Pushing to GitHub..."
git push -u origin main

# Step 3: Deploy to Vercel
echo ""
echo "🌐 Deploying to Vercel..."
echo "Follow the prompts to complete deployment..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo "Your site should be live at the URL Vercel provided!"
