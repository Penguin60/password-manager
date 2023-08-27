import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { deleteAccount } from "../../firebase/FirebaseFunctions";
import "./DeleteButton.css"

const DeleteButton = ({ id }) => {
  const clickHandler = () => {
    deleteAccount(id);
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
