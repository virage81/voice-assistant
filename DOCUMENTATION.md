# 📚 Documentation Index

Complete documentation for the Voice Meeting Assistant project.

---

## 📖 Quick Navigation

### Getting Started

- [README.md](./README.md) - Project overview and quick start
- [SETUP.md](./SETUP.md) - **Start here!** Complete setup guide for new developers

### Technical Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture and data flow
- [API.md](./API.md) - API endpoints reference

---

## 📋 Documentation by Topic

### 🚀 For New Developers

**Start with these in order:**

1. **[README.md](./README.md)** - Understand what the project does

   - Features overview
   - Tech stack
   - Quick start guide

2. **[SETUP.md](./SETUP.md)** - Set up your development environment

   - Prerequisites
   - Vapi.ai account setup
   - Nylas calendar setup
   - Environment configuration
   - Running the application
   - Verification steps

3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Understand the codebase
   - System architecture
   - Component responsibilities
   - Data flow diagrams
   - State management
   - Event handling

---

### 🔧 For Development

**Technical References:**

#### API Development

- **[API.md](./API.md)** - Complete API reference
  - `GET /api/check-availability` - Fetch available slots
  - `POST /api/create-event` - Create calendar event
  - Request/response formats
  - Error handling

#### Code Architecture

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design
  - Layer architecture
  - Custom hooks (`useVapi`)
  - Integration patterns
  - Testing strategy

#### Code Organization

**Frontend:**

```
src/app/page.tsx          # Main UI component
src/hooks/useVapi.ts      # Voice interaction logic
src/types/vapi.ts         # TypeScript definitions
```

**Backend:**

```
src/app/api/              # API routes
src/lib/vapi/             # Vapi integration
src/lib/nylas/            # Nylas integration
src/lib/utils/            # Utility functions
```

**Configuration:**

```
src/config/index.ts       # Environment config
.env.local               # Your local environment
.env.example             # Environment template
```

---

## 🎯 Documentation by Use Case

### I want to...

#### Set up the project from scratch

1. Read [README.md](./README.md) - Overview
2. Follow [SETUP.md](./SETUP.md) - Step-by-step setup
3. Check browser console for any issues

#### Understand how it works

1. Read [README.md](./README.md) - How it works section
2. Study [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
3. Review [API.md](./API.md) - API integration

#### Add a new feature

1. Review [ARCHITECTURE.md](./ARCHITECTURE.md) - Understand structure
2. Check [API.md](./API.md) - Existing APIs
3. Follow code patterns in existing components

#### Fix a bug

1. Identify error in browser console
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) - System flow
3. Check [API.md](./API.md) - API integration
4. Consult external documentation

#### Deploy to production

1. Read [README.md](./README.md#deployment) - Deployment section
2. Complete deployment checklist
3. Set up production environment variables
4. Test all features in production

---

## 📊 Feature Documentation

### Voice AI (Vapi.ai)

**Configuration:**

- File: `src/lib/vapi/assistant.ts`
- Model: GPT-4o-mini
- Language: Russian (ru)
- Voice: OpenAI Alloy
- Transcriber: Deepgram Nova-2

**Documentation:**

- Setup: [SETUP.md](./SETUP.md#vapiai-setup)
- Integration: [ARCHITECTURE.md](./ARCHITECTURE.md#integration-layer)
- Configuration: `src/lib/vapi/assistant.ts`

### Calendar Integration (Nylas)

**Features:**

- Availability checking (7 days ahead)
- Event creation with 60-minute duration
- Time rounding to 5-minute intervals
- Multi-provider support

**Documentation:**

- Setup: [SETUP.md](./SETUP.md#nylas-calendar-setup)
- API: [API.md](./API.md)
- Time utils: [README.md](./README.md#time-utilities)

### Time Utilities

**Functions:**

```typescript
roundToNearestFiveMinutes(ms); // Rounds milliseconds
roundToNearestFiveMinutesInSeconds(s); // Rounds seconds
roundDateToNearestFiveMinutes(date); // Rounds Date object
```

**Location:** `src/lib/utils/time.ts`

**Examples:**

- 10:03 → 10:05
- 14:42 → 14:45
- 16:58 → 17:00

---

## 🔍 Quick Reference

### Environment Variables

| Variable                   | Purpose      | Where to get                                         |
| -------------------------- | ------------ | ---------------------------------------------------- |
| `NEXT_PUBLIC_VAPI_API_KEY` | Voice AI     | [Vapi Dashboard](https://dashboard.vapi.ai/api-keys) |
| `NYLAS_API_KEY`            | Calendar API | [Nylas Dashboard](https://dashboard.nylas.com)       |
| `NYLAS_GRANT_ID`           | Auth grant   | Nylas → Grants                                       |
| `NYLAS_CALENDAR_ID`        | Calendar ID  | Nylas → Calendars                                    |
| `NYLAS_API_URL`            | API endpoint | Based on region                                      |
| `NEXT_PUBLIC_APP_URL`      | App URL      | Your domain                                          |

### Key Files

| File                        | Purpose      | Documentation                                             |
| --------------------------- | ------------ | --------------------------------------------------------- |
| `src/hooks/useVapi.ts`      | Voice logic  | [ARCHITECTURE.md](./ARCHITECTURE.md#business-logic-layer) |
| `src/lib/vapi/assistant.ts` | AI config    | [SETUP.md](./SETUP.md#vapiai-setup)                       |
| `src/lib/nylas/calendar.ts` | Calendar ops | [API.md](./API.md)                                        |
| `src/app/api/*/route.ts`    | API routes   | [API.md](./API.md)                                        |

### Status Codes

**Vapi Status:**

- `idle` - Ready to start
- `active` - Call in progress
- `listening` - Waiting for speech
- `processing` - AI processing
- `checking-availability` - Fetching slots
- `creating-event` - Booking meeting
- `success` - Action completed
- `error` - Error occurred
- `ended` - Call ended

---

## 📝 Updating Documentation

When making changes:

1. **Update relevant docs** - Keep documentation in sync
2. **Follow structure** - Match existing format
3. **Add examples** - Include code examples
4. **Link related docs** - Cross-reference other files

### Documentation Checklist

- [ ] Updated README.md if adding features
- [ ] Updated ARCHITECTURE.md if changing structure
- [ ] Updated API.md if modifying endpoints
- [ ] Updated TROUBLESHOOTING.md if fixing bugs
- [ ] Updated SETUP.md if changing setup process

---

## 🆘 Getting Help

### Self-Help Resources

1. **Search Documentation** - Use browser search (Cmd/Ctrl + F)
2. **Check Examples** - Review code examples in docs
3. **Read Error Messages** - They often point to the issue
4. **Browser Console** - Check for detailed errors

### If Stuck

1. Review [ARCHITECTURE.md](./ARCHITECTURE.md) to understand flow
2. Check [API.md](./API.md) for API details
3. Review [SETUP.md](./SETUP.md) for configuration
4. Check external docs:
   - [Vapi Docs](https://docs.vapi.ai)
   - [Nylas Docs](https://developer.nylas.com/docs/api/v3/)
   - [Next.js Docs](https://nextjs.org/docs)

---

## 📅 Documentation Maintenance

**Last Updated:** October 2025

**Contributors:**

- Initial documentation setup
- Architecture documentation
- API reference
- Troubleshooting guides

**Upcoming Documentation:**

- Video tutorials
- Component documentation
- Testing guide
- Performance optimization guide

---

## 🔗 External Resources

### Official Documentation

- [Vapi.ai Docs](https://docs.vapi.ai) - Voice AI platform
- [Nylas V3 API](https://developer.nylas.com/docs/api/v3/) - Calendar API
- [Next.js Docs](https://nextjs.org/docs) - Framework
- [React Docs](https://react.dev) - UI library
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Language

### Service Dashboards

- [Vapi Dashboard](https://dashboard.vapi.ai)
- [Nylas Dashboard](https://dashboard.nylas.com)
- [Vapi Status](https://status.vapi.ai)
- [Nylas Status](https://status.nylas.com)

### Community & Support

- [Vapi Discord](https://discord.gg/vapi)
- [Nylas Community](https://community.nylas.com)
- [Next.js Discord](https://discord.gg/nextjs)

---

**Happy Coding! 🚀**
