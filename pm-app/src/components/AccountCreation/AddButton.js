import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "../Snackbar";
import NewAccountModal from "./NewAccountModal";
import "./AddButton.css";

const AddButton = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const modalOpenHandler = () => {
    setModalOpen(true);
  };

  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  const snackbarCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const formSubmitHandler = () => {
    setModalOpen(false);
    setSnackbarOpen(true);
    props.onFormSubmit();
  };

  return (
    <>
      <Fab color="success" id="addButton" onClick={modalOpenHandler}>
        <AddIcon />
      </Fab>
      <NewAccountModal
        open={modalOpen}
        onFormSubmit={formSubmitHandler}
        onClose={modalCloseHandler}
      />
      <Snackbar
        severity="success"
        open={snackbarOpen}
        onClose={snackbarCloseHandler}
        text="Account created!"
      />
    </>
  );
};

export default AddButton;
