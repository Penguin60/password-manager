import React, { useState, useEffect, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { returnPassword } from "../../firebase/FirebaseFunctions";

const Password = (props) => {
  const [open, setOpen] = React.useState(false);
  const [openPassword, setOpenPassword] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const [formValue, setFormValue] = useState({
    password: "",
  });

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenPassword(false);
  };

  const handleModalClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const copyPassword = () => {
    if (formValue.password == "8xn8wvpm") {
      returnPassword(props.id);
      setOpen(true);
    } else {
      setOpenPassword(true);
    }
    setOpenModal(false);
  };

  return (
    <>
      <Dialog open={openModal} onClose={handleModalClose} fullWidth>
        <DialogTitle>Validate Password</DialogTitle>
        {
          <DialogContent>
            <form onSubmit={copyPassword}>
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
            </form>
          </DialogContent>
        }

        <DialogActions>
          <Button
            onClick={handleModalClose}
            variant="text"
            color="success"
            className="button"
          >
            Cancel
          </Button>
          {
            <Button
              onClick={copyPassword}
              variant="contained"
              color="success"
              className="button"
            >
              Ok
            </Button>
          }
        </DialogActions>
      </Dialog>
      <div className="accountPassword" type="div" onClick={handleModalOpen}>
        <p className="password">•••••</p>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Copied Text
        </Alert>
      </Snackbar>
      <Snackbar
        open={openPassword}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Wrong Password
        </Alert>
      </Snackbar>
    </>
  );
};
export default Password;
