// import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const SearchResult = ({ searchResult }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "flex-start",
          textAlign: "left",
          width: "500px",
          p: 4,
        }}
      >
        {searchResult &&
          searchResult.map((result) => (
            <Box
              key={result.definition}
              sx={{
                width: "80%",
                mb: 4,
              }}
            >
              <Typography
                key={result.definitionNum}
                sx={{ fontWeight: "bold" }}
              >
                {result.definitionNum}
              </Typography>
              <Typography key={result.definition}>
                {result.definition}
              </Typography>
              <Typography
                key={result.partOfSpeech}
                sx={{ fontStyle: "italic" }}
              >
                {result.partOfSpeech}
              </Typography>
              <Typography key={result.synonyms ? "key" : "keys"}>
                Synonyms: {result.synonyms && result.synonyms.join("")}
              </Typography>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default SearchResult;
