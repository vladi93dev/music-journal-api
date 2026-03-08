# 🎵 Music Journal API

A RESTful API for logging and tracking personal music listening history. Built as a portfolio project to demonstrate backend development with Node.js, Express, and PostgreSQL.

---

## Features

- **User authentication** — Register and log in with JWT-based auth using secure httpOnly cookies
- **Album entry management** — Full CRUD: create, read, update, and delete listening log entries
- **Error handling** — Centralised global error handler for consistent API responses

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Database | PostgreSQL (hosted on Neon) |
| ORM | Prisma |
| Authentication | JWT + httpOnly cookies |
| Password hashing | bcryptjs |

---

## Getting Started

### Prerequisites

- Node.js v18+
- A [Neon](https://neon.tech) PostgreSQL database (or any PostgreSQL instance)

### Installation

```bash
git clone https://github.com/vladi93dev/album-list-api.git
cd album-list-api
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001
```

### Database Setup

```bash
npx prisma generate
npx prisma migrate dev
```

### Run the Server

```bash
npm run dev
```

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in and receive a JWT cookie |
| POST | `/api/auth/logout` | Clear the auth cookie |

---

## Data Model

### Entries

```prisma
model Entry {
  id String @id @default(uuid())
  title String
  artist String
  genres String[]
  rating Int
  note String
  userId String
  user User @relation(fields: [userId], references: [id])
}
```

### Users

```prisma
model User {
  id String @id @default(uuid())
  name String
  email String @unique
  password String
  entries Entry[] 
}
```


---

## Project Structure

```
src/
├── controllers/      # Route handler logic
├── middleware/       # Auth middleware, error handler
├── routes/           # Express route definitions
├── prisma/           # Prisma schema and migrations
└── app.js            # Express app entry point
```

---

## Roadmap

- [ ] Filtering & search by artist, genre, and rating
- [ ] Listening statistics endpoint

---

## Author

Built by Vladi Semyonov · [GitHub](https://github.com/vladi93dev)
