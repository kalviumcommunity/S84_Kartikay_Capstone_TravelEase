# S84_Kartikay_Capstone_TravelEase

### 📡 Deployment

- 🔗 **Frontend Live Site:**  
  👉 [Frontend](https://kartikay-travelease.netlify.app/) 

- 🔗 **Backend Server:**  
  👉 [Backend](https://travelease-5z19.onrender.com)  

This deployed API handles authentication, user management, and connects to a MongoDB database.

---

# 🌍 TravelEase - Capstone Project

TravelEase is your smart companion for discovering and planning unforgettable trips. With AI-powered suggestions, curated destination and hotel insights, and a clean user dashboard—TravelEase simplifies the travel planning experience without the hassle of bookings or payments.

---

# 🧭 Project Overview

**TravelEase** is a travel discovery and trip-building web app focused on user-centric planning. Users can explore destinations, view detailed hotel and flight information (informational only), and build customizable trips. Powered by AI, the app helps generate travel itineraries based on user preferences like budget, travel style, and dates. All features are secured with email/password authentication using JWT.


---
# 🚀 Why Use TravelEase?

- 🧠 **AI Trip Planning:** Get personalized itineraries based on your style, budget, and interests.
- 🌍 **Inspiration Hub:** Discover popular and hidden gems around the globe.
- 🏨 **Hotel & Flight Info (Read-Only):** Get all the details you need—without needing to book.
- 🧳 **User Dashboard:** Create, manage, and update trips with ease.
- 🔐 **Secure & Simple:** Email-based login with secure JWT sessions.


---
# 🧩 Key Features

### 🔐 Authentication
- Email/password signup and login
- Secure JWT-based sessions
- Single user role—no admin or hierarchy

### 🌍 Destination Explorer
- Browse popular and niche destinations
- Filter destinations by categories (e.g., beach, adventure, historical)

### 🏨 Hotel Viewer
- Curated hotel listings: name, location, price, amenities, and images
- Data via **Amadeus API** + **Google Places API**
- No payment or booking system involved

### 🛫 Flight Info Browser
- Browse flight details: route, duration, cost
- Informational only (no booking)

### 🧠 AI Trip Builder
- Generate trips based on user input: interests, budget, and travel dates
- Built using **OpenAI API** and custom logic
- Fully editable itineraries

### 📋 User Dashboard
- Create, update, or delete trips
- Save favorite hotels and destinations
- No role-based access—each user sees only their own data

---

## 🛠️ Tech Stack

| Layer      | Technology                        | Purpose                                |
|------------|-----------------------------------|----------------------------------------|
| Frontend   | React.js, Vite, Bootstrap         | Fast, modern, and responsive UI        |
| Backend    | Node.js, Express.js               | RESTful APIs and routing               |
| Database   | MongoDB + Mongoose                | Flexible travel-related schemas        |
| Auth       | JWT                               | User-only login and secure sessions    |
| AI         | OpenAI API / Custom Logic         | Smart travel suggestions               |
| External APIs | Amadeus, TripAdvisor, Google Places | Real-time hotel and flight info   |
| Hosting    | Netlify (Frontend), Render/Vercel (Backend) | Free-tier and fast deployment |

---

## 🚀 Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/kalviumcommunity/S84_Kartikay_Capstone_TravelEase.git
   cd TravelEase
   ```

2. **Install Frontend & Backend Dependencies**
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Start Development Servers**
   - **Frontend:**
     ```bash
     npm run dev
     ```
   - **Backend:**
     ```bash
     node server.js
     ```

4. Open `http://localhost:5173` in your browser to explore the app!

---

# Design link :-
Low Fid prototype link :- https://www.figma.com/proto/foUrD6IzTJimjzygvsBJld/TravelEase-Capstone-low-fid?node-id=0-1&t=adgMviUn4DTYCYFH-1

---
