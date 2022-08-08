import Box from "@mui/system/Box";
import SignedInNavbar from "./SignedInNavbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { viewFavourites, deleteWordFromFav } from "../utils/signupUtil";
import { useState, useEffect } from "react";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    const getFavourites = async () => {
      let favourites = await viewFavourites();
      setFavourites(favourites);
    };
    getFavourites();
  }, []);

  const handleDelete = async (e) => {
    const word = e.currentTarget.id;
    // const newFav = favourites.filter((fav) => fav !== word);
    // setFavourites(newFav);
    let response = await deleteWordFromFav(word);
    console.log(response);
    setFavourites(response);
  };
  return (
    <>
      <div>
        <SignedInNavbar />
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "#fdfdfd" }}>
          <Divider />
          <List>
            {favourites &&
              favourites.map((favourite) => {
                return (
                  <Box key={favourite}>
                    <ListItem
                      disablePadding
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          id={favourite}
                          onClick={handleDelete}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemButton>
                        <ListItemText primary={favourite} />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </Box>
                );
              })}
          </List>
        </Box>
      </div>
    </>
  );
};

export default Favourites;
