import TextField from "@mui/material/TextField";
import { Grid, Box } from "@mui/material";
import "./SearchBar.css";
import LogoutButton from "./UserAuthentication/LogoutButton";
import React, { useEffect, useRef } from "react";

const SearchBar = ({ onChange }) => {
  const searchTextChangeHandler = (event) => {
    onChange(event.target.value);
  };

  const inputRef = useRef();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "f") {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (  
    <Box sx={{ flexGrow: 1 }} className="searchWrapper">
      <Grid container alignContent="center" justifyContent="center">
        <Grid item xs={10.5}>
          <TextField
            type="text"
            variant="standard"
            name="searchBar"
            fullWidth
            id="searchBar"
            placeholder="Search for an account..."
            onChange={searchTextChangeHandler}
            inputRef={inputRef}
            sx={{
              "& label": { paddingLeft: (theme) => theme.spacing(2) },
              "& input": { paddingLeft: (theme) => theme.spacing(3.5) },
              "& fieldset": {
                paddingLeft: (theme) => theme.spacing(2.5),
                borderRadius: "30px",
              },
            }}
            InputProps={{
              disableUnderline: true,
            }}
          ></TextField>
        </Grid>
        <Grid item xs={0.55} className="logoutButton">
          <LogoutButton />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
