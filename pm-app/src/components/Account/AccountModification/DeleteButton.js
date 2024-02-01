import { deleteAccount } from "../../../firebase/FirebaseFunctions";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = (props) => {
  const clickHandler = () => {
    deleteAccount(props.id).then(() => {
      props.onAccountRefresh();
    });
  };

  return (
    <>
      <Button
        onClick={clickHandler}
        className="deleteButton"
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteButton;
