# Online Kitchen

A Node.js/Express backend for an online food ordering system, providing user authentication, food menu management, cart operations, and order processing with a clean, service-oriented architecture.

## Features

- **Authentication & Authorization** — JWT-based auth with role-based access control (user/admin)
- **Food Menu Management** — Admins can create and manage food items, categories, and availability
- **Cart** — Add, update, and remove items before checkout
- **Orders** — Place orders from the cart, track status, and view order history

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Security**: JWT (`jsonwebtoken`) + `bcrypt` password hashing

## Getting Started

### Prerequisites

- Node.js v16+
- A MongoDB instance (local or Atlas)

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_string
JWT_EXPIRES_IN=7d
```

### Running

```bash
npm run dev    # development, with nodemon
npm start      # production
```

## Project Structure

```
src/
├── config/       # Environment and database configuration
├── controllers/  # Request/response handling
├── services/     # Business logic
├── models/       # Mongoose schemas
├── routes/       # Express route definitions
├── middleware/    # Auth, validation, logging, error handling
├── validators/   # Zod request schemas
├── utils/        # Shared helpers (AppError, asyncHandler, JWT)
└── server.js     # Application entry point
```

Requests flow as: `Client -> Route -> Middleware (Auth/Validation) -> Controller -> Service -> Model -> Database`

## API Overview

All routes are prefixed with `/api/v1`.

| Method | Endpoint             | Description                     |
| ------ | --------------------- | -------------------------------- |
| POST   | `/auth/register`      | Register a new user             |
| POST   | `/auth/login`         | Authenticate and receive a token |
| GET    | `/food`               | List available food items       |
| POST   | `/food`               | Add a new food item (admin only)|
| GET    | `/cart`               | View the current user's cart    |
| PATCH  | `/cart`               | Add/update items in the cart    |
| POST   | `/orders`             | Place an order from the cart    |
| GET    | `/orders`             | Get the current user's order history |

For full details on data models, middleware, and error handling, see [technical_document.md](./technical_document.md).

## Development Notes

- Business logic belongs in `src/services`, not controllers.
- New endpoints should have a corresponding Zod validator in `src/validators`.
- Tests are not yet set up (`npm test` is a placeholder).
