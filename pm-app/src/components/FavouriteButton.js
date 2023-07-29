import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { favouriteAccount } from "../FirebaseFunctions";

const FavouriteButton = (props) => {
  const [updatedFav, setUpdatedFav] = useState(props.favourite);

  const clickHandler = () => {
    favouriteAccount(props.id, updatedFav, setUpdatedFav);
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
          onClick={clickHandler}
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
          onClick={clickHandler}
        >
          <StarBorderIcon />
        </IconButton>
      )}
    </>
  );
};

export default FavouriteButton;
