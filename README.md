

# 🎯  Job Mania - MERN + Flutter

A **Job Mania** designed to connect students and recruiters, developed using the **MERN Stack** for the backend and admin panel, and **Flutter** for the mobile application. This project showcases full-stack development skills across web and mobile platforms.

---

## 📦 Tech Stack

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend (Admin Panel):** React.js
- **Mobile App:** Flutter
- **API Communication:** REST API (JSON)
- **Authentication:** JWT (JSON Web Tokens)
- **Storage:** MongoDB Atlas (Cloud) / Local MongoDB (Optional)
- **Deployment (Optional):** Render / Vercel / Firebase Hosting

---

## 📱 Features

### Admin Panel (React.js Web)
- Admin Login
- Manage Jobs (Add, Edit, Delete)
- Manage Employers and Students
- View Applications

### API Server (Node.js + Express.js)
- Student and Employer Registration/Login
- CRUD for Jobs
- Apply for Jobs
- Manage Profiles
- Secure APIs with Authentication

### Mobile App (Flutter)
- Student Login/Signup/createAccount
- View Available Jobs
- Search and Filter Jobs
- Apply to Jobs
- Update Profile

---

## 🛠️ Installation and Setup

### 1. Backend (Node.js Server)

```bash
cd Backend
npm install
npm run dev
```

Server runs on `http://localhost:5500`.

---

### 2. Admin Panel (React.js Frontend)

```bash
cd Frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`.

---

### 3. Mobile App (Flutter)

```bash
cd MobileApp
flutter pub get
flutter run
```

Ensure you have an emulator or a connected device ready!

---

## 🔑 Environment Variables

Create a `.env` file in the backend root with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

(You may need `.env` setup for Flutter too if using APIs that require keys.)

---

## 🖼️ Folder Structure

```
/backend       -> Node.js + Express Server
/frontend         -> web dashboard and others
/MobileApp        -> Flutter Mobile App
```

---

## ✨ Future Improvements

- Push Notifications for New Jobs
- Admin Dashboard with Graphs
- Upload Resume (PDF)
- Favorite Jobs
- Company Profiles

---

## 👨‍💻 Developed By

- **Name:** Subas Kandel
- **College:** Softwarica College of IT and Eccomerce
- **Assessment:** BSc. Hons Computing
- **Year:** 2025

---
