import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { getImage } from "../../firebase/FirebaseFunctions";
import "./AccountAvatar.css";

const AccountAvatar = ({ imageID }) => {
  const [avatarImage, setAvatarImage] = useState(null);

  useEffect(() => {
    getImage(imageID)
      .then((url) => {
        setAvatarImage(url);
      })
      .catch((error) => {
        console.error("Error getting image: ", error);
      });
  }, [imageID]);

  return <Avatar src={avatarImage} className="accountAvatar" sx={{width: 40, height: 40}}/>;
};

export default AccountAvatar;
