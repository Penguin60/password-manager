import StarIcon from '@mui/icons-material/Star';
import IconButton from "@mui/material/IconButton";
import axios from "axios";

const StarYellow = (props) => {

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
        <StarIcon style={{color: "#ffbd03"}}/>
      </IconButton>
    </>
  );
};

export default StarYellow;