# API Documentation

## Endpoints

### 1. Check Availability

**Endpoint:** `GET /api/check-availability`

**Description:** Retrieves available time slots for scheduling meetings.

**Request:** None

**Response:**

```json
{
	"success": true,
	"slots": [
		{
			"date": "2025-10-08T14:00:00.000Z"
		},
		{
			"date": "2025-10-08T15:00:00.000Z"
		}
	]
}
```

**Error Response:**

```json
{
	"success": false,
	"error": "Failed to fetch available slots"
}
```

---

### 2. Create Event

**Endpoint:** `POST /api/create-event`

**Description:** Creates a new meeting event in the calendar.

**Request Body:**

```json
{
	"dateTime": "2025-10-08T14:00:00.000Z",
	"name": "John Doe"
}
```

**Parameters:**

- `dateTime` (string, required): ISO 8601 formatted date-time string
- `name` (string, required): Name of the person booking the meeting

**Success Response:**

```json
{
	"success": true,
	"event": {
		"id": "event_id",
		"title": "Meeting with John Doe",
		"description": "Meeting scheduled via voice assistant",
		"when": {
			"time": 1728396000,
			"timezone": "Europe/Moscow"
		}
	}
}
```

**Error Response:**

```json
{
	"success": false,
	"error": "Missing required parameters: date and name"
}
```

or

```json
{
	"success": false,
	"error": "Failed to create event"
}
```

---

## Integration with Vapi

The Vapi assistant is configured to call these endpoints through the frontend when specific functions are triggered:

1. **checkAvailability** - Calls `GET /api/check-availability`
2. **createEvent** - Calls `POST /api/create-event` with user's name and selected date

The frontend handles these function calls via event listeners and sends results back to Vapi for the assistant to
communicate with the user.

---

## Nylas Calendar Integration

Both endpoints interact with the Nylas Calendar API:

- **Check Availability**: Uses Nylas `calendars.getAvailability()` method
- **Create Event**: Uses Nylas `events.create()` method

All times are handled in ISO 8601 format and converted appropriately for the Nylas API.
