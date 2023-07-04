import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";

const AddButton = ({ onUpdate }) => {
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
    const newAccountFormData = new FormData();

    newAccountFormData.append("name", formValue.name);
    newAccountFormData.append("userName", formValue.userName);
    newAccountFormData.append("password", formValue.password);
    newAccountFormData.append("category", inputValue);
    newAccountFormData.set("favourite", false);

    axios
      .post(
        "http://localhost:8080/account/newAccount",
        newAccountFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => onUpdate());
    setOpen(false);
    setAlertOpen(true);
  };

  useEffect(() => {
    fetch("http://localhost:8080/account/getCategories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
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
          <Button onClick={handleClose} variant="outlined" color="success">
            Cancel
          </Button>
          <Button onClick={newAccount} variant="contained" color="success">
            Create
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
