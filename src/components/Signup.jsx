import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import AlternateEmail from "@mui/icons-material/AlternateEmail";
import Button from "@mui/material/Button";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";

const Signup = () => {
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <>
      <Navbar />
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
            id="input-with-sx"
            label="Full Name"
            variant="standard"
            sx={{ width: "30%" }}
          />
        </Box>
        <Box>
          <AlternateEmail sx={{ color: "action.active", mr: 1, mt: 3 }} />
          <TextField
            id="input-with-sx"
            label="Email"
            variant="standard"
            sx={{ width: "30%" }}
          />
        </Box>
        <Box>
          <LockIcon sx={{ color: "action.active", mt: 3 }} />
          <FormControl sx={{ m: 1, width: "30%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
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
          <Button variant="contained" sx={{ width: "100px" }}>
            Register
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
