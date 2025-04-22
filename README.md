# 🏨 GrandMark Hotel Reservator

Welcome to **GrandMark** – a modern, full-stack hotel reservator web application where users can seamlessly **host their own properties** or **rent unique places** for a memorable stay. 
Whether you're a traveler looking for a peaceful escape or a host wanting to share your special space with the world, GrandMark is built to make the experience smooth, secure, and beautiful.

---

## ✨ Features

- ✅ **User Authentication**
  - Secure login & registration using JWT
  - Context-based user management (React Context API)
  
- 🏡 **Host a Place**
  - Add your property with detailed descriptions, images, pricing, perks, and availability
  - Edit or delete your listings at any time
  
- 🌍 **Explore & Book Stays**
  - Browse all listed properties
  - View full details including amenities, photos, price, and location
  - Book a place by selecting dates and number of guests
  
- 🖼️ **Photo Gallery & Viewer**
  - Upload multiple images while listing a property
  - Zoomable, modal-based image viewer on the place detail and booking pages
  
- 📅 **My Bookings Page**
  - View all your current and past reservations
  - Booking summary includes price, dates, contact info, and property details

- ⚙️ **Responsive Design**
  - Mobile-first, responsive design using Tailwind CSS for a beautiful look on any device

---

## ⚙️ Tech Stack

| Layer      | Tech Stack                          |
|------------|--------------------------------------|
| Frontend   | React, Tailwind CSS, React Router    |
| Backend    | Node.js, Express.js, JWT             |
| Database   | MongoDB (Mongoose ODM)               |
| API Calls  | Axios                                |
| Uploads    | Multer for image handling            |
| Hosting    | Vercel (frontend), Render (backend)  |

---

## 🌐 Live Demo

- 🔗 **Frontend:** [https://your-frontend.vercel.app](https://your-frontend.vercel.app)
- 🔗 **Backend:** [https://grandmark-hotelreservator-api.onrender.com](https://grandmark-hotelreservator-api.onrender.com)

---


---

## 🚀 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/grandmark-hotel-reservator.git
cd grandmark-hotel-reservator
```

### 2. Set Up the Backend

```bash
cd api
npm install

# Create a .env file
touch .env
```

**.env file example:**
```env
MONGO_URL=mongodb+srv://<your-db-url>
JWT_SECRET=your_jwt_secret
```

Run the backend:
```bash
npm run dev
```

### 3. Set Up the Frontend


cd ../client
npm install
npm run dev

---

## 📁 Project Structure


grandmark-hotel-reservator/
├── client/              # Frontend React App
│   ├── pages/           # All pages (Login, Register, Booking, etc.)
│   ├── components/      # Reusable UI components
│   └── UserContext.jsx  # Global auth/user context
│
├── api/                 # Backend Express App
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware, file upload config
│   └── uploads/         # Uploaded images stored here
│
└── README.md


---

## 🧠 Tips for Deployment

- Use **Vercel** for the frontend and **Render** for backend.
- Set your frontend `.env` with:
env
VITE_API_BASE_URL=https://grandmark-hotelreservator-api.onrender.com
  
- Ensure CORS and credentials are properly configured in your Express app.

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to open a pull request or fork the repo to enhance the app.

---

## 📃 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute it as you wish.

---

## 👨‍💻 Developer

Made with ❤️ by Sundar

Connect with me:  
[🔗 GitHub](https://github.com/Sundar2k4)  
[📧 Email](mailto:csundar993@gmail.com)
