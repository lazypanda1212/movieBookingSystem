import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";

// Helper function to generate random rating between 3 and 5
const generateRandomRating = () => {
  return (Math.random() * (5 - 3) + 3).toFixed(1); // Generate a rating between 3 and 5
};

const List = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Assuming the API provides movie data including available seats
    axios
      .get("http://localhost:8080/api/movies/available")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  // Filter movies based on search term
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Available Movies
        </Typography>

        {/* Mini Search Bar */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "5px 10px",
              width: "300px",
            }}
          >
            <InputBase
              sx={{ flex: 1 }}
              placeholder="Search movies..."
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#00695c" }}>
              <TableRow>
                {/* Movie Index */}
                <TableCell sx={{ color: "white" }}>#</TableCell>

                {/* Movie Title with Icon */}
                <TableCell sx={{ color: "white" }}>
                  <MovieIcon sx={{ mr: 1 }} />
                  Title
                </TableCell>

                {/* Available Seats with Icon */}
                <TableCell sx={{ color: "white" }}>
                  <EventSeatIcon sx={{ mr: 1 }} />
                  Available Seats
                </TableCell>

                {/* Rating with Icon */}
                <TableCell sx={{ color: "white" }}>
                  <StarIcon sx={{ mr: 1 }} />
                  Rating
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMovies.map((movie, index) => (
                <TableRow key={movie.id}>
                  {/* Movie Index */}
                  <TableCell>{index + 1}</TableCell>

                  {/* Movie Title */}
                  <TableCell>{movie.title}</TableCell>

                  {/* Available Seats */}
                  <TableCell>{movie.availableSeats || "N/A"}</TableCell>

                  {/* Rating */}
                  <TableCell>{generateRandomRating()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default List;
