import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          mb: 8,
          backgroundColor: "#F8FBDF",
          p: 2,
          border: 2,
          borderColor: "black",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Typography variant="h4" sx={{}}>
              Dictionary
            </Typography>
          </Link>
          <Link to={"/favourites"}>
            <Button
              sx={{
                pb: "0px",
                pt: "8px",
                ml: 3,
                textDecoration: "underline",
                textTransform: "none",
              }}
            >
              Favourites
            </Button>
          </Link>
        </Box>
        <div sx={{}}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                marginRight: "8px",
                textTransform: "none",
              }}
            >
              Login
            </Button>
          </Link>

          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ textTransform: "none" }}>
              Signup
            </Button>
          </Link>
        </div>
      </Box>
    </>
  );
};

export default Navbar;
