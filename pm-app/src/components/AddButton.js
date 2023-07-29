import React, { useState, useEffect, useCallback } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import { addAccount } from "../FirebaseFunctions";
import { loadAccounts } from "../FirebaseFunctions";
import { loadCategories } from "../FirebaseFunctions";

const AddButton = ({ setAccounts }) => {
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = React.useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const [formValue, setFormValue] = useState({
    name: "",
    userName: "",
    password: "",
    category: "",
    favourite: "",
  });

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const newAccount = () => {
    addAccount(
      formValue.name,
      formValue.userName,
      formValue.password,
      inputValue
    );
    setOpen(false);
    setAlertOpen(true);

    loadAccounts().then((value) => {
      setAccounts(value);
    });
  };

  useEffect(() => {
    loadCategories().then((key) => {
      setCategories(key)
    })
  }, []);

  return (
    <>
      <Fab color="success" id="addButton" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <form onSubmit={newAccount}>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              variant="outlined"
              color="success"
              onChange={handleChange}
              name="name"
            />
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              fullWidth
              variant="outlined"
              color="success"
              onChange={handleChange}
              name="userName"
            />
            <TextField
              autoFocus
              margin="dense"
              label="Password"
              fullWidth
              type="password"
              variant="outlined"
              color="success"
              onChange={handleChange}
              name="password"
            />
            <Autocomplete
              options={categories}
              freeSolo
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoFocus
                  margin="dense"
                  label="Category"
                  fullWidth
                  variant="outlined"
                  color="success"
                  onChange={handleChange}
                  name="category"
                />
              )}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            variant="text"
            color="success"
            className="button"
          >
            Cancel
          </Button>
          <Button
            onClick={newAccount}
            variant="contained"
            color="success"
            className="button"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Account created!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddButton;
