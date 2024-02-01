import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Categories = (props) => {
  const categoryChangeHandler = (event, newInputValue) => {
    props.onCategoryChange(newInputValue);
  };

  return (
    <Autocomplete
      options={props.categories}
      freeSolo
      inputValue={props.inputValue}
      onInputChange={categoryChangeHandler}
      defaultValue={props.defaultValue}
      renderInput={(params) => (
        <TextField
          error={!props.categoryValid}
          required
          {...params}
          autoFocus
          margin="dense"
          label="Category"
          fullWidth
          variant="outlined"
          color="success"
          onChange={props.onChange}
          name="category"
        />
      )}
    />
  );
};

export default Categories;
