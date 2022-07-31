const signupUtil = (name, email, password1, password2) => {
  console.log(
    "Inside signupUtil function: ",
    name,
    email,
    password1,
    password2
  );
  if (name.match(/[0-9]/)) {
    //Check if name contains a number
    return { nameErr: "Name cannot contain numbers..." };
  }
  if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    // Check for email validity
    return { emailErr: "Invalid Email..." };
  }
  if (password1 !== password2) {
    return { passwordErr: "Name cannot contain numbers..." };
  }
  if (password1.length < 6) {
    return { passwordErr: "Password must be at least six characters..." };
  }

  return { success: "Creating your account..." };
};

export default signupUtil;
