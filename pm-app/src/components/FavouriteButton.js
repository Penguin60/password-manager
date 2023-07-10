import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useState } from "react";

const FavouriteButton = (props) => {
  const [updatedFav, setUpdatedFac] = useState(props.favourite);

  const favouriteAccount = () => {
    setUpdatedFac((updatedFav) => !updatedFav);
    const favouriteAccountFormData = new FormData();

    const currentId = props.id;

    favouriteAccountFormData.append("id", currentId);

    axios.post(
      "http://localhost:8080/account/favouriteAccount",
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
      {updatedFav && (
        <IconButton
          color="disabled"
          aria-label="upload picture"
          component="label"
          className="favoriteButton"
          data-id={props.id}
          onClick={favouriteAccount}
        >
          <StarIcon style={{ color: "#ffbd03" }} />
        </IconButton>
      )}
      {!updatedFav && (
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
      )}
    </>
  );
};

export default FavouriteButton;
