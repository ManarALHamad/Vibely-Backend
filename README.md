# Vibely Backend

This is the backend API for Vibely, a social media application where users can create posts, interact with other users, comment, like posts, and follow other profiles.

## Features

- User authentication using JWT
- Create and manage users
- Create, view, update, and delete posts
- Create, view, update, and delete comments
- Like and unlike posts
- Follow and unfollow users
- Store followers and following
- MongoDB database integration

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- dotenv
- CORS

## Frontend Repository

The React frontend for Vibely can be found here:

[Vibely Frontend Repository](https://github.com/ManarALHamad/Vibely-Frontend)

## Getting Started

Follow these steps to run the Vibely backend locally.

### 1. Clone the Repository

```bash
git clone https://github.com/ManarALHamad/Vibely-Backend.git
```

### 2. Navigate to the Project

```bash
cd Vibely-Backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Environment Variables

Create a `.env` file in the root directory.

Add the required environment variables:

```env
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

Do not commit your `.env` file to GitHub.

### 5. Start the Backend Server

Run:

```bash
npm run dev
```

The backend server should now be running locally.

### 6. Start the Frontend

Clone the frontend repository:

```bash
git clone https://github.com/ManarALHamad/Vibely-Frontend.git
```

Navigate to the frontend:

```bash
cd Vibely-Frontend
```

Install dependencies:

```bash
npm install
```

Create the frontend `.env` file:

```env
VITE_BACK_END_SERVER_URL=http://localhost:3000
```

Then start the frontend:

```bash
npm run dev
```

Vite will display the local URL in your terminal, usually:

```text
http://localhost:5173
```

Open this URL in your browser to use Vibely.

## Deployed API

The deployed backend can be accessed here:

[View Vibely Backend](YOUR_DEPLOYED_BACKEND_URL)

