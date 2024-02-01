import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";

const UploadButton = (props) => {
  const [image, setImage] = useState(null);

  const generateRandomId = (length = 16) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const [id, setId] = useState(generateRandomId());

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  useEffect(() => {
    uploadHandler();
  }, [image]);

  const uploadHandler = () => {
    if (image == null) {
      return;
    } else {
      props.onUpload(image, id);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        component="label"
        sx={{ width: 40, height: 40, border: "1px solid #2F7C31" }} // Add a border
      >
        <CloudUploadIcon sx={{ color: "#2F7C31" }} />
        <VisuallyHiddenInput
          accept="image/*"
          type="file"
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
        />
      </IconButton>
    </Box>
  );
};

export default UploadButton;
