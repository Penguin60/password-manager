import { useState } from "react";
import Password from "./Password";
import AccountText from "./AccountText";
import Snackbar from "../Snackbar";
import Divider from "./Divider";
import "./Account.css";
import AccountAvatar from "./AccountAvatar";
import ModificationModal from "./AccountModification/ModificationModal";

const Account = (props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedOpen, setEditedOpen] = useState(false);

  const modalOpenHandler = () => {
    setModalOpen(true);
  };

  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  const formSubmitHandler = () => {
    setEditedOpen(true);
    setModalOpen(false);
    props.onAccountRefresh();
  };

  const deleteHandler = () => {
    setModalOpen(false);
    props.onDelete();
  };

  const openSnackBarHandler = () => {
    setSnackbarOpen(true);
  };

  const snackbarCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const editedCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setEditedOpen(false);
  };

  return (
    <div className="account" id={props.id} type="div">
      <div onClick={modalOpenHandler} className="accountAvatar">
        <AccountAvatar imageID={props.imageID} onClick={modalOpenHandler} />
      </div>
      <ModificationModal
        open={modalOpen}
        onFormSubmit={formSubmitHandler}
        onClose={modalCloseHandler}
        id={props.id}
        name={props.name}
        userName={props.userName}
        password={props.password}
        category={props.category}
        favourite={props.favourite}
        imageID={props.imageID}
        onDelete={deleteHandler}
      />
      <div className="accountText">
        <AccountText
          className="accountName"
          data={props.name}
          onCopy={openSnackBarHandler}
        />
        <Divider className="divider1" />
        <AccountText
          className="accountUsername"
          data={props.userName}
          onCopy={openSnackBarHandler}
        />
        <Divider className="divider2" />
        <Password password={props.password} id={props.id} />
        <Divider className="divider3" />
        <AccountText
          className="accountCategory"
          data={props.category}
          onCopy={openSnackBarHandler}
        />
      </div>
      {/* <FavouriteButton favourite={props.favourite} id={props.id} /> */}
      <Snackbar
        severity="success"
        open={snackbarOpen}
        onClose={snackbarCloseHandler}
        text="Text Copied!"
      />
      <Snackbar
        severity="success"
        open={editedOpen}
        onClose={editedCloseHandler}
        text="Account Edited!"
      />
      <Snackbar
        severity="error"
        open={props.deletedOpen}
        onClose={props.onDeletedClose}
        text="Account Deleted."
      />
    </div>
  );
};

export default Account;
