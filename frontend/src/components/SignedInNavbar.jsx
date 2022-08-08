import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { Link } from "react-router-dom";
import { logout } from "../utils/signupUtil";

const SignedInNavbar = () => {
  const handleLogout = async () => {
    logout();
  };
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
                mt: "8px",
                ml: 3,
                textDecoration: "underline",
                textTransform: "none",
              }}
            >
              Favourites
            </Button>
          </Link>
        </Box>
        <Box sx={{ display: "flex", cursor: "pointer" }} onClick={handleLogout}>
          <AccountCircleTwoToneIcon fontSize="large" />
          <Typography variant="subtitle1" sx={{ pt: "5px", ml: 1 }}>
            John Doe
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default SignedInNavbar;
