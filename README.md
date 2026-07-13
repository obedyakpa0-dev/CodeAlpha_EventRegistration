# Event Registration System — CodeAlpha Internship

A backend REST API for managing events and user registrations, built with Node.js, Express, and PostgreSQL.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt

## Features
- User registration and login with JWT authentication
- Create, view, update and delete events
- Register for events and cancel registrations
- Protected routes for authenticated users

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Installation
1. Clone the repo
```bash
   git clone https://github.com/obedyakpa0-dev/CodeAlpha_EventRegistration
```
2. Install dependencies
```bash
   npm install
```
3. Create a `.env` file in the root directory

DB_HOST=localhost
DB_PORT=5432
DB_NAME=eventregistration
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=yourjwtsecret
PORT=3000


4. Run the server
```bash
   npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get token |

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get single event |
| POST | `/api/events` | Create event (protected) |
| PUT | `/api/events/:id` | Update event (protected) |
| DELETE | `/api/events/:id` | Delete event (protected) |

### Registrations
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/registrations/:eventId/register` | Register for event (protected) |
| GET | `/api/registrations` | Get my registrations (protected) |
| DELETE | `/api/registrations/:id` | Cancel registration (protected) |

## Author
Obed Yakpa — CodeAlpha Backend Internship