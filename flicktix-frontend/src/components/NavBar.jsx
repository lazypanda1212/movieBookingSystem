import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Button,
  Divider
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt"; // Changed to ListAlt Icon
import { styled, alpha } from "@mui/material/styles";

// Styled Search Bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  width: "100%",
  maxWidth: 600,
  padding: "5px 10px",
  border: "1px solid #ffffff33",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  width: "100%",
  "& .MuiInputBase-input": {
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
  },
}));

const NavBar = ({ onSearch }) => {
  const navigate = useNavigate(); // Initialize the navigate hook for routing

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  const handleHomeClick = () => {
    navigate("/"); // Navigate to the root page ("/")
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#00695c",
          boxShadow: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: 2,
            m: 0,
            p: 0,
            minHeight: "64px !important",
          }}
        >
          {/* Left: Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="text"
              color="inherit"
              startIcon={<HomeIcon />}
              onClick={handleHomeClick} // Added onClick for Home button to navigate to root page
              className="navbar-btn"
            >
              Home
            </Button>
            <Button
              variant="text"
              color="inherit"
              startIcon={<AccountCircleIcon />}
              className="navbar-btn"
            >
              Account
            </Button>
            {/* List Button */}
            <Button
              variant="text"
              color="inherit"
              startIcon={<ListAltIcon />}
              className="navbar-btn"
              onClick={() => navigate("/list")} // Navigate to the List page
            >
              List
            </Button>
          </Box>

          {/* Center: Search */}
          <Search>
            <StyledInputBase
              placeholder="Search for movies..."
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </Search>

          {/* Right: Fancy FlickTix */}
          <Box>
            <Typography
              variant="h3"
              onClick={handleHomeClick} // Clicking on the logo also navigates to the root page
              sx={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "2.8rem",
                color: "white",
                letterSpacing: "4px",
                cursor: "pointer",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                transition: "color 0.3s ease, transform 0.3s ease",
                "&:hover": {
                  color: "red",
                  transform: "scale(1.05)",
                },
                "& span": {
                  color: "red",
                  fontSize: "3rem",
                },
              }}
            >
              <span>F</span>lick<span>T</span>ix
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Divider sx={{ backgroundColor: "#004d40", height: 2 }} />
    </>
  );
};

export default NavBar;
