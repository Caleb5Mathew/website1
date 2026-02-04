# Deployment Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `website1`
3. Make it **Public** (or Private if you prefer)
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Connect Local Repo to GitHub

After creating the repo, run these commands:

```bash
cd /Users/calebm/Vday
git remote add origin https://github.com/Caleb5Mathew/website1.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

Run this command and follow the prompts:

```bash
vercel
```

When prompted:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **What's your project's name?** → website1 (or press enter for default)
- **In which directory is your code located?** → ./ (press enter)
- **Want to override the settings?** → No

After deployment, Vercel will give you a URL like `https://website1-xxxxx.vercel.app`

## Step 4: Connect GitHub for Auto-Deployments

1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to Settings → Git
4. Connect your GitHub account if not already connected
5. Select the `website1` repository
6. Enable automatic deployments

Now every time you push to GitHub, Vercel will automatically deploy!
