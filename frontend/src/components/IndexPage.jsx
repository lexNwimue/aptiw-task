// import SignedInNavbar from "./SignedInNavbar";
import SearchForm from "./SearchForm";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
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
  return (
    <>
      <Navbar />
      <SearchForm />
    </>
  );
};

export default IndexPage;
