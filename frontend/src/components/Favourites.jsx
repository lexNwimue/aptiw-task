import { Typography } from "@mui/material";
import Box from "@mui/system/Box";
import SignedInNavbar from "./SignedInNavbar";

const Favourites = () => {
  return (
    <>
      <div>
        <SignedInNavbar />
        <Box sx={{ display: "flex", flexDirection: "columns", ml: 5 }}>
          <Typography variant="h5">My Favourite Words</Typography>
        </Box>
      </div>
    </>
  );
};

export default Favourites;
