A simple React application with user authentication and notes management using Axios. Supports signup, login, add/edit/delete notes, and uses JWT for authentication.

## Features

- User Signup & Login
- JWT Authentication
- Add, Edit, Delete Notes
- Dashboard with list of notes of the currently logged in user
- Environment-based API URLs


## Tech Stack

- React
- Axios
- Tailwind CSS
- Node.js / Express (Backend)
- JWT Authentication


## Setup

1. Clone the repository

Install dependencies

npm install

Setup environment variables:

Create a .env file at the project root

VITE_API_URL=http://localhost:5000/api
For production, replace with your deployed backend URL.

Start the development server:

npm run dev
The app will run at http://localhost:5173.

Usage
Signup: Create a new account.

Login: Access your dashboard.

Dashboard: Add, edit, and delete your notes.

Logout: Clear JWT and local session.
