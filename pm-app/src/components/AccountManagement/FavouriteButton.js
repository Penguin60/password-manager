import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { favouriteAccount } from "../../firebase/FirebaseFunctions";
import "./FavouriteButton.css"

const FavouriteButton = (props) => {
  const [favourited, setFavourited] = useState(props.favourite);

  const clickHandler = () => {
    favouriteAccount(props.id, favourited, setFavourited);
  };

  return (
    <>
      {favourited && (
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
      {!favourited && (
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
