import { useState } from "react";
import FavouriteButton from "../AccountManagement/FavouriteButton";
import DeleteButton from "../AccountManagement/DeleteButton";
import Password from "./Password";
import AccountText from "./AccountText";
import Snackbar from "../Snackbar";
import Divider from "./Divider";
import "./Account.css";

const Account = (props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const openSnackBarHandler = () => {
    setSnackbarOpen(true);
  };

  const snackbarCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div className="account" id={props.id} type="div">
      <DeleteButton id={props.id} onAccountRefresh={props.onAccountRefresh} />
      <div className="accountText">
        <AccountText
          className="accountName"
          data={props.name}
          onCopy={openSnackBarHandler}
        />
        <Divider />
        <AccountText
          className="accountUsername"
          data={props.userName}
          onCopy={openSnackBarHandler}
        />
        <Divider />
        <Password password={props.password} id={props.id} />
        <Divider />
        <AccountText
          className="accountCategory"
          data={props.category}
          onCopy={openSnackBarHandler}
        />
      </div>
      <FavouriteButton favourite={props.favourite} id={props.id} />
      <Snackbar
        severity="success"
        open={snackbarOpen}
        onClose={snackbarCloseHandler}
        text="Text Copied!"
      />
    </div>
  );
};

export default Account;
