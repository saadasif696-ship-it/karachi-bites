# Karachi Bites — API Documentation

This document describes the 6 fixed REST API endpoints and additional supporting endpoints implemented by the Karachi Bites server.

---

## 1. `GET /api/menu`
Fetches the current catalog of 12 seed menu items with prices, tags, and stock availability.

- **Method:** `GET`
- **Authentication:** None
- **Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Chicken Malai Boti",
    "category": "BBQ",
    "price": 850,
    "tags": "mild",
    "available": true,
    "description": "Boneless chicken cubes marinated in rich fresh cream, green chilies, and fragrant herbs..."
  },
  {
    "id": 2,
    "name": "Beef Seekh Kebab",
    "category": "BBQ",
    "price": 780,
    "tags": "spicy",
    "available": true,
    "description": "Minced beef blended with crushed whole spices..."
  }
]
```

### Curl Example:
```bash
curl -X GET http://localhost:3000/api/menu
```

---

## 2. `POST /api/orders`
Creates a new customer order. Subtotal and delivery fee (Rs. 150) are computed strictly on the server based on current menu prices.

- **Method:** `POST`
- **Authentication:** None
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "customer": {
    "name": "Saad Asif",
    "phone": "03001234567",
    "address": "Flat 402, Al-Razi Heights, Block 5, Clifton, Karachi"
  },
  "branch": "Clifton",
  "items": [
    { "id": 1, "qty": 2 },
    { "id": 5, "qty": 1 }
  ],
  "notes": "Extra raita please"
}
```

- **Response:** `201 Created`
```json
{
  "orderId": "KB-2603-7281",
  "total": 2400,
  "status": "Received"
}
```

- **Error Response:** `400 Bad Request`
```json
{
  "error": "Valid Pakistani mobile number required (e.g. 03001234567)"
}
```

### Curl Example:
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "Saad Asif",
      "phone": "03001234567",
      "address": "Block 5, Clifton, Karachi"
    },
    "branch": "Clifton",
    "items": [{ "id": 1, "qty": 1 }]
  }'
```

---

## 3. `GET /api/orders/:id`
Retrieves order details for customer tracking. Supports optional phone verification via query parameter `?phone=` or `x-customer-phone` header.

- **Method:** `GET`
- **Authentication:** None
- **Response:** `200 OK`
```json
{
  "orderId": "KB-2603-7281",
  "status": "Received",
  "items": [
    { "id": 1, "qty": 1, "name": "Chicken Malai Boti", "price": 850 }
  ],
  "total": 1000,
  "customer": {
    "name": "Saad Asif",
    "phone": "03001234567",
    "address": "Block 5, Clifton, Karachi"
  },
  "branch": "Clifton",
  "subtotal": 850,
  "deliveryFee": 150,
  "created_at": "2026-10-08T08:15:00.000Z"
}
```

- **Error Response:** `404 Not Found`
```json
{
  "error": "Order not found"
}
```

### Curl Example:
```bash
curl -X GET "http://localhost:3000/api/orders/KB-2603-7281?phone=03001234567"
```

---

## 4. `POST /api/auth/login`
Authenticates kitchen and branch administrators.

- **Method:** `POST`
- **Authentication:** None
- **Request Body:**
```json
{
  "username": "admin",
  "password": "karachi123"
}
```

- **Response:** `200 OK`
```json
{
  "token": "kb_token_e8a2f447d91c8932bf44569e21"
}
```

- **Error Response:** `401 Unauthorized`
```json
{
  "error": "Invalid username or password"
}
```

### Curl Example:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "karachi123"}'
```

---

## 5. `GET /api/admin/orders?branch=&date=`
Retrieves all orders with optional branch and date filtering.

- **Method:** `GET`
- **Authentication:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `branch` (optional): Filter by branch (e.g. `Clifton`, `Gulshan-e-Iqbal`, `North Nazimabad`)
  - `date` (optional): Filter by date formatted as `YYYY-MM-DD`
- **Response:** `200 OK`
```json
[
  {
    "id": "KB-2603-7281",
    "orderId": "KB-2603-7281",
    "customer": { "name": "Saad Asif", "phone": "03001234567", "address": "Clifton" },
    "branch": "Clifton",
    "items": [{ "id": 1, "qty": 1, "name": "Chicken Malai Boti", "price": 850 }],
    "subtotal": 850,
    "deliveryFee": 150,
    "total": 1000,
    "status": "Received",
    "created_at": "2026-10-08T08:15:00.000Z"
  }
]
```

- **Error Response:** `401 Unauthorized`
```json
{
  "error": "Unauthorized: Bearer token required"
}
```

### Curl Example:
```bash
curl -X GET "http://localhost:3000/api/admin/orders?branch=Clifton" \
  -H "Authorization: Bearer <token>"
```

---

## 6. `PATCH /api/admin/orders/:id/status`
Advances an order to the next sequential state:
$$\text{Received} \longrightarrow \text{Preparing} \longrightarrow \text{Out for Delivery} \longrightarrow \text{Delivered}$$

- **Method:** `PATCH`
- **Authentication:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "status": "Preparing"
}
```

- **Response:** `200 OK` (returns updated order)
- **Error Response:** `400 Bad Request` (on invalid transition, skipping step, backward step, or modification of delivered order)
```json
{
  "error": "Invalid status transition from \"Received\". Must strictly advance to \"Preparing\". Skipping steps and backward moves are forbidden."
}
```
- **Error Response:** `401 Unauthorized` (missing/invalid token)
- **Error Response:** `404 Not Found` (unknown order)

### Curl Example:
```bash
curl -X PATCH http://localhost:3000/api/admin/orders/KB-2603-7281/status \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"status": "Preparing"}'
```
