import Alert from "@mui/material/Alert";
import React from "react";

const Notification = ({ severity }) => {
  console.log("Severity: ", severity);
  let message;
  switch (severity) {
    case "error":
      message = "There was an error adding to favourites";
      break;
    case "info":
      message = "Word already exists in Favourites";
      break;
    case "success":
      message = "Successfully added to Favourites";
      break;
    default:
      message = "No message";
  }
  return (
    <Alert variant="standard" severity={severity}>
      {message}
    </Alert>
  );
};

export default Notification;
