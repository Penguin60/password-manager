import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

const StarGray = (props) => {

    const favouriteAccount = () => {
        const favouriteAccountFormData = new FormData();
    
        const currentId = props.id;
    
        favouriteAccountFormData.append("id", currentId);
    
        axios.post(
          "http://192.168.11.11:8080/account/favouriteAccount",
          favouriteAccountFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      };

  return (
    <>
      <IconButton
        color="disabled"
        aria-label="upload picture"
        component="label"
        className="favoriteButton"
        data-id={props.id}
        onClick={favouriteAccount}
      >
        <StarBorderIcon />
      </IconButton>
    </>
  );
};

export default StarGray;
