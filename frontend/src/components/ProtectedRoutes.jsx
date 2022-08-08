import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { verifyUser } from "../utils/auth";
import { useRef } from "react";
import { useEffect } from "react";
// import Login from "./Login";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const lookup = async () => {
    const whiteList = ["NG", "US", "USA"];
    let response = await fetch("https://ipinfo.io/json?token=389bc1a3b66b42");
    response = await response.json();
    if (whiteList.indexOf(response.country) === -1) {
      navigate("/404");
    } else {
      console.log("Allowed visitor");
    }
  };

  lookup();

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
