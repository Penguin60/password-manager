import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import React, { useState, useEffect, useCallback } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Button from '@mui/material/Button';

const EditAccounts = () => {
  const [editOpen, setEditOpen] = React.useState(false);

  const handleClose = () => {
    setEditOpen(false);
  };

  return (
    <>
<Dialog open={editOpen} onClose={handleClose} fullWidth>
        <DialogTitle>Edit Account</DialogTitle>
        <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              variant="outlined"
              color="success"
              name="name"
            />
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              fullWidth
              variant="outlined"
              color="success"
              name="userName"
            />
            <TextField
              autoFocus
              margin="dense"
              label="Password"
              fullWidth
              type="password"
              variant="outlined"
              color="success"
              name="password"
            />
            <TextField
              autoFocus
              margin="dense"
              label="Category"
              fullWidth
              variant="outlined"
              color="success"
              name="category"
            />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="success">
            Cancel
          </Button>
          <Button variant="contained" color="success">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditAccounts
