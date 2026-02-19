# Youth Affairs Agency (Yoshlar Ishlari Agentligi) - Web Portal

This is the repository for the **Youth Affairs Agency** web portal. It is a full-stack web application built with the **MERN** stack (MongoDB, Express.js, React, Node.js).

## 🚀 Tech Stack

### Client (Frontend)
- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS 4
- **Router:** React Router DOM 7
- **Icons:** Lucide React
- **Internationalization:** i18next (Multi-language support: UZ, RU, EN)
- **Animations:** AOS, Framer Motion
- **HTTP Client:** Axios

### Server (Backend)
- **Runtime:** Node.js
- **Framework:** Express.js 5
- **Database:** MongoDB (aggregated with Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **File Uploads:** Multer
- **Security:** Helmet, CORS, Express Rate Limit

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/pragramist0001-dev/yoshlar_ishlari_agentligi.git
cd yoshlar_ishlari_agentligi
```

### 2. Setup Server (Backend)
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/yoshlar_agentligi
JWT_SECRET=your_super_secret_key_here
# Add other necessary env variables if any
```

Start the backend server:
```bash
npm run dev
# Server will run on http://localhost:5000
```

### 3. Setup Client (Frontend)
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

The frontend should be configured to proxy requests to `http://localhost:5000` (or update `VITE_API_URL` if you have an environment variable for it).

Start the frontend development server:
```bash
npm run dev
# Client will run on http://localhost:5173
```

---

## 📂 Project Structure

```
yoshlar_ishlari_agentligi/
├── client/                 # Frontend React Application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── layouts/        # Layout components (Admin, Main)
│   │   ├── pages/          # Page components (Home, News, Admin Dashboard)
│   │   ├── services/       # API services (Axios instance)
│   │   ├── store/          # Redux store slices
│   │   ├── locales/        # Translation JSON files
│   │   └── ...
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                 # Backend Node.js Application
│   ├── config/             # DB Configuration
│   ├── controllers/        # Route Logic
│   ├── middleware/         # Auth & Upload Middleware
│   ├── models/             # Mongoose Models
│   ├── routes/             # API Routes
│   ├── uploads/            # Uploaded files directory
│   ├── server.js           # Entry point
│   └── package.json
│
└── README.md               # Project Documentation
```

## ✨ Features
- **Public Portal:** News, Documents, Leadership, Projects, Applications.
- **Admin Panel:** Dashboard with CRUD operations for News, Documents, Projects, etc.
- **Localization:** Full support for Uzbek, Russian, and English languages.
- **Responsive Design:** Optimized for Mobile, Tablet, and Desktop.
- **Dark Mode:** Admin panel theme toggle.
- **Animations:** Engaging scroll animations.

## 🤝 Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---
&copy; 2026 Yoshlar Ishlari Agentligi
