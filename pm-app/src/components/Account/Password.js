import React, { useState, useEffect, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { returnPassword } from "../../firebase/FirebaseFunctions";
import "./Password.css";

const Password = (props) => {
  const [open, setOpen] = React.useState(false);
  const [openPassword, setOpenPassword] = React.useState(false);
  const [password, setPassword] = useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    setPassword(props.password);
  }, [props.password]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const copyPassword = () => {
      returnPassword(props.id);
      setOpen(true);
  };

  return (
    <>
      <div className="accountPassword" type="div" onClick={copyPassword}>
        <p className="password">{password.replace(/./g, "•")}</p>
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
