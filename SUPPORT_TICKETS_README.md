# Support Tickets Feature

## Overview

The support tickets feature allows users to submit bug reports and feedback through the app. The system automatically captures diagnostic information to help with troubleshooting.

## Features

### User Interface

- **Single Entry Point**: "Help & Support" menu item in the app
- **Two Intent Types**: Bug reports and feedback with smart prompts
- **Auto-capture Diagnostics**: Device info, app version, network state, etc.
- **Form Validation**: Ensures required fields are completed

### Backend API

- **RESTful Endpoints**: `POST /api/v1/tickets` and `GET /api/v1/tickets/:id`
- **Authentication Required**: All endpoints require user authentication
- **Diagnostic Capture**: Automatically stores device and app information
- **Validation**: Server-side validation of ticket data

## Database Schema

### Tickets Table

```sql
CREATE TABLE tickets (
  id BIGSERIAL PRIMARY KEY,
  profile_id BIGINT NOT NULL REFERENCES profiles(id),
  kind INTEGER NOT NULL DEFAULT 0, -- enum: bug=0, feedback=1
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  source INTEGER NOT NULL DEFAULT 0, -- enum: app=0, web=1, api=2
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
```

### Indexes

- `kind` - for filtering by ticket type
- `created_at` - for sorting by date
- `(metadata->>'app_version')` - for filtering by app version

## API Endpoints

### Create Ticket

```
POST /api/v1/tickets
Content-Type: application/json
Authorization: Bearer <token>

{
  "ticket": {
    "kind": "bug",
    "title": "App crashes on startup",
    "description": "The app crashes immediately when I open it...",
    "source": "app"
  },
  "app_version": "1.0.0",
  "build_number": "1",
  "device_model": "iPhone 14",
  "os_version": "17.0",
  "locale": "en",
  "timezone": "America/New_York",
  "network_state": "online",
  "user_id": "123"
}
```

### Get Ticket

```
GET /api/v1/tickets/:id
Authorization: Bearer <token>
```

## Auto-captured Diagnostics

The system automatically captures the following diagnostic information:

- **App Info**: Version, build number
- **Device Info**: Model, OS version, locale, timezone
- **Network**: Connection state
- **Context**: Current route, user ID, timestamp
- **Client Logs**: (Future enhancement)

## Usage

1. User navigates to "Help & Support" from the menu
2. Selects either "Report a Bug" or "Share Feedback"
3. Fills in title and description with guided prompts
4. Submits the form
5. System automatically captures diagnostics and stores ticket
6. User receives confirmation and returns to previous screen

## Future Enhancements

- **Attachments**: Screenshot and screen recording upload
- **Status Tracking**: Ticket status updates and notifications
- **Admin Interface**: Web interface for managing tickets
- **Email Notifications**: Automatic email confirmations
- **Rate Limiting**: Prevent spam submissions
- **File Upload**: Support for image/video attachments

## Testing

### Client Tests

```bash
npm test -- --testPathPattern=tickets.test.ts
npm test -- --testPathPattern=HelpSupportScreen.test.tsx
```

### Server Tests

```bash
bundle exec rspec spec/requests/api/v1/tickets_controller_spec.rb
```

## Security Considerations

- **Authentication Required**: All endpoints require valid JWT token
- **User Isolation**: Users can only access their own tickets
- **Input Validation**: Server-side validation of all inputs
- **Rate Limiting**: (Future enhancement)
- **File Upload Security**: (Future enhancement for attachments)
