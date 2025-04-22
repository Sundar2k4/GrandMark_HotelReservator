import React from "react";
import IndexPage from "./pages/IndexPage.jsx";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./pages/Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import axios from "axios";
import { useEffect } from "react";
import { UserContextProvider } from "./UserContext.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlacesPage from "./pages/PlacesPage.jsx";
import PlacesFormPage from "./pages/PlacesFormPage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "https://grandmark-hotelreservator-api.onrender.com";
} else {
  axios.defaults.baseURL = "http://localhost:4000";
}
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<DetailsPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
