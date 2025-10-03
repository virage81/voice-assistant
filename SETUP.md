# Setup Guide

Complete step-by-step guide to set up the Voice Meeting Assistant project.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Vapi.ai Setup](#vapiai-setup)
4. [Nylas Calendar Setup](#nylas-calendar-setup)
5. [Environment Configuration](#environment-configuration)
6. [Running the Application](#running-the-application)
7. [Verification](#verification)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **Git**: For cloning the repository
- **Modern Browser**: Chrome, Edge, or Firefox (for microphone access)

Check your versions:

```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 9.0.0
```

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd voice-assistant
```

### 2. Install Dependencies

```bash
npm install
```

This will install:

- Next.js 15.5.4
- React 19
- Vapi Web SDK 2.4.0
- Nylas SDK 7.13.2
- Tailwind CSS 4
- TypeScript 5

---

## Vapi.ai Setup

Vapi.ai provides voice AI capabilities (speech-to-text, text-to-speech, and LLM integration).

### Step 1: Create Vapi Account

1. Go to [https://vapi.ai](https://vapi.ai)
2. Sign up for a free account
3. Verify your email

### Step 2: Get API Key

1. Navigate to [Dashboard → API Keys](https://dashboard.vapi.ai/api-keys)
2. Click "Create New API Key"
3. Name it (e.g., "Voice Assistant Development")
4. Copy the API key (starts with `vapi_...`)
5. **Important**: Store it securely - you won't see it again!

### Step 3: Add Credits (if needed)

1. Go to [Dashboard → Billing](https://dashboard.vapi.ai/billing)
2. Add credits for development/testing
3. $5-10 is usually enough for initial development

---

## Nylas Calendar Setup

Nylas provides calendar integration for availability checking and event creation.

### Step 1: Create Nylas Account

1. Go to [https://dashboard.nylas.com](https://dashboard.nylas.com)
2. Sign up for a free account
3. Choose the V3 API

### Step 2: Create Application

1. In the dashboard, click "Create Application"
2. Name it (e.g., "Voice Meeting Assistant")
3. Select your region (US or EU)
4. Note your **API Key** from the application settings

### Step 3: Connect a Calendar

1. Go to "Grants" in the sidebar
2. Click "Add Grant" or "Connect Account"
3. Choose your calendar provider:
   - Google Calendar (recommended)
   - Microsoft 365
   - iCloud
   - Others
4. Follow OAuth flow to connect your calendar
5. After connection, note the **Grant ID** (looks like `grant_xxxxx`)

### Step 4: Get Calendar ID

1. In the dashboard, go to "Calendars"
2. Find your calendar in the list
3. Copy the **Calendar ID** (your email address or calendar identifier)

### Step 5: Determine API Region

Based on your account region:

- **US**: `https://api.us.nylas.com`
- **EU**: `https://api.eu.nylas.com`

---

## Environment Configuration

### Step 1: Create Environment File

```bash
cp .env.example .env.local
```

### Step 2: Fill in the Values

Open `.env.local` and update with your credentials:

```env
# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Vapi Configuration
NEXT_PUBLIC_VAPI_API_KEY=vapi_your_actual_key_here

# Nylas Configuration
NYLAS_API_URL=https://api.us.nylas.com
NYLAS_API_KEY=nyk_v0_your_actual_key_here
NYLAS_GRANT_ID=grant_your_actual_grant_id_here
NYLAS_CALENDAR_ID=your.email@gmail.com
```

### Step 3: Verify Configuration

Create a test script to verify (optional):

```bash
node -e "require('dotenv').config({path:'.env.local'}); console.log('Vapi:', process.env.NEXT_PUBLIC_VAPI_API_KEY?.slice(0,10)+'...'); console.log('Nylas:', process.env.NYLAS_API_KEY?.slice(0,10)+'...');"
```

---

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## Verification

### 1. Check Application Loads

1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the Voice Meeting Assistant interface
3. There should be a "Start Call" button

### 2. Test Voice Connection

1. Click "Start Call"
2. Allow microphone access when prompted
3. The bot should greet you: "Привет! Как тебя зовут?"
4. Speak your name
5. The bot should respond and ask about meeting time

### 3. Test Calendar Integration

1. Continue the conversation by saying when you want to meet
2. The bot should fetch available slots
3. Choose a time slot
4. The bot should confirm the booking

### 4. Verify Calendar Event

1. Check your connected calendar
2. You should see a new event created
3. Event title: "Meeting with [Your Name]"
4. Time should be rounded to nearest 5 minutes

---

## Troubleshooting

### Issue: "Failed to start call"

**Causes:**

- Invalid Vapi API key
- No microphone access
- Browser doesn't support Web Speech API

**Solutions:**

1. Verify `NEXT_PUBLIC_VAPI_API_KEY` in `.env.local`
2. Check browser console for errors
3. Grant microphone permissions
4. Use HTTPS in production (required for mic access)

### Issue: "Failed to fetch available slots"

**Causes:**

- Invalid Nylas credentials
- Wrong Grant ID or Calendar ID
- API region mismatch

**Solutions:**

1. Verify all Nylas credentials in `.env.local`
2. Check `NYLAS_API_URL` matches your account region
3. Test Nylas API directly:
   ```bash
   curl https://api.us.nylas.com/v3/grants \
     -H "Authorization: Bearer YOUR_API_KEY"
   ```

### Issue: "Call ends immediately"

**Cause:** Invalid assistant configuration or model name

**Solution:**

1. Check `src/lib/vapi/assistant.ts`
2. Ensure model is `gpt-4o-mini` or `gpt-4o`
3. See [QUICK_FIX.md](./QUICK_FIX.md) for details

### Issue: Port 3000 already in use

**Solution:**

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

---

## Next Steps

1. **Customize the Assistant**: Edit `src/lib/vapi/assistant.ts`
2. **Modify UI**: Update `src/app/page.tsx`
3. **Add Features**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
4. **Deploy**: See deployment section below

---

## Deployment Checklist

Before deploying to production:

- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Use HTTPS (required for microphone access)
- [ ] Set up environment variables in hosting platform
- [ ] Test all features in production
- [ ] Set up error monitoring (optional)
- [ ] Configure CORS if needed
- [ ] Add rate limiting for API endpoints

---

## Useful Resources

- **Vapi Documentation**: https://docs.vapi.ai
- **Nylas V3 Docs**: https://developer.nylas.com/docs/api/v3/
- **Next.js Docs**: https://nextjs.org/docs
- **Project Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **API Reference**: [API.md](./API.md)
- **Troubleshooting**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## Support

If you encounter issues:

1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Review browser console errors
3. Check API service status:
   - Vapi: https://status.vapi.ai
   - Nylas: https://status.nylas.com
4. Contact the development team
