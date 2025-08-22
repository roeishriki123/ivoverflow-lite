IVOverflow Lite

Basic Q&A app with auth, questions, and answers.
Frontend: React + Redux Toolkit (Vite).
Backend: Node.js + Express + MongoDB (Mongoose).

📂 Project Structure
ivoverflow-lite/
├─ server/
│  ├─ src/
│  │  ├─ controllers/ (auth, user, question, answer)
│  │  ├─ middleware/auth.js
│  │  ├─ models/ (User, Question, Answer)
│  │  ├─ routes/ (auth.routes, user.routes, question.routes, answers)
│  │  └─ index.js
│  ├─ package.json
│  └─ .env (לא לשתף)
├─ client/
│  ├─ src/
│  │  ├─ lib/api.js
│  │  ├─ slices/ (authSlice, questionsSlice, answersSlice)
│  │  ├─ pages/ (Login, Questions, NewQuestion, QuestionDetail)
│  │  └─ main.jsx (React Router + Provider)
│  ├─ package.json
│  └─ .env (אופציונלי)
├─ .gitignore
└─ README.md

✅ Prerequisites

Node.js LTS

MongoDB (local: mongodb://127.0.0.1:27017)

npm

🔐 Server – Environment

צור server/.env עם הערכים הבאים (דוגמה):

# server/.env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/ivoverflow
JWT_SECRET=dev-secret-change-me
JWT_EXPIRES_IN=1h


טיפים:

אל תעלה .env ל־Git (מכוסה ב־.gitignore).

אם צריך, שמור .env.example לשיתוף ערכי־מפתח ללא סודות.

🗄️ Seed Users (DB)

בפעם הראשונה—למחוק/ליצור משתמשי דמו:

cd server
npm install
npm run seed


ברירת מחדל (לפי ה־seed):

roy@example.com / 123456

netta@example.com / password

🧰 Run – Backend
cd server
npm install
npm run dev   # או npm start


Server: http://localhost:4000
Health: GET /api/health

🖥️ Run – Frontend
cd client
npm install
npm run dev


Client: http://localhost:5173

🔗 Frontend – Notes

ניהול state: Redux Toolkit

authSlice: token + user (בעתיד)

questionsSlice: רשימת שאלות + סטטוס טעינה

answersSlice: תשובות לפי questionId

Routing:

/ → Login

/questions → רשימת שאלות

/new → יצירת שאלה

/questions/:id → שאלה בודדת + תשובות + טופס תשובה

🛡️ Auth Flow

POST /api/login → מקבלים token (JWT, תוקף 1 שעה).

ה־client שומר token גם ב־Redux וגם ב־localStorage.

כל בקשות /api/* מחייבות Header:
Authorization: Bearer <token>

🧪 Postman – Quick Check

Login:

POST http://localhost:4000/api/login
Body (JSON): { "email": "roy@example.com", "password": "123456" }


Get questions:

GET http://localhost:4000/api/getQuestions
Header: Authorization: Bearer <TOKEN>


Create question:

POST http://localhost:4000/api/createQuestion
Header: Authorization: Bearer <TOKEN>
Body: { "title": "Title", "body": "Body", "tags": ["a","b"] }


Answer a question:

POST http://localhost:4000/api/answer
Header: Authorization: Bearer <TOKEN>
Body: { "questionId": "<QUESTION_ID>", "body": "My answer" }


Get answers:

GET http://localhost:4000/api/answers/<QUESTION_ID>
Header: Authorization: Bearer <TOKEN>

📡 API Summary
Auth

POST /api/login → { token, expiresIn, user }

GET /api/userInfo (JWT) → { id, nickname, fullName, email }

Questions

POST /api/createQuestion (JWT)
Body: { title, body, tags: string[] }
Saves with authorId = req.user.id

GET /api/getQuestions (JWT)
Returns [ { _id, title, body, tags, authorId, createdAt } ]

Answers

POST /api/answer (JWT)
Body: { questionId, body }
Saves { author: { _id, nickname } }

GET /api/answers/:questionId (JWT)
Returns all answers for question

🧹 .gitignore (root)

וודא שקיים ivoverflow-lite/.gitignore:

# Node
node_modules/

# Builds
dist/
build/

# Env
.env
.env.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor/OS
.DS_Store
.idea/
.vscode/
*.swp
*.swo

🧭 Troubleshooting

401 Missing token: ודא שיש Header Authorization ב־client/ Postman.

Question validation failed: authorId is required: הגעת בלי JWT או הראוטר דילג על verifyToken.

CORS: ודא שב־server מוגדר origin נכון (http://localhost:5173).

MongoDB: בדוק שה־MONGO_URI תקין והשרת של Mongo רץ.

🧱 Tech Stack

Client: React, Redux Toolkit, React Router, Axios, Vite

Server: Node.js, Express, Mongoose, JWT

DB: MongoDB

📜 Scripts
server/package.json

dev – nodemon על השרת

start – הרצה רגילה

seed – זריעת משתמשים לדמו

client/package.json

dev – Vite dev server

build – הפקת build

preview – שרת סטטי ל־build