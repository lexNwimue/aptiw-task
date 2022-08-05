const validate = (name, password1, password2) => {
  if (name.match(/[0-9]/)) {
    //Check if name contains a number
    return { nameErr: "Name cannot contain numbers..." };
  } else if (password1 !== password2) {
    return { passwordErr: "Passwords do not match" };
  } else if (password1.length < 6 || password2.length < 6) {
    return { passwordErr: "Password must be at least six characters..." };
  }

  return { success: "Creating your account..." };
};

const sendRequest = async (formData, endpoint) => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  return data;
};

export { validate, sendRequest };
