# Vercel Deployment Setup Guide

## Environment Variables for Vercel

You need to configure these environment variables in your Vercel project settings:

### Required Variables:

1. **DATABASE_URL**
   - Get this from your PostgreSQL provider (Neon, Supabase, Vercel Postgres, etc.)
   - Format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require`
   
2. **NEXTAUTH_URL**
   - Set to your production URL
   - Example: `https://your-app.vercel.app`
   
3. **NEXTAUTH_SECRET**
   - Generate with: `openssl rand -base64 32`
   - Must be a secure random string

### Optional OAuth Variables:

4. **GOOGLE_ID** (if using Google OAuth)
5. **GOOGLE_SECRET** (if using Google OAuth)
6. **GITHUB_ID** (if using GitHub OAuth)
7. **GITHUB_SECRET** (if using GitHub OAuth)

## Setup Steps:

### 1. Set up Database (Choose one):

#### Option A: Vercel Postgres
1. In Vercel dashboard, go to Storage tab
2. Create a new Postgres database
3. Connect it to your project (automatically sets DATABASE_URL)

#### Option B: Neon (Free PostgreSQL)
1. Go to https://neon.tech
2. Create a free database
3. Copy the connection string
4. Add as DATABASE_URL in Vercel environment variables

#### Option C: Supabase (Free PostgreSQL)
1. Go to https://supabase.com
2. Create a new project
3. Get connection string from Settings → Database
4. Add as DATABASE_URL in Vercel environment variables

### 2. Add Environment Variables to Vercel:

1. Go to your Vercel project → Settings → Environment Variables
2. Add all required variables mentioned above
3. Make sure to select appropriate environments (Production, Preview, Development)

### 3. Redeploy:

After adding environment variables, trigger a new deployment:
```bash
git commit --allow-empty -m "Trigger deployment"
git push
```

Or use Vercel CLI:
```bash
vercel --prod
```

## Local Development:

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Then fill in your local values in `.env.local`

## Troubleshooting:

If you get "DATABASE_URL must start with postgresql://":
- Check that DATABASE_URL is set in Vercel environment variables
- Ensure it starts with `postgresql://` or `postgres://`
- Verify the environment variable is available in the correct deployment environment

If migrations fail:
- Ensure your database is accessible from Vercel's servers
- Check that SSL mode is properly configured
- Verify database credentials are correct
