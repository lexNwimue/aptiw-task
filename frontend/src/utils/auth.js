const verifyUser = async () => {
  let response = await fetch("/dashboard", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  response = await response.json();
  if (response.success) {
    return true;
  }
  if (response.failed) {
    return false;
  }
  if (response.err) {
    console.log(response.err);
  }
};

export { verifyUser };
