import { Navigate, Outlet } from "react-router-dom";
import { verifyUser } from "../utils/auth";
import { useRef } from "react";
import { useEffect } from "react";
// import Login from "./Login";

const ProtectedRoutes = () => {
  let userStatus = useRef(false);
  console.log("userStatus before useEffect", userStatus);

  useEffect(() => {
    const sideEffect = async () => {
      const response = await verifyUser();
      console.log("Verify User Response: ", response);
      if (response) {
        userStatus.current = response;
      } else {
        userStatus.current = false;
        return;
      }
    };
    sideEffect();
    console.log("userStatus after useEffect", userStatus);
  }, [userStatus]);

  return userStatus ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
