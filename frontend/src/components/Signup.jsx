import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import AlternateEmail from "@mui/icons-material/AlternateEmail";
import Button from "@mui/material/Button";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import LockIcon from "@mui/icons-material/Lock";

// Utils import
import { validate, sendRequest } from "../utils/signupUtil";
import { useNavigate } from "react-router-dom";

const Signup = () => {
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

  const [nameErr, setNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleRegister = async () => {
    setNameErr("");
    setPasswordErr("");
    const validity = validate(values.name, values.password1, values.password2);
    if (!validity.success) {
      if (validity.nameErr) setNameErr(validity.nameErr);
      if (validity.passwordErr) setPasswordErr(validity.passwordErr);
    }

    if (validity.success) {
      const formData = {
        name: values.name,
        email: values.email,
        password: values.password1,
      };

      const response = await sendRequest(formData, "/signup", "POST");
      console.log(response);
      if (response.success) {
        navigate("/dashboard");
      }
      if (response.failed) {
        setEmailErr(response.failed);
      }
      if (response.err) {
        setEmailErr(response.err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={(e) => e.preventDefault()} method="POST">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box>
            <AccountCircle sx={{ color: "action.active", mr: 1, mt: 3 }} />
            <TextField
              label="Full Name"
              value={values.name}
              required
              variant="standard"
              sx={{ width: "30%" }}
              name="name"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              {...(nameErr && { error: true, helperText: nameErr })}
            />
          </Box>
          <Box>
            <AlternateEmail sx={{ color: "action.active", mr: 1, mt: 3 }} />
            <TextField
              label="Email"
              type={"email"}
              required
              variant="standard"
              value={values.email}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              name="email"
              sx={{ width: "30%" }}
              {...(emailErr && { error: true, helperText: emailErr })}
            />
          </Box>
          <Box>
            <LockIcon sx={{ color: "action.active", mt: 4 }} />
            <FormControl sx={{ m: 1, width: "30%" }} variant="standard">
              <TextField
                label="Password"
                variant="standard"
                required
                type="password"
                value={values.password1}
                name="password1"
                {...(passwordErr && { error: true, helperText: passwordErr })}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </FormControl>
          </Box>
          <Box>
            <LockIcon sx={{ color: "action.active", mt: 4 }} />
            <FormControl sx={{ m: 1, width: "30%" }} variant="standard">
              <TextField
                variant="standard"
                required
                label="Confirm Password"
                type="password"
                value={values.password2}
                name="password2"
                {...(passwordErr && { error: true, helperText: passwordErr })}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </FormControl>
          </Box>
          <Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100px" }}
              onClick={handleRegister}
            >
              Register
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default Signup;
