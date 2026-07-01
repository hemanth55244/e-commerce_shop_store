# MERN E-Commerce Project

Full-stack MERN e-commerce application with separate backend and frontend, MVC architecture throughout, and Shopify-inspired design via [getdesign](https://getdesign.md).

## Project Structure

```
MERN_Training/
├── Backend_practice/     # Express + MongoDB API (MVC)
│   ├── config/           # Database configuration
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   └── index.js          # Server entry
│
└── Frontend_practice/    # React SPA (MVC)
    ├── DESIGN.md         # Shopify design system (getdesign)
    ├── src/
    │   ├── models/       # API services & data layer
    │   ├── controllers/  # State & business logic hooks
    │   ├── views/        # Pages & UI components
    │   └── styles/       # Shopify design tokens
    └── index.html
```

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React, React Router, Vite           |
| Backend  | Node.js, Express                    |
| Database | MongoDB (Mongoose)                  |
| Auth     | JWT + bcryptjs                      |
| Design   | Shopify design via `getdesign`      |

## Setup

### Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string

### Backend

```bash
cd Backend_practice
npm install
cp .env.example .env
# Edit .env with your CONNECTION_STRING and JWT_SECRET
npm run dev
```

Server runs at `http://localhost:3002`

### Frontend

```bash
cd Frontend_practice
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`

## API Endpoints

| Method | Endpoint                        | Auth | Description        |
|--------|---------------------------------|------|--------------------|
| GET    | `/`                             | No   | Health check       |
| POST   | `/auth/register`                | No   | Register user      |
| POST   | `/auth/login`                   | No   | Login user         |
| GET    | `/product/get/products`         | No   | List all products  |
| GET    | `/product/get/products/:id`     | No   | Get product by ID  |
| POST   | `/product/add/product`          | Yes  | Add product        |
| PUT    | `/product/update/products/:id`  | Yes  | Update product     |
| DELETE | `/product/del/products/:id`     | Yes  | Delete product     |

## MVC Architecture

### Backend MVC
- **Models** (`models/`) — Mongoose schemas for User and Products
- **Views** — JSON API responses
- **Controllers** (`controllers/`) — Request handling logic
- **Routes** (`routes/`) — URL-to-controller mapping

### Frontend MVC
- **Models** (`src/models/`) — API calls and session management
- **Views** (`src/views/`) — React pages and components
- **Controllers** (`src/controllers/`) — Custom hooks managing state and orchestrating models

## Design System

The UI follows the Shopify design system installed via:

```bash
npx getdesign@latest add shopify
```

See `Frontend_practice/DESIGN.md` for full design tokens and component patterns.
