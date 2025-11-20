Employee Management System
----------------------------------------------------
Overview:

The Employee Management System is a full-stack web application built with React for the frontend and Node.js + Express + MongoDB for the backend.
It allows users to register, login, view profiles, list employees, edit, and delete employee records. Authentication is handled via JWT tokens and sessions are stored in localStorage.

----------------------------------------------------
Features:

User Authentication: Register and login with JWT-based authorization

Profile Management: View your profile and employee details

Employee CRUD: Add, edit, delete, and view employee records

Secure Routes: Routes are protected via JWT tokens

Responsive UI: Built with React and Bootstrap

API Communication: Axios for HTTP requests

----------------------------------------------------
Tech Stack:

Frontend: React, React Router DOM, Axios, Bootstrap

Backend: Node.js, Express, MongoDB, Mongoose

Authentication: JWT, bcryptjs for password hashing

Environment Variables: .env for sensitive data

Deployment: Netlify (frontend), any cloud provider for backend

----------------------------------------------------

Folder Structure:
employee-management-system/
│
├── backend/
│   ├── index.js
│   ├── models/
│   │   └── employee.model.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── EmployeeList.jsx
│   │   │   ├── Edit.jsx
│   │   │   └── Delete.jsx
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env
└── README.md
----------------------------------------------------
Prerequisites:

Node.js v18+

MongoDB instance (local or cloud)

npm or yarn package manager

----------------------------------------------------

Environment Variables:

Create a .env file in both frontend and backend folders:

Backend .env:
PORT=4000
MONGO_URI=<Your MongoDB URI>
JWT_SECRET_KEY=<Your Secret Key>

Frontend .env:
REACT_APP_API_URL=http://localhost:4000

----------------------------------------------------
Installation:

Backend:
cd backend
npm install

Frontend:
cd frontend
npm install

----------------------------------------------------
Running the Application
Backend:
cd backend
node index.js


Server will run on http://localhost:4000

Frontend:
cd frontend
npm start


Frontend will run on http://localhost:3000

----------------------------------------------------

API Endpoints:

Endpoint	Method	Description:
/register	POST	Register a new employee
/login	POST	Login and receive JWT token
/userData	POST	Get user details (JWT required)
/Employees	GET	Get all employees
/Employee	POST	Get single employee details
/update	POST	Update employee details
/deleteEmployee	DELETE	Delete employee by ID

Deployment
Frontend (Netlify)

Connect your GitHub repo to Netlify.

Set Build Command:

CI=false npm run build


Set Publish directory:

build


Add environment variable REACT_APP_API_URL in Netlify dashboard.

Deploy.

Backend (Heroku / Render / Railway / VPS)

Ensure your backend .env variables are configured.

Run node index.js or use a process manager like PM2.

Make sure frontend REACT_APP_API_URL points to your deployed backend URL.

----------------------------------------------------

Notes:

Passwords are hashed using bcryptjs before storing in MongoDB.

JWT tokens are stored in localStorage, which is suitable for demos but not recommended for production.

Make sure your backend server is running when using frontend features.

EmployeeList, Edit, and Delete pages are nested under the /profile route.

----------------------------------------------------

Future Enhancements:

Add role-based access control (Admin / Employee)

Implement search and filter for employee records

Improve UI/UX and add proper form validation

Use refresh tokens for better authentication security

Author

Your Name – Aash Minj
