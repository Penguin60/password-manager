import TextField from "@mui/material/TextField";
import { Grid, Box } from "@mui/material";
import "./SearchBar.css";

const SearchBar = ({ onChange }) => {
  const searchTextChangeHandler = (event) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="searchWrapper">
      <Grid container alignContent="center" justifyContent="center">
        <Grid item xs={11}>
        <TextField
          type="text"
          variant="standard"
          name="searchBar"
          fullWidth
          id="searchBar"
          placeholder="Search for an account..."
          onChange={searchTextChangeHandler}
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
      </Grid>
    </Box>
  );
};

export default SearchBar;
