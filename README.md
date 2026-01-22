# Messenger API

> [**Frontend Url**](https://github.com/inebw/messenger?tab=readme-ov-filehttps://github.com/inebw/messenger?tab=readme-ov-file)

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL (via Prisma)
- **Real-time Engine:** Socket.io
- **Authentication:** Passport.js (JWT Strategy) & HttpOnly Cookies
- **Security:** CORS, BCrypt, Dotenv

## ⚡ Key Features

- **Hybrid Architecture:** Combines standard REST API endpoints for data management with WebSockets for real-time events.
- **Secure Authentication:** Implements JWT stored in HttpOnly cookies to prevent XSS attacks, with Passport.js middleware for protected routes.
- **Live User Presence:** Tracks `online` / `offline` status changes in real-time using Socket connection events and database updates.
- **Room-Based Messaging:** Utilizes Socket.io "rooms" to ensure messages are delivered securely between specific friend pairs.

## 📡 Socket.io Event Map

The server listens for and emits specific events to synchronize client state:

| Event Name    | Type     | Description                                                      |
| :------------ | :------- | :--------------------------------------------------------------- |
| `connection`  | **On**   | Establishes handshake and assigns socket ID.                     |
| `online`      | **On**   | Updates user status to "Online" in DB and broadcasts to friends. |
| `join_room`   | **On**   | Joins a unique socket room created for a specific friend pair.   |
| `postMessage` | **On**   | Saves message to DB and emits `getMessage` to the recipient.     |
| `imOnline`    | **Emit** | Broadcasts to all connected clients that a user has logged in.   |
| `imOffline`   | **Emit** | Broadcasts when a socket disconnects.                            |

## 🔌 API Endpoints Overview

### Authentication (`/login`, `/sign-up`)

- **POST** `/sign-up`: Register a new user with hashed password.
- **POST** `/login`: Authenticate and issue HttpOnly cookie.
- **GET** `/login/protected`: Validates session persistence.

### User Management (`/users`)

- **GET** `/`: Retrieve all users (protected).
- **GET** `/user/:id`: Get specific user profile.
- **GET** `/logout`: Clears auth cookies.

### Friend System (`/friends`)

- **GET** `/:id`: Fetch friends list.
- **POST** `/:id/:friendId`: Add a new friend.
- **DELETE** `/:id/:friendId`: Remove a friend.

### Messaging (`/messages`)

- **GET** `/:id/:friendId`: Load chat history (pagination supported).
- **POST** `/:id/:friendId`: Fallback for HTTP message sending.

---

