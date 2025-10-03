# Architecture Documentation

## Overview

This voice assistant application follows a clean, modular architecture with separation of concerns between UI, business
logic, and data fetching.

## Architecture Layers

### 1. Presentation Layer (`src/app/`)

- **`page.tsx`**: Main UI component
  - Uses the `useVapi` hook for all voice interaction logic
  - Displays call status and controls
  - Minimal business logic, focused on rendering

### 2. Business Logic Layer (`src/hooks/`)

- **`useVapi.ts`**: Custom React hook
  - Encapsulates all Vapi client interactions
  - Manages call state and status
  - Handles function calls from Vapi AI
  - Communicates with API endpoints
  - Provides clean interface to UI components

### 3. API Layer (`src/app/api/`)

- **`check-availability/route.ts`**: GET endpoint
  - Fetches available time slots from Nylas
  - Returns slots in standard format
- **`create-event/route.ts`**: POST endpoint
  - Creates calendar events in Nylas
  - Requires `name` and `date` parameters

### 4. Integration Layer (`src/lib/`)

**Vapi Integration:**

- **`vapi/index.ts`**: Vapi client singleton
- **`vapi/assistant.ts`**: Assistant configuration
  - Defines AI behavior and personality
  - Configures voice, language, and transcription
  - Specifies available functions

**Nylas Integration:**

- **`nylas/index.ts`**: Nylas client singleton
- **`nylas/calendar.ts`**: Calendar operations
  - `getAvailableSlots()`: Fetches availability
  - `bookMeeting()`: Creates events

### 5. Configuration Layer (`src/config/`)

- **`index.ts`**: Centralized configuration
  - Loads environment variables
  - Provides type-safe config access

### 6. Type Definitions (`src/types/`)

- **`vapi.ts`**: TypeScript interfaces
  - Vapi message types
  - Function call types
  - API response types

## Data Flow

### Call Initialization Flow

```
User clicks "Start Call"
    ↓
useVapi.startCall()
    ↓
vapiClient.start(assistantConfig)
    ↓
Vapi connects and speaks first message
```

### Function Call Flow

```
User speaks → Vapi AI processes → Determines function to call
    ↓
Vapi sends 'function-call' message
    ↓
useVapi message handler receives it
    ↓
Fetches data from API endpoint
    ↓
Sends response back to Vapi
    ↓
Vapi AI speaks the response
```

### Availability Check Flow

```
1. User: "I want to meet Friday"
2. AI recognizes intent → calls get_available_slots
3. useVapi receives function-call message
4. Fetches GET /api/check-availability
5. API calls nylas.getAvailableSlots()
6. Returns slots to useVapi
7. useVapi sends to Vapi AI
8. AI announces: "Available: Friday 11:00, Friday 14:00..."
```

### Meeting Booking Flow

```
1. User: "Friday 11:00"
2. AI recognizes intent → calls book_meeting
3. useVapi receives function-call with {name, date}
4. Posts to /api/create-event
5. API calls nylas.bookMeeting(name, date)
6. Creates event in calendar
7. Returns success to useVapi
8. useVapi sends to Vapi AI
9. AI confirms: "Done, meeting booked for Friday 11:00. Thank you!"
```

## State Management

### Hook State (`useVapi`)

```typescript
const [isCallActive, setIsCallActive] = useState(false);
const [status, setStatus] = useState<VapiStatus>('idle');
const [statusMessage, setStatusMessage] = useState<string>('Ready to start');
```

**Status States:**

- `idle` → `starting` → `active`
- `active` ↔ `listening` ↔ `processing`
- `active` → `checking-availability` → `active`
- `active` → `creating-event` → `success`
- Any state → `error` or `ended`

## Event Handling

### Vapi Events

```typescript
vapiClient.on('call-start', handler); // Call begins
vapiClient.on('call-end', handler); // Call ends
vapiClient.on('speech-start', handler); // User starts speaking
vapiClient.on('speech-end', handler); // User stops speaking
vapiClient.on('message', handler); // AI messages/function calls
vapiClient.on('error', handler); // Errors occur
```

### Function Call Protocol

**Receive:**

```typescript
{
  type: 'function-call',
  functionCall: {
    name: 'get_available_slots',
    parameters: { /* ... */ }
  }
}
```

**Send Response:**

```typescript
{
  type: 'add-message',
  message: {
    role: 'function',
    name: 'get_available_slots',
    content: JSON.stringify(data)
  }
}
```

## Security Considerations

1. **API Keys**:

   - Vapi key is public (NEXT*PUBLIC*\*)
   - Nylas key is server-side only

2. **Data Validation**:

   - API endpoints validate required parameters
   - Type safety enforced with TypeScript

3. **Error Handling**:
   - Try-catch blocks in all async operations
   - Graceful error messages to users
   - Errors sent to Vapi for AI to communicate

## Scalability Considerations

### Current Design

- Single Vapi client instance (singleton)
- Stateless API endpoints
- Hook manages local state only

### Future Enhancements

- Add database for persistent meeting records
- Implement user authentication
- Support multiple calendars
- Add webhook handlers for calendar updates
- Implement server-side function execution

## Testing Strategy

### Unit Tests

- Test individual functions in `calendar.ts`
- Test status transitions in `useVapi`
- Mock Vapi and Nylas clients

### Integration Tests

- Test API endpoints with mocked Nylas
- Test full flow with mock Vapi responses

### E2E Tests

- Test complete user journey
- Verify calendar event creation
- Test error scenarios

## Performance Optimization

1. **Lazy Loading**: Components load on demand
2. **Memoization**: useCallback for event handlers
3. **Efficient Re-renders**: Minimal state updates
4. **API Caching**: Could add Redis for slot caching
5. **Function Debouncing**: Prevent duplicate calls

## Monitoring & Debugging

### Console Logging

- All Vapi messages logged
- Function calls logged with parameters
- API responses logged

### Error Tracking

- Vapi errors captured and displayed
- API errors logged server-side
- User-friendly error messages

### Debug Checklist

1. Check browser console for Vapi messages
2. Verify environment variables loaded
3. Test API endpoints independently
4. Check Nylas dashboard for API calls
5. Review Vapi dashboard for call logs
