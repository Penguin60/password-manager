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

const Password = (props) => {
  const [open, setOpen] = React.useState(false);
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
    const validatePasswordFormData = new FormData();

    validatePasswordFormData.append(
      "password",
      formValue.password
    );

    const copyPasswordFormData = new FormData();

    copyPasswordFormData.append("id", props.id);

    axios
      .post(
        "http://localhost:8080/account/validatePassword",
        validatePasswordFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((a) => {
        if (a.data == true) {
          axios
            .post(
              "http://localhost:8080/account/returnPassword",
              copyPasswordFormData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((a) => navigator.clipboard.writeText(a.data));
            setOpen(true);
        }
      });
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
          <Button onClick={handleModalClose} variant="outlined" color="success">
            Cancel
          </Button>
          {
            <Button onClick={copyPassword} variant="contained" color="success">
              Validate
            </Button>
          }
        </DialogActions>
      </Dialog>
      <div className="accountPassword" type="div" onClick={handleModalOpen}>
        {props.password}
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Copied Text
        </Alert>
      </Snackbar>
    </>
  );
};

export default Password;
