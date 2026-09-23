# Connectiva

Connectiva is a real-time WebRTC video conferencing platform designed for small online meetings.

## Overview

Connectiva enables authenticated users to create and join online meetings with real-time audio, video, chat, screen sharing, and participant management.

The application is being built with a focus on secure authentication, real-time communication, reliability, and production-ready deployment practices.

## Tech Stack

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

## Current Features

### Authentication
- User registration
- Email validation
- Secure password hashing with bcrypt
- Duplicate email protection
- User login
- JWT-based authentication
- HTTP-only authentication cookies
- Protected routes
- Current-user endpoint
- Logout

### Backend
- Express REST API
- MongoDB integration with Mongoose
- Environment-based configuration
- Modular route and controller architecture
- Authentication middleware

## Planned Features

- User profiles
- Meeting creation and joining
- Meeting authorization
- Meeting history
- WebRTC audio and video
- Socket.IO signaling
- Participant management
- Real-time meeting chat
- Screen sharing
- Host controls
- Meeting analytics
- Connection quality monitoring
- Automated testing

## WebRTC Architecture

The initial version of Connectiva uses peer-to-peer WebRTC communication and is designed for small meetings of approximately 2–4 participants.

For larger meetings, the media layer can be migrated to an SFU architecture while retaining the existing authentication, meeting, database, and application layers.

## Security

Sensitive configuration values such as database credentials and JWT secrets are stored in environment variables and excluded from version control.

The repository contains `.env.example` files with placeholder configuration only.

Authentication uses HTTP-only cookies for JWT storage and protected backend routes for authorization.

## Development & Deployment

The application is being developed and tested locally before infrastructure is added.

Planned infrastructure includes:

- Docker
- Docker Compose
- GitHub Actions CI/CD
- Cloud deployment
- HTTPS
- Production logging
- Security hardening

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