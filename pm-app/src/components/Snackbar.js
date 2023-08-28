import { default as Bar } from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import { Slide } from "@mui/material";

const Snackbar = (props) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Bar
      open={props.open}
      autoHideDuration={4000}
      onClose={props.onClose}
      TransitionComponent={Slide}
    >
      <Alert
        onClose={props.onClose}
        severity={props.severity}
        sx={{ width: "100%" }}
      >
        {props.text}
      </Alert>
    </Bar>
  );
};

export default Snackbar;
