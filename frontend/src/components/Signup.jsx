import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import AlternateEmail from "@mui/icons-material/AlternateEmail";
import Button from "@mui/material/Button";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";

// Utils import
import signupUtil from "../utils/signupUtil";

const Signup = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password1, setPassword1] = useState("");
  // const [password2, setPassword2] = useState("");
  const [nameErr, setNameErr] = useState("");

  const [passwordErr, setPasswordErr] = useState("");

  const [values, setValues] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
    showPassword: false,
  });

  const handleRegister = async () => {
    console.log("nameErr: ", nameErr);
    console.log("passwordErr: ", passwordErr);
    setNameErr("");
    setPasswordErr("");
    const validate = signupUtil(
      values.name,
      values.email,
      values.password1,
      values.password2
    );
    // console.log(validate);
    if (!validate.success) {
      if (validate.nameErr) setNameErr(validate.nameErr);
      if (validate.passwordErr) setPasswordErr(validate.passwordErr);
    }

    if (validate.success) {
      const body = {
        name: values.name,
        email: values.email,
        password: values.password1,
      };
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.failed) {
        // set errors here
      }
      if (data.success) {
        // Navigate to dashboard here
      }
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            />
          </Box>
          <Box>
            <LockIcon sx={{ color: "action.active", mt: 2 }} />
            <FormControl sx={{ m: 1, width: "30%" }} variant="standard">
              {/* <InputLabel htmlFor="standard-adornment-password1">
                Password
              </InputLabel> */}
              <TextField
                id="standard-adornment-password1"
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
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box>
            <LockIcon sx={{ color: "action.active", mt: 2 }} />
            <FormControl sx={{ m: 1, width: "30%" }} variant="standard">
              {/* <InputLabel htmlFor="standard-adornment-password2">
                Confirm Password
              </InputLabel> */}
              <TextField
                variant="standard"
                id="standard-adornment-password2"
                required
                label="Confirm Password"
                type="password"
                value={values.password2}
                name="password2"
                {...(passwordErr && { error: true, helperText: passwordErr })}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
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
