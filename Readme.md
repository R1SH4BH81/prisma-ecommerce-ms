

# 🛒 Ecommerce Backend with Microservices

This project is a **backend for an e-commerce platform** built using **Node.js, Express, Prisma ORM, PostgreSQL, and Microservices architecture**.

It provides APIs for managing **Users, Products, Categories, Orders, Payments, and Cart**.
We are structuring each domain into its own **microservice**, so they can be developed, deployed, and scaled independently.

---

## ⚡ Tech Stack

* **Node.js + Express** → Backend framework
* **Prisma ORM** → Database ORM for PostgreSQL
* **PostgreSQL** → Relational database
* **JWT Authentication** → Secure user sessions
* **Microservices** → Each domain (Auth, Product, Order, Cart, Payment) is a separate service
* **REST API** → Service-to-service and client communication
* **Docker (optional)** → For containerization and running services

---

## 📂 Folder Structure

```bash
server/
├── services/
│   ├── authServices/        # Handles authentication & authorization
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── index.js
│   │
│   ├── productServices/     # Manages products & categories
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── index.js
│   │
│   ├── orderServices/       # Manages orders & order items
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── index.js
│   │
│   ├── cartServices/        # Manages user carts
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── index.js
│   │
│   ├── paymentServices/     # Handles payments
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── index.js
│
├── prisma/
│   ├── schema.prisma        # Prisma schema (Postgres models)
│   └── migrations/          # Prisma migration files
│
├── .env                     # Environment variables
├── package.json
└── README.md
```

---

## 🔑 Core Features

* **Authentication Service**

  * User signup / login
  * Role-based access (`CUSTOMER`, `ADMIN`)
* **Product Service**

  * Create, update, delete products (**Admin only**)
  * Get all products / by ID
  * Manage categories
* **Order Service**

  * Customers (and Admins) can place orders
  * Each order linked to user and products
* **Cart Service**

  * Add/remove products in cart
  * View user cart
* **Payment Service**

  * Simple order payment simulation

---

## 🚀 Running the Project

1. **Clone Repo**

   ```sh
  https://github.com/R1SH4BH81/prisma-ecommerce-ms.git
   cd server
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Setup Environment Variables (`.env`)**

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
   JWT_SECRET=your-secret-key
   ```

4. **Run Prisma Migrations**

   ```sh
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start Services**

   ```sh
   nodemon services/authServices/index.js
   nodemon services/productServices/index.js
   nodemon services/orderServices/index.js
   nodemon services/cartServices/index.js
   nodemon services/paymentServices/index.js
   ```

---

## 📖 API Testing Manual

You can test APIs using **Postman** or **Thunder Client**.

### 1. **Auth**

* `POST /auth/register` → Register new user
* `POST /auth/login` → Login and get JWT token

### 2. **Categories**

* `POST /categories` → Create category (**Admin only**)
* `GET /categories` → Get all categories
* `PUT /categories/:id` → Update category (**Admin only**)
* `DELETE /categories/:id` → Delete category (**Admin only**)

### 3. **Products**

* `POST /products` → Create product (**Admin only**)
* `GET /products` → Get all products
* `GET /products/:id` → Get single product
* `PUT /products/:id` → Update product (**Admin only**)
* `DELETE /products/:id` → Delete product (**Admin only**)

### 4. **Orders**

* `POST /orders` → Create order (with items)

```json
{
  "items": [
    { "productId": 7, "quantity": 2, "price": 1499 }
  ]
}
```

* `GET /orders` → Get all orders (Admin) / user’s orders (Customer)

### 5. **Cart**

* `POST /cart` → Add product to cart
* `GET /cart` → Get user’s cart
* `DELETE /cart/:itemId` → Remove item from cart

### 6. **Payments**

* `POST /payments` → Pay for an order

---


