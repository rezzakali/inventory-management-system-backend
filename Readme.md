# Inventory Management System (IMS)

This is a full-featured Inventory Management System (IMS) designed with role-based access control (RBAC) for multiple user roles. The system allows managing products, suppliers, orders, and inventory reports. It is built using the **MERN stack** (MongoDB, Express.js, React, Node.js) and follows best practices for scalability and maintainability.

---

## **Features**

### 1. **Roles and Permissions**

- **Admin**:
  - Full access to manage products, suppliers, orders, and reports.
  - Manage other users and assign roles.
- **Manager**:
  - Manage stock and orders.
  - Generate and view reports.
- **Employee**:
  - Update inventory details (e.g., stock received).

### 2. **Admin Dashboard**

- View low-stock alerts.
- Get an overview of inventory metrics (total products, categories, suppliers).
- View recent orders.

### 3. **Product Management**

- Add, update, and delete products.
- Track product stock levels and set low-stock thresholds.

### 4. **Supplier Management**

- Add, update, and delete supplier details.

### 5. **Order Management**

- Create incoming (from suppliers) or outgoing (to customers) orders.
- Update order statuses (e.g., Pending, Completed, Cancelled).

### 6. **Reports**

- Generate fast-moving product reports.
- View stock trends over time.

---

## **Tech Stack**

- **Frontend**: React (with Vite) + Tailwind CSS + ShadCN (Radix components)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for schema management)
- **Authentication**: JSON Web Tokens (JWT) with Role-Based Access Control (RBAC)
- **Deployment**:
  - Frontend: Vercel/Netlify
  - Backend: Render/AWS

---

## **Installation and Setup**

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud instance like MongoDB Atlas)
- Package Manager: npm or yarn

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/ims.git
   cd ims
   ```

2. **Install dependencies for the backend:**

   ```bash
   cd backend
   npm install
   ```

3. **Install dependencies for the frontend:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables:**

   - Create a `.env` file in the `backend` directory with the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongo_connection_string
     JWT_SECRET=your_secret_key
     ```

5. **Start the backend server:**

   ```bash
   cd backend
   npm start
   ```

6. **Start the frontend server:**

   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

---

## **API Endpoints**

### **Base URL**

- Local: `http://localhost:5000/api`

### **Authentication**

> _All endpoints require authentication using a JWT token. Admins can manage user roles._

#### **Login**

```http
POST /api/auth/login
```

- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "<JWT Token>",
    "role": "Admin"
  }
  ```

#### **Manage Users (Admins Only)**

- **Add User:**

  ```http
  POST /api/users
  ```

  - **Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123",
      "role": "Manager"
    }
    ```

- **Update User Role:**

  ```http
  PATCH /api/users/:id/role
  ```

  - **Body:**
    ```json
    {
      "role": "Employee"
    }
    ```

- **Delete User:**
  ```http
  DELETE /api/users/:id
  ```

---

### **Product Management**

#### **Add Product**

```http
POST /api/products
```

- **Body:**
  ```json
  {
    "name": "Product Name",
    "category": "Category",
    "sku": "SKU123",
    "quantity": 100,
    "price": 50.99,
    "lowStockThreshold": 10
  }
  ```

#### **Update Product**

```http
PUT /api/products/:id
```

- **Body:** (fields to update)
  ```json
  {
    "quantity": 200
  }
  ```

#### **Delete Product**

```http
DELETE /api/products/:id
```

#### **Get All Products**

```http
GET /api/products
```

---

### **Supplier Management**

#### **Add Supplier**

```http
POST /api/suppliers
```

- **Body:**
  ```json
  {
    "name": "Supplier Name",
    "contact": "123-456-7890",
    "address": "123 Supplier St."
  }
  ```

#### **Update Supplier**

```http
PUT /api/suppliers/:id
```

- **Body:** (fields to update)
  ```json
  {
    "contact": "987-654-3210"
  }
  ```

#### **Delete Supplier**

```http
DELETE /api/suppliers/:id
```

#### **Get All Suppliers**

```http
GET /api/suppliers
```

---

### **Order Management**

#### **Add Order**

```http
POST /api/orders
```

- **Body:**
  ```json
  {
    "product": "productId",
    "quantity": 50,
    "type": "Incoming"
  }
  ```

#### **Update Order Status**

```http
PATCH /api/orders/:id
```

- **Body:**
  ```json
  {
    "status": "Completed"
  }
  ```

#### **Get All Orders**

```http
GET /api/orders
```

---

### **Dashboard**

#### **Low Stock Alerts**

```http
GET /api/products/low-stock
```

#### **Stock Overview**

```http
GET /api/overview
```

- **Response Example:**
  ```json
  {
    "totalProducts": 100,
    "lowStockCount": 5,
    "totalSuppliers": 20
  }
  ```

---

## **Folder Structure**

### Backend

```
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
└── server.js
```

### Frontend

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
└── vite.config.js
```

---

## **Key Milestones**

### **1. Setup and Initial Configuration**

- **Time Estimate**: 2 days
- **Deliverables**:
  - Backend and frontend initialized.
  - Basic folder structure and configuration completed.

### **2. Authentication**

- **Time Estimate**: 3 days
- **Deliverables**:
  - User model created.
  - Login functionality with JWT.

### **3. Authorization**

- **Time Estimate**: 2 days
- **Deliverables**:
  - Role-based middleware implemented.
  - Protect routes based on roles.

### **4. Permissions**

- **Time Estimate**: 1 day
- **Deliverables**:
  - Permissions middleware implemented.
  - Different actions allowed based on roles
