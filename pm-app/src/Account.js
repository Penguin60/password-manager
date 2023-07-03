import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import StarGray from "./StarGray";
import StarYellow from "./StarYellow";

const Account = (props) => {
  const [open, setOpen] = React.useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const copyAccountText = (event) => {
    navigator.clipboard.writeText(event.target.innerHTML);
    setOpen(true);
  };

  return (
    <div className="accounts">
      <div key={props.id} className="account" id={props.id} type="div">
        <DragIndicatorIcon className="dragIndicator" />
        <div className="accountText">
          <div className="accountName" type="div" onClick={copyAccountText}>
            {props.name}
          </div>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className="textDivider"
          />
          <div className="accountUsername" type="div" onClick={copyAccountText}>
            {props.userName}
          </div>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className="textDivider"
          />
          <div className="accountPassword" type="div" onClick={copyAccountText}>
            {props.password}
          </div>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className="textDivider"
          />
          <div className="accountCategory" type="div" onClick={copyAccountText}>
            {props.category}
          </div>
        </div>
        {props.favourite && <StarYellow id={props.id} />}
        {!props.favourite && <StarGray id={props.id} />}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Copied Text
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Account;
