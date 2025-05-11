import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MovieList from "./pages/MovieList";
import BookingDetails from "./pages/BookingDetails";
import BookingConfirmation from "./pages/BookingConfirmation";
import List from "./pages/List";
import Login from "./components/Login";            // ← NEW
import Addition from "./pages/Additional";      // ← NEW
import Register from "./components/Register";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
    const [users, setUsers] = useState({});

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Set login as homepage */}
        <Route path="/login" element={<Login />} />
        <Route path="/addition" element={<Addition />} />
        <Route path="/movies" element={<MovieList searchTerm={searchTerm} />} />
        <Route path="/booking/:id" element={<BookingDetails />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/list" element={<List />} />
        <Route path="/login" element={<Login users={users} />} />
        <Route path="/register" element={<Register setUsers={setUsers} />} />
        <Route path="/home" element={<MovieList />} />
        <Route path="*" element={<Login users={users} />} /> {/* Default */}
      </Routes>
    </Router>
  );
};

export default App;
