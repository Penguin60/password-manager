import React, { useState, useEffect, useCallback } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FavouriteButton from "./FavouriteButton";
import DeleteButton from "./DeleteButton";
import Password from "./Password";

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
        <DeleteButton id={props.id} setAccounts={props.setAccounts}/>
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
          <Password password={props.password} id={props.id} />
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
        <FavouriteButton favourite={props.favourite} id={props.id} />
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
