# Connectiva

Connectiva is a real-time WebRTC video conferencing platform designed for small online meetings.

## Core Technology Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO

### Authentication & Security
- JWT
- bcrypt
- HTTP-only cookies
- Protected API routes
- Authentication middleware
- CORS

### Real-Time Communication
- WebRTC
- Socket.IO signaling
- STUN
- TURN

## Initial Meeting Architecture

Connectiva's initial WebRTC architecture is designed for small meetings of approximately 2–4 participants using peer-to-peer communication.

For larger meeting sizes, the media architecture can later be migrated to an SFU-based solution while retaining the core authentication, meeting, database, and application layers.

## Current Features

### Authentication
- User registration
- Email validation
- Password hashing with bcrypt
- Duplicate email protection
- User login
- JWT authentication
- HTTP-only authentication cookies
- Protected routes
- Current-user endpoint
- Logout

### Backend Foundation
- Express server
- MongoDB connection using Mongoose
- Environment-based configuration
- REST API structure
- Controller and route separation
- Authentication middleware

## Planned Features

- User profile
- Meeting creation
- Meeting joining
- Meeting authorization
- Meeting history
- WebRTC audio/video
- Socket.IO signaling
- Participant management
- Real-time chat
- Screen sharing
- Host controls
- Meeting analytics
- Connection quality monitoring
- Automated testing

## Development Strategy

The application will be completed and tested before infrastructure and deployment work begins.

Docker, Docker Compose, CI/CD, and cloud deployment will be implemented after the core application is fully functional.

## Project Structure

```text
connectiva/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   └── utils/
│   └── package.json
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── .gitignore
└── README.md