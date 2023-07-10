import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

const DeleteButton = ({ id, onUpdate }) => {
  const deleteAccount = () => {
    const deleteAccountFormData = new FormData();

    deleteAccountFormData.append("id", id);

    axios
      .post(
        "http://localhost:8080/account/removeAccount",
        deleteAccountFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => onUpdate());
  };

  return (
    <>
      <IconButton className="deleteButton" onClick={deleteAccount}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default DeleteButton;
