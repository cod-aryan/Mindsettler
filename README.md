# 🧘 MindSettler: A Unified Mental Wellness Ecosystem

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://mindsettler-taupe.vercel.app/auth)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)](https://mongodb.com)
[![SVNIT Surat](https://img.shields.io/badge/Institute-SVNIT%20Surat-orange?style=for-the-badge)](https://www.svnit.ac.in)

**MindSettler** is a professional-grade mental health platform built to democratize access to specialized therapy. Designed by an AI student at **NIT Surat**, this project addresses the logistical friction in mental healthcare through an automated booking engine, a secure internal economy (Wallet), and smart-activation digital session rooms.

🚀 **Live Link:** [https://mindsettler-taupe.vercel.app/auth](https://mindsettler-taupe.vercel.app/auth)

---

## 🎯 The "Problem vs. Solution" Philosophy

### 1. The Friction Problem
**Problem:** Traditional healthcare platforms have high drop-off rates due to "Transaction Anxiety" at the point of booking.  
**Solution:** The **MindSettler Wallet**. By pre-loading credits, users can book a session with a single click. This also enables instant, frictionless refunds if a session is rescheduled.

### 2. The Ghost Link Problem
**Problem:** Users often struggle with when to join a session, leading to missed appointments.  
**Solution:** **Smart-Room Logic**. Meeting links are hidden and "Room Locked" until exactly **10 minutes before** the session (IST), providing a clear, stress-free countdown.

### 3. The Security Gap
**Problem:** Public APIs are vulnerable to brute-force attacks and spam.  
**Solution:** **Tiered Rate Limiting**. Stricter limits are applied to Auth and Corporate inquiry routes to prevent bot abuse.

---

## ✨ Core Features

### 💰 Secure Virtual Wallet System
* **Atomic Transactions:** Backend ensures the wallet balance is debited simultaneously with the appointment creation using Mongoose sessions.
* **Instant Reversals:** If an admin cancels a session, funds are returned to the user's wallet instantly.

### 📅 Intelligent Therapy Scheduler
* **Time-Aware Filtering:** Automatically hides past time slots for the current day to prevent impossible bookings.
* **Specialized Modalities:** Choose from CBT, DBT, ACT, Schema Therapy, and more.

### 🏢 Corporate Partnership Portal
* **B2B Inquiry System:** A dedicated interface for organizations to request custom workshops and employee counseling.
* **Professional Mailers:** Automated, high-fidelity HTML email templates sent via Nodemailer to the admin for every lead.

### 🎥 Digital Room "Join" Logic
* **Countdown States:** UI transitions through three states: `Locked` ⮕ `Available Soon` ⮕ `Join Now`.
* **IST Synchronization:** All scheduling logic is synchronized to **Indian Standard Time (Asia/Kolkata)**.

---

## 🛠️ Technical Problem Solving



* **Vercel Cookie Persistence:** Solved the "Cookie not saving" issue by setting `app.set("trust proxy", 1)` and configuring JWT cookies with `SameSite: "None"` and `Secure: true`.
* **304 Not Modified (Logout Bug):** Prevented browsers from caching logout responses by implementing `Cache-Control: no-store` headers, ensuring cookies are cleared every time.
* **Rate Limiting on Edge:** Implemented `express-rate-limit` with `trust proxy` enabled to accurately track user IPs across Vercel’s serverless infrastructure.
* **Google Calendar IST Fix:** Developed a custom helper to generate GCal links that force the `Asia/Kolkata` timezone, preventing 5.5-hour shifts for users.

---

## 🏗️ Architecture & Data Modeling



* **Mongoose Referencing:** Utilizes `DocumentReferences` for relational integrity between `Appointments` and `Users`.
* **Slugification:** Blog posts use human-readable slugs generated via pre-save hooks for SEO optimization.

---

## 📂 Project Structure
```text
mindsettler/
├── client/                # React (Vite) + Tailwind CSS + Framer Motion
│   ├── src/
│   │   ├── api/          # Axios instance with withCredentials: true
│   │   ├── context/      # Auth & Wallet state management
│   │   └── pages/        # Dashboard, Booking, & Corporate Views
├── server/                # Node.js + Express
│   ├── middleware/       # Auth guards & Rate limiters
│   ├── controllers/      # Wallet transactions & Email logic
│   ├── templates/        # Professional HTML Email templates
│   └── models/           # Mongoose schemas (User, Appointment, Blog)