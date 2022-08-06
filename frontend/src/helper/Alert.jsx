import React from "react";

const Alert = ({ severity }) => {
  return (
    <Alert variant="outlined" severity={severity}>
      This is an error alert — check it out!
    </Alert>
  );
};

export default Alert;
