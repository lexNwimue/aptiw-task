import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const SearchForm = () => {
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
        <TextField
          label="Enter a word . . ."
          type="search"
          variant="standard"
          sx={{ width: "400px" }}
        />
        <Button
          variant="filled"
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
    </>
  );
};

export default SearchForm;