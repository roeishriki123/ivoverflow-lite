# IVOverflow Lite

A lightweight Q&A platform built with **MERN stack** (MongoDB, Express, React, Node.js) and **Redux Toolkit**.

## Features
- JWT-based authentication and authorization  
- User, Question, and Answer management with MongoDB + Mongoose  
- Password hashing with SHA-512 (per project spec)  
- Express middleware for JWT validation and error handling  
- React frontend with Redux Toolkit for global state management  
- Questions list, question detail view, and answer submission  
- Persistent auth token storage in localStorage  
- Postman collection included (positive + negative tests)  

## Installation

```bash
# Clone repository
git clone https://github.com/<your-username>/ivoverflow-lite.git
cd ivoverflow-lite
```

### Backend
```bash
cd server
npm install
cp .env.example .env
# Fill in JWT_SECRET and MongoDB URI in .env
npm run seed   # optional: seeds hardcoded users
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## API Endpoints

### Auth
- `POST /api/login`
- `GET  /api/userInfo`

### Questions
- `POST /api/createQuestion`
- `GET  /api/getQuestions`

### Answers
- `POST /api/answer`
- `GET  /api/getQuestionAnswers?questionId=...`

> All `/api/*` routes (except `/login`) require a valid Bearer token.

## Postman Collection

In the `postman/` directory you will find:

- **IVOverflow_Lite.postman_collection.json**  
  Contains all API calls (Auth, Questions, Answers) with both positive and negative tests (e.g. missing token, empty fields).

- **IVOverflow_Lite_local.postman_environment.json**  
  Environment file with variables:
  - `baseUrl` = http://localhost:4000/api  
  - `token` = auto-set after login  
  - `questionId` = set manually after creating a question  

### Usage
1. Import both files into Postman.  
2. Select environment **IVOverflow Lite - Local**.  
3. Run requests in order: **Auth → Login**, then Questions and Answers.  
4. Use `questionId` from a created question when testing answers.

## Notes
- Requires MongoDB connection string in `.env`.  
- All features tested locally with Postman using the included collection.  
- Project follows the requirements document (Stage 1: Auth, Stage 2: Questions, Stage 3: Answers).  
