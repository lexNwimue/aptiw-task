import { Navigate } from "react-router-dom";
import { verifyUser } from "../utils/auth";
import { useState } from "react";
import { useEffect } from "react";
import Dashboard from "./Dashboard";
// import Login from "./Login";

const ProtectedRoutes = () => {
  const [userStatus, setUserStatus] = useState(false);
  console.log("userStatus before useEffect", userStatus);

  useEffect(() => {
    const sideEffect = async () => {
      const response = await verifyUser();
      console.log("Verify User Response: ", response);
      const newState = !userStatus;
      setUserStatus(newState);
      console.log("New User Status", newState);
    };
    sideEffect();
    console.log("userStatus after useEffect", userStatus);
  });

  return userStatus ? <Dashboard /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
