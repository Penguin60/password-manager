import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { deleteAccount } from "../FirebaseFunctions";
import { loadAccounts } from "../FirebaseFunctions";

const DeleteButton = ({ id, setAccounts }) => {
  const clickHandler = () => {
    deleteAccount(id);
    loadAccounts().then((value) => {
      setAccounts(value)
    })
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
