import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia
} from "@mui/material";

const categories = ["Upcoming", "Recent", "Most Watched", "All"];

const generateRandomDate = () => {
  const start = new Date("2021-01-01").getTime();
  const end = new Date("2024-12-31").getTime();
  const randomDate = new Date(start + Math.random() * (end - start));
  return randomDate.toISOString().split("T")[0];
};

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/movies/available")
      .then((response) => {
        const moviesWithDates = response.data.map((movie) => ({
          ...movie,
          releaseDate: movie.releaseDate || generateRandomDate(),
        }));
        setMovies(moviesWithDates);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categorizedMovies = (catIndex) => {
    const count = Math.ceil(filteredMovies.length / 4);
    return filteredMovies.slice(catIndex * count, (catIndex + 1) * count);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const getImageUrl = (id) => {
    const imageUrlJpg = `/images/${id}.jpg`;
    const imageUrlPng = `/images/${id}.png`;
    return imageUrlJpg || imageUrlPng;
  };

  return (
    <>
      <NavBar onSearch={handleSearch} />
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3, py: 4 }}>
        {categories.map((cat, i) => (
          <Box key={cat} sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>{cat} Movies</Typography>
            <Box sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              paddingBottom: "10px",
              '&::-webkit-scrollbar': { height: 8 },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: "#ccc",
                borderRadius: "4px",
              }
            }}>
              {categorizedMovies(i).map((movie, index) => (
                <Card
                  key={index}
                  sx={{
                    width: 250,
                    height: 380,
                    position: "relative",
                    flexShrink: 0,
                    overflow: "hidden",
                    borderRadius: 2,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={getImageUrl(movie.id)}
                    alt={movie.title}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      bgcolor: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      px: 2,
                      py: 1.5,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        mb: 1,
                        textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
                      }}
                    >
                      {movie.title}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/booking/${movie.id}`)}
                      sx={{
                        backgroundColor: "#e50914",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "0.875rem",
                        "&:hover": {
                          backgroundColor: "#b81d24",
                          transform: "scale(1.03)",
                        },
                      }}
                    >
                      Book a Show
                    </Button>
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default MovieList;
