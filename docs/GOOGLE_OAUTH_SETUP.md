# Google OAuth 2.0 Setup Guide

This guide will walk you through setting up Google OAuth 2.0 authentication for the DSA Sheet application.

## Prerequisites

- A Google account
- Access to [Google Cloud Console](https://console.cloud.google.com/)

---

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click "New Project"
4. Enter project details:
   - **Project name:** DSA Sheet (or your preferred name)
   - **Organization:** (optional)
5. Click "Create"
6. Wait for the project to be created and select it

---

## Step 2: Enable Required APIs

1. In the left sidebar, navigate to **"APIs & Services"** > **"Library"**
2. Search for **"Google+ API"**
3. Click on it and press **"Enable"**
4. Wait for the API to be enabled

> **Note:** Google+ API is required for NextAuth to fetch user profile information.

---

## Step 3: Configure OAuth Consent Screen

The OAuth consent screen is what users see when they authorize your app.

1. Navigate to **"APIs & Services"** > **"OAuth consent screen"**
2. Choose **"External"** user type (unless you have a Google Workspace)
3. Click **"Create"**

### App Information

Fill in the required fields:

- **App name:** `DSA Sheet` (or your app name)
- **User support email:** Your email address
- **App logo:** (optional) Upload your app logo
- **Application home page:** `http://localhost:3001` (for development)
- **Application privacy policy link:** (optional)
- **Application terms of service link:** (optional)
- **Authorized domains:** (leave empty for development)

### Developer Contact Information

- **Developer contact information:** Your email address

4. Click **"Save and Continue"**

### Scopes

5. Click **"Add or Remove Scopes"**
6. Select the following scopes:
   - `.../auth/userinfo.email` - See your email address
   - `.../auth/userinfo.profile` - See your personal info
   - `openid` - Associate you with your personal info on Google

7. Click **"Update"** then **"Save and Continue"**

### Test Users (Optional)

During development, you can add test users:

8. Click **"Add Users"**
9. Enter email addresses of users who can test the app
10. Click **"Save and Continue"**

### Summary

11. Review the summary and click **"Back to Dashboard"**

---

## Step 4: Create OAuth 2.0 Credentials

1. Navigate to **"APIs & Services"** > **"Credentials"**
2. Click **"Create Credentials"** > **"OAuth client ID"**
3. Choose **"Web application"** as the application type

### Configure the OAuth Client

4. Fill in the details:
   - **Name:** `DSA Sheet Web Client` (or any name you prefer)

5. Under **"Authorized JavaScript origins"**, add:
   - Development: `http://localhost:3001`
   - Production: `https://your-domain.vercel.app` (when deploying)

6. Under **"Authorized redirect URIs"**, add:
   - Development: `http://localhost:3001/api/auth/callback/google`
   - Production: `https://your-domain.vercel.app/api/auth/callback/google`

7. Click **"Create"**

### Save Your Credentials

8. A popup will appear with your credentials:
   - **Client ID** - Copy this
   - **Client Secret** - Copy this

9. Click **"OK"**

> **Important:** Keep these credentials secure and never commit them to version control!

---

## Step 5: Update Environment Variables

1. Open your `.env` file in the project root
2. Add the following variables:

```bash
# Google OAuth
GOOGLE_ID="your-client-id-here.apps.googleusercontent.com"
GOOGLE_SECRET="your-client-secret-here"
```

3. Replace `your-client-id-here` and `your-client-secret-here` with the values from Step 4

### Example `.env` file

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="your-secret-key"

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Google OAuth
GOOGLE_ID="123456789-abcdefg.apps.googleusercontent.com"
GOOGLE_SECRET="GOCSPX-abc123def456"
```

---

## Step 6: Test the Integration

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the login page:**
   - Open http://localhost:3001/auth/login

3. **Test Google Sign-In:**
   - Click the "Sign in with Google" button
   - You should be redirected to Google's authorization page
   - Select your Google account
   - Grant the requested permissions
   - You should be redirected back to your app and logged in

4. **Verify in the database:**
   ```bash
   npm run db:studio
   ```
   - Check the `users` table for your new Google-authenticated user
   - The `password` field should be `null` for OAuth users

---

## Step 7: Production Deployment

When deploying to production (e.g., Vercel):

### Update OAuth Consent Screen

1. Go back to Google Cloud Console
2. Navigate to **"APIs & Services"** > **"OAuth consent screen"**
3. Update the **Application home page** to your production URL
4. Click **"Save and Continue"**

### Update OAuth Credentials

1. Navigate to **"APIs & Services"** > **"Credentials"**
2. Click on your OAuth 2.0 Client ID
3. Add production URLs:
   - **Authorized JavaScript origins:** `https://your-app.vercel.app`
   - **Authorized redirect URIs:** `https://your-app.vercel.app/api/auth/callback/google`
4. Click **"Save"**

### Update Vercel Environment Variables

1. Go to your Vercel dashboard
2. Select your project
3. Go to **"Settings"** > **"Environment Variables"**
4. Add:
   - `GOOGLE_ID` = your Google Client ID
   - `GOOGLE_SECRET` = your Google Client Secret
   - `NEXTAUTH_URL` = `https://your-app.vercel.app`
5. Redeploy your application

---

## Troubleshooting

### Error: "redirect_uri_mismatch"

**Problem:** The redirect URI doesn't match the one configured in Google Cloud Console.

**Solution:**
- Verify the redirect URI in Google Cloud Console matches exactly: `http://localhost:3001/api/auth/callback/google`
- Make sure there are no trailing slashes
- Check that you're using the correct protocol (http vs https)

### Error: "Access blocked: This app's request is invalid"

**Problem:** OAuth consent screen is not properly configured.

**Solution:**
- Go back to the OAuth consent screen
- Make sure all required fields are filled
- Verify scopes are correctly set

### Error: "Invalid client: no application name"

**Problem:** OAuth consent screen is missing the application name.

**Solution:**
- Go to OAuth consent screen
- Add an application name
- Save changes

### User account is not created in database

**Problem:** NextAuth callback is not properly configured.

**Solution:**
- Check `src/lib/auth.ts` includes Google in the `signIn` callback
- Verify database connection is working
- Check server logs for errors

### Can't see the "Sign in with Google" button

**Problem:** Frontend component might not be updated.

**Solution:**
- Verify `src/app/auth/login/page.tsx` has the Google sign-in button
- Restart your development server
- Clear browser cache

---

## Security Best Practices

1. **Never commit credentials:**
   - Add `.env` to `.gitignore`
   - Use environment variables for all secrets

2. **Use different credentials for development and production:**
   - Create separate OAuth clients
   - Use different callback URLs

3. **Regularly rotate secrets:**
   - Periodically regenerate client secrets
   - Update all environments

4. **Monitor OAuth usage:**
   - Check Google Cloud Console for unusual activity
   - Set up alerts for quota limits

5. **Verify email domains (optional):**
   - If you want to restrict to specific domains
   - Add logic in the `signIn` callback

---

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [NextAuth.js Google Provider](https://next-auth.js.org/providers/google)
- [Google Cloud Console](https://console.cloud.google.com/)

---

## Success Checklist

- [ ] Google Cloud project created
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 credentials created
- [ ] Environment variables added to `.env`
- [ ] Development server restarted
- [ ] Google sign-in tested successfully
- [ ] User created in database
- [ ] Production URLs added (when deploying)
- [ ] Vercel environment variables configured (when deploying)

---

**Congratulations! 🎉** You've successfully set up Google OAuth 2.0 for your DSA Sheet application!
