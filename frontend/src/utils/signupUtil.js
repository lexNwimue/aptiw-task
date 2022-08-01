const signupUtil = (name, email, password1, password2) => {
  console.log("Details", name, email, password1.length, password2.length);

  if (name.match(/[0-9]/)) {
    //Check if name contains a number
    return { nameErr: "Name cannot contain numbers..." };
  } else if (password1 !== password2) {
    return { passwordErr: "Passwords do not match" };
  } else if (password1.length < 6 || password2.length < 6) {
    console.log(password1.length, password2.length);
    return { passwordErr: "Password must be at least six characters..." };
  }

  console.log("Validated");

  return { success: "Creating your account..." };
};

export default signupUtil;
