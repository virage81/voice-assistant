# Voice Assistant with Meeting Scheduler

A web application featuring an AI voice assistant that helps users schedule meetings through natural voice interaction. The assistant collects user information, suggests available time slots, and books appointments using calendar integration.

## Features

- Voice-based interaction using speech-to-text and text-to-speech
- Natural language understanding for scheduling requests
- Calendar integration for checking availability and booking meetings
- Interactive voice-driven user experience

## Technologies

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Voice AI**: Vapi.ai for speech recognition and synthesis
- **Calendar API**: Nylas for availability checking and meeting scheduling

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Vapi.ai API key
- Nylas API credentials

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd voice-assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your API keys and credentials.

## Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the voice assistant.

## Development

This project follows GitFlow for version control:
- `ai-main`: Production-ready code
- `ai-development`: Development branch
- Feature branches are created from `ai-development`

## API Keys Setup

### Vapi.ai
1. Create an account at [Vapi.ai](https://vapi.ai)
2. Generate an API key from your dashboard
3. Add the key to your `.env.local` file

### Nylas Calendar API
1. Sign up at [Nylas Developer Portal](https://developer.nylas.com/)
2. Create a new application to get your client ID and secret
3. Set up authentication and obtain a grant ID
4. Add these credentials to your `.env.local` file
