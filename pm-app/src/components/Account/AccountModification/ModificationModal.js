import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import {
  modifyAccount,
  getImage,
  loadCategories,
  uploadProfilePicture,
} from "../../../firebase/FirebaseFunctions";
import "../../AccountCreation/NewAccountModal.css";
import Categories from "../../AccountCreation/Categories";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Casino from "@mui/icons-material/Casino";
import UploadButton from "../../AccountCreation/UploadButton";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import DeleteButton from "./DeleteButton";

const ModificationModal = (props) => {
  const [categoryValue, setCategoryValue] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [userNameValid, setUserNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [categoryValid, setCategoryValid] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [imageId, setImageId] = useState("");
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(getImage(props.imageID));
  const [formValue, setFormValue] = useState({
    name: props.name,
    userName: props.userName,
    password: props.password,
    category: props.category,
    favourite: props.favourite,
  });

  useEffect(() => {
    setPassword(props.password);
  }, [props.password]);

  useEffect(() => {
    getImage(props.imageID)
      .then((url) => {
        setFileURL(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.imageID]);

  const showPasswordHandler = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const imageUploadHandler = (file, imageId) => {
    setImageId(imageId);
    setFile(file);
    setFileURL(URL.createObjectURL(file));
  };

  const generatePassword = () => {
    const length = 16;
    const charsetLower = "abcdefghijklmnopqrstuvwxyz";
    const charsetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charsetNumbers = "0123456789";
    const charset = charsetLower + charsetUpper + charsetNumbers;
    let retVal = "";
    retVal += charsetLower[Math.floor(Math.random() * charsetLower.length)];
    retVal += charsetUpper[Math.floor(Math.random() * charsetUpper.length)];
    retVal += charsetNumbers[Math.floor(Math.random() * charsetNumbers.length)];
    for (let i = 3, n = charset.length; i < length; ++i) {
      retVal += charset[Math.floor(Math.random() * n)];
    }
    retVal = retVal
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    setPassword(retVal);
    setFormValue((prevFormValue) => {
      return {
        ...prevFormValue,
        password: retVal,
      };
    });
  };

  const validateInformation = (text) => {
    if (text.trim() != "" && text.length <= 50) {
      return true;
    }
    return false;
  };

  const editAccount = () => {
    const validName = validateInformation(formValue.name);
    const validUserName = validateInformation(formValue.userName);
    const validPassword = validateInformation(formValue.password);
    const validCategory = validateInformation(categoryValue);

    if (validName && validUserName && validPassword && validCategory) {
      if (file) {
        // If file is not null, upload the profile picture
        uploadProfilePicture(file, imageId).then(() => {
          modifyAndRefreshAccount();
        });
      } else {
        // If file is null, directly modify the account
        modifyAndRefreshAccount();
      }
    }

    setNameValid(validName);
    setUserNameValid(validUserName);
    setPasswordValid(validPassword);
    setCategoryValid(validCategory);
  };

  const modifyAndRefreshAccount = () => {
    modifyAccount(
      formValue.name,
      formValue.userName,
      formValue.password,
      categoryValue,
      imageId,
      props.id
    );
    props.onFormSubmit();
    loadCategories().then((key) => {
      setCategories(key);
      console.log(key);
    });
    setCategoryValue("");
  };

  const changeHandler = (event) => {
    if (event.target.name === "password" && password !== event.target.value) {
      setPassword(event.target.value);
    }
    setFormValue((prevFormValue) => {
      return {
        ...prevFormValue,
        [event.target.name]: event.target.value,
      };
    });
  };

  const deleteHandler = () => {
    props.onDelete();
  };

  const formCloseHandler = () => {
    setNameValid(true);
    setUserNameValid(true);
    setPasswordValid(true);
    setCategoryValid(true);
    setCategoryValue("");
    props.onClose();
  };

  const categoryChangeHandler = (newcategoryValue) => {
    setCategoryValue(newcategoryValue);
  };

  useEffect(() => {
    loadCategories().then((key) => {
      setCategories(key);
    });
  }, []);

  return (
    <>
      <Dialog open={props.open} onClose={formCloseHandler} fullWidth>
        <DialogTitle sx={{ paddingBottom: 0 }}>Edit Account</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            marginBottom="1%"
          >
            <Avatar
              src={fileURL ? fileURL : undefined}
              className="accountAvatar"
              sx={{ width: 40, height: 40, marginLeft: "-15px" }}
            />
            <UploadButton onUpload={imageUploadHandler} />
          </Box>
          <form onSubmit={editAccount}>
            <TextField
              error={!nameValid}
              required
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              variant="outlined"
              color="success"
              onChange={changeHandler}
              name="name"
              defaultValue={props.name}
            />
            <TextField
              error={!userNameValid}
              required
              autoFocus
              margin="dense"
              label="Username"
              fullWidth
              variant="outlined"
              color="success"
              onChange={changeHandler}
              name="userName"
              defaultValue={props.userName}
            />
            <TextField
              error={!passwordValid}
              required
              autoFocus
              margin="dense"
              label="Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              variant="outlined"
              color="success"
              name="password"
              onChange={changeHandler}
              value={password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="generate password"
                      onClick={generatePassword}
                    >
                      <Casino />
                    </IconButton>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={showPasswordHandler}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Categories
              onCategoryChange={categoryChangeHandler}
              categoryValue={categoryValue}
              categoryValid={categoryValid}
              onChange={changeHandler}
              categories={categories}
              defaultValue={props.category}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Box marginRight="auto" px={2} pb={1.1}>
            <DeleteButton id={props.id} onAccountRefresh={deleteHandler} />
          </Box>
          <Box marginLeft="auto" px={2} pb={1.1}>
            <Button
              onClick={formCloseHandler}
              variant="text"
              color="success"
              className="button"
            >
              Cancel
            </Button>
            <Button
              onClick={editAccount}
              variant="contained"
              color="success"
              className="button"
            >
              Ok
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModificationModal;
