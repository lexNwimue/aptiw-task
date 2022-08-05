import React from "react";
import SearchForm from "./SearchForm";
import SignedInNavbar from "./SignedInNavbar";

const Dashboard = () => {
  return (
    <>
      <SignedInNavbar />
      <SearchForm />
    </>
  );
};

export default Dashboard;
