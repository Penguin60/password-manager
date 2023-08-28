import TextField from "@mui/material/TextField";
import "./SearchBar.css"

const SearchBar = ({ txt, onChange }) => {
  const searchTextChangeHandler = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="searchWrapper">
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
    </div>
  );
};

export default SearchBar;
