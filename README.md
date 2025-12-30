# 🧘 MindSettler - GWOC 2025-26 (Track 1)

MindSettler is a psycho-education and mental well-being platform designed to help individuals navigate life challenges through structured online/offline sessions. This project follows a "calm, human, and emotionally reassuring" design philosophy.

## 🚀 Project Features

- **Role-Based Access Control (RBAC)**: Distinct flows for Patients, Admins.
- **Session Booking System**: 60-minute structured sessions with manual UPI/Cash payment tracking.
- **Admin Dashboard**: Backend-controlled slots with Approve/Reject functionality.
- **Lead Generation**: Dedicated corporate and workshop inquiry system.
- **Confidentiality First**: Mandatory policy check before the first session.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Backend**: Node.js, Express.js (ESModules)
- **Database**: MongoDB Atlas (Mongoose)
- **Auth**: JWT & Bcryptjs
- **Deployment**: [Add if applicable, e.g., Vercel, Heroku]

## 📂 Backend API Endpoints

### Authentication

| Method | Endpoint              | Access | Description                          |
|--------|-----------------------|--------|--------------------------------------|
| POST   | /api/auth/register    | Public | Register a new user (Patient) |
| POST   | /api/auth/login       | Public | Login and receive JWT token          |

### Appointments

| Method | Endpoint                      | Access  | Description                          |
|--------|-------------------------------|---------|--------------------------------------|
| POST   | /api/appointments/book        | Patient | Request a 60-min session             |
| GET    | /api/appointments/my-sessions | Patient | View personal session history        |
| PATCH  | /api/appointments/status/:id  | Admin   | Approve/Reject and assign Consultant |

### Leads & Corporate

| Method | Endpoint          | Access | Description                          |
|--------|-------------------|--------|--------------------------------------|
| POST   | /api/leads/contact | Public | Submit corporate or workshop inquiry |

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Backend Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/Aryan-Git-Hub/Mindsettler
   cd Mindsettler/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory with the following variables:
   ```
   PORT=4000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.39gfmzb.mongodb.net/mindsettler?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   ```

4. Run the server:
   ```bash
   npm run dev  # For development (with nodemon)
   # or
   npm start    # For production
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd ../client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
Mindsettler/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── package.json
├── server/          # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- Project Link: [GitHub Repository](https://github.com/Aryan-Git-Hub/Mindsettler)
- GWOC 2025-26 Track 1