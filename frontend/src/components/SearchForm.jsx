import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";
import SearchResult from "./SearchResult";
import { addToFavourites } from "../utils/signupUtil";
import Notification from "../helper/Notification";

const SearchForm = () => {
  const [text, setText] = useState("");
  const [searchResult, setSearchResult] = useState(""); /// For Alert component
  const [severity, setSeverity] = useState("");
  let searchLimit = 0;
  const [err, setErr] = useState(""); // For error reporting
  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleSearch = async (e) => {
    if (text === "") return;
    e.preventDefault();
    setSearchResult("");
    setErr("");
    ++searchLimit;
    console.log(searchLimit);
    if (searchLimit === 2) {
      document.getElementById("searchField").disabled = true;
      document.getElementById("goBtn").disabled = true;
      setTimeout(() => {
        document.getElementById("searchField").disabled = false;
        document.getElementById("goBtn").disabled = false;
        searchLimit = 0;
      }, 120000);
    }

    try {
      let response = await fetch("/search", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ searchText: text }),
      });
      response = await response.json();
      if (response.empty) {
        setErr("Invalid Search Term");
        console.log(err);
        return;
      }
      setSearchResult(response);
      console.log(response);
    } catch (error) {
      console.log("Error...");
      setErr("Some error occured");
    }
  };

  const handleAddToFavourites = async () => {
    setSeverity("");
    let response = await addToFavourites(text);
    if (response.failed) {
      if (response.failed.includes("already")) {
        setSeverity("info");
        console.log(severity);
        return;
      }
      if (
        response.failed.includes(
          "Unauthorized" || response.failed.includes("err")
        )
      ) {
        setSeverity("error");
        console.log(severity);
        return;
      }
    }

    if (response.success) {
      setSeverity("success");
      console.log(severity);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <form onSubmit={handleSearch}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <TextField
              label="Enter a word . . ."
              type="search"
              variant="standard"
              value={text}
              sx={{ width: "400px" }}
              id={"searchField"}
              onChange={(e) => handleInput(e)}
              {...(err && { error: true, helperText: err })}
            />
            <Button
              variant="filled"
              onClick={handleSearch}
              id={"goBtn"}
              sx={{
                width: "100px",
                height: "30px",
                textTransform: "none",
                color: "#FFFFFF",
                backgroundColor: "#5CB85B",
                "&:hover": {
                  backgroundColor: "#2a602a",
                },
              }}
            >
              Go
            </Button>
          </Box>
        </form>
        <Box sx={{ alignSelf: "flex-start", ml: 10 }}>
          {severity && <Notification severity={severity} />}
        </Box>
        <Box
          sx={{
            alignSelf: "flex-start",
            ml: 3,
          }}
        >
          {searchResult && (
            <Button
              variant="filled"
              onClick={handleAddToFavourites}
              sx={{
                height: "30px",
                textTransform: "none",
                color: "black",
                border: "1px solid black",
                float: "left",
                ml: 7,
                backgroundColor: "#EBEBEB",
                "&:hover": {
                  backgroundColor: "#BEBEBE",
                },
              }}
            >
              Add to Favourites
            </Button>
          )}

          <Box
            sx={{
              mt: 4,
              ml: 3,
              gap: 6,
            }}
          >
            {searchResult && <SearchResult searchResult={searchResult} />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SearchForm;
