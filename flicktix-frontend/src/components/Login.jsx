import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import InfoIcon from "@mui/icons-material/Info";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Login = ({ users }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

const handleLogin = () => {
   navigate("/home");
};
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#00695c" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Flictix</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton color="inherit"><MovieIcon /></IconButton>
            <IconButton color="inherit"><AccountCircleIcon /></IconButton>
            <IconButton color="inherit"><InfoIcon /></IconButton>
            <IconButton color="inherit"><HelpOutlineIcon /></IconButton>
          </Box>
          <Box sx={{ width: 120 }} />
        </Toolbar>
      </AppBar>

      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Paper elevation={3} sx={{ p: 4, width: 300 }}>
          <Typography variant="h5" gutterBottom>Login</Typography>
          {location.state?.fromRegister && (
            <Typography variant="body2" color="green">Registered successfully! Please log in.</Typography>
          )}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
