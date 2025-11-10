# Discussion Forum — Clean Minimal Glass UI

A full-stack discussion forum web application with a **glassy minimal UI**, **user authentication**, and **MongoDB-based message storage**.  
This project is built with a separate **frontend** and **backend** structure to keep development clean and scalable.

---

## 🚀 Features

| Feature | Description |
|--------|-------------|
| User Signup / Login | Secure authentication with hashed passwords (bcrypt) |
| JWT Authentication | Protects message posting endpoints |
| Real-Time Messages (Auto Refresh) | Messages update live using periodic fetch |
| MongoDB Storage | Messages and users stored in MongoDB |
| Glassmorphism UI | Clean, modern frosted-glass interface |
| Fully Separated Frontend & Backend | Easy to maintain and upgrade |

---

## 🏛️ Project Structure

discussion-forum/
│
├── backend/
│ ├── server.js
│ ├── package.json
│ ├── .env
│ └── models/
│ ├── User.js
│ └── Message.js
│
└── frontend/
├── index.html
├── login.html
├── signup.html
├── style.css
└── script.js


---

## 🛠️ Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | HTML, CSS (Glass UI), JavaScript |
| Backend | Node.js + Express.js |
| Authentication | bcryptjs + JSON Web Tokens |
| Database | MongoDB (Local) |
| Communication | REST API |

---

## ⚙️ Setup Instructions

### 1️⃣ Start MongoDB

Make sure MongoDB Server is installed.  
Start database:

"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\data\db"


> Keep this window running.

---

### 2️⃣ Backend Setup

cd backend
npm install
npm start


If configured correctly, you will see:


✅ MongoDB Connected
🚀 Backend running on http://localhost:5000

---

### 3️⃣ Frontend Setup

Just open the frontend UI in your browser:

frontend/login.html

---

## 🔐 Usage

1. Open **login.html**
2. Click **Signup** to create an account
3. Login
4. Start chatting on the discussion board 🎉

---

## 🌟 Future Upgrade Ideas

| Feature | Status | Notes |
|--------|--------|------|
| Live WebSocket Chat | Planned | Will use Socket.IO |
| Message Replies & Threads | Planned | Reddit style |
| User Avatars | Planned | Random color / upload |
| Dark / Light Mode | Planned | Theme toggle |

---

## 🙌 Author

**Aaditya Bhure**

GitHub: https://github.com/AadityaBhure

---

## 📝 License

This project is open-source and free to modify.

