# e-commerce_shop_store

ShopStore is a full-stack MERN e-commerce application with secure authentication, product management, shopping cart functionality, and Razorpay payment integration.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, React Router, Vite, Axios |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Payments | Razorpay |

## Project Structure

```text
e-commerce_shop_store/
├── Backend_practice/       # Express + MongoDB API
│   ├── config/             # Database configuration
│   ├── controllers/        # Request and business logic
│   ├── middleware/         # Authentication middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   └── index.js            # Server entry point
├── Frontend_shop_store/    # React storefront
│   ├── src/
│   │   ├── controllers/    # React hooks and state orchestration
│   │   ├── models/         # API services
│   │   ├── views/          # Pages and components
│   │   └── styles/         # Global styles and tokens
│   └── index.html
└── tmp_products.json       # Product seed data
```

## Features

- User registration and login
- JWT-based protected routes
- Product listing and product details
- Admin product add, update, and delete flows
- Shopping cart management
- Razorpay checkout support
- Responsive storefront UI

## Setup

### Backend

```bash
cd Backend_practice
npm install
cp .env.example .env
npm run dev
```

The API runs on `http://localhost:3002` by default.

### Frontend

```bash
cd Frontend_shop_store
npm install
cp .env.example .env
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

## Environment Variables

Backend:

```env
CONNECTION_STRING=mongodb://127.0.0.1:27017/mern_shop
JWT_SECRET=your_jwt_secret_here
PORT=3002
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

Frontend:

```env
VITE_API_URL=http://localhost:3002
```

## API Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login user |
| GET | `/product/get/products` | List all products |
| GET | `/product/get/products/:id` | Get product by ID |
| POST | `/product/add/product` | Add product |
| PUT | `/product/update/products/:id` | Update product |
| DELETE | `/product/del/products/:id` | Delete product |
| GET | `/cart` | Get user cart |
| POST | `/cart/add` | Add item to cart |
| DELETE | `/cart/remove/:productId` | Remove item from cart |

## Author

Hemanth Sai Nallappagari
