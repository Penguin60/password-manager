import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { deleteAccount } from "../../firebase/FirebaseFunctions";
import "./DeleteButton.css";

const DeleteButton = ({ id, onAccountRefresh }) => {
  const clickHandler = () => {
    deleteAccount(id);
    onAccountRefresh();
  };

  return (
    <>
      <IconButton className="deleteButton" onClick={clickHandler}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default DeleteButton;
