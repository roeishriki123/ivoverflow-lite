IVOverflow Lite

A lightweight Q&A platform built with MERN stack (MongoDB, Express, React, Node.js) and Redux Toolkit.

Features

JWT-based authentication and authorization

User, Question, and Answer management with MongoDB + Mongoose

Secure password hashing and input validation

React frontend with Redux Toolkit for global state management

Questions list, question detail view, and answer submission

Persistent auth token storage in localStorage

Installation
# Clone repository
git clone https://github.com/<your-username>/ivoverflow-lite.git
cd ivoverflow-lite

Backend
cd server
npm install
cp .env.example .env
npm run dev

Frontend
cd client
npm install
npm run dev

Deployment

Backend: Render / Heroku

Frontend: Vercel / Netlify

Database: MongoDB Atlas
