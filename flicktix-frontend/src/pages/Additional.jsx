import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert, AppBar, Toolbar } from "@mui/material";

const Addition = () => {
  const [movie, setMovie] = useState({ title: "", description: "" });
  const [movies, setMovies] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (movie.title.trim() && movie.description.trim()) {
      setMovies([...movies, movie]);
      setSuccessMsg("Movie stored successfully!");
      setMovie({ title: "", description: "" });

      // Hide success message after 3 seconds
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">FLICKTIX ADMIN PAGE</Typography>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Add New Movie
        </Typography>

        {successMsg && <Alert severity="success">{successMsg}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Movie Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={movie.title}
            onChange={handleChange}
            required
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={movie.description}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Add Movie
          </Button>
        </form>

        {/* Movie List */}
        {movies.length > 0 && (
          <Box mt={4}>
            <Typography variant="h5">Stored Movies:</Typography>
            {movies.map((m, index) => (
              <Box key={index} mt={2} p={2} border="1px solid #ccc" borderRadius={2}>
                <Typography variant="h6">{m.title}</Typography>
                <Typography>{m.description}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Addition;
