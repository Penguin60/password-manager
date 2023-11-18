import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState, useEffect, useRef } from "react";
import { addAccount, loadCategories } from "../../firebase/FirebaseFunctions";
import "./NewAccountModal.css";
import Categories from "./Categories";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Casino from "@mui/icons-material/Casino";

const NewAccountModal = (props) => {
  const [categoryValue, setCategoryValue] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [userNameValid, setUserNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [categoryValid, setCategoryValid] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const showPasswordHandler = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
  };

  const validateInformation = (text) => {
    if (text && text.trim() != "" && text.length <= 50) {
      return true;
    }
    return false;
  };

  const resetFormValue = () => {
    setFormValue({
      name: "",
      userName: "",
      password: "",
      category: "",
      favourite: "",
    });
  };

  const [formValue, setFormValue] = useState({
    name: "",
    userName: "",
    password: "",
    category: "",
    favourite: "",
  });

  const createAccount = () => {
    const validName = validateInformation(formValue.name);
    const validUserName = validateInformation(formValue.userName);
    const validPassword = validateInformation(formValue.password);
    const validCategory = validateInformation(categoryValue);

    if (validName && validUserName && validPassword && validCategory) {
      addAccount(
        formValue.name,
        formValue.userName,
        formValue.password,
        categoryValue
      );
      props.onFormSubmit();
      loadCategories().then((key) => {
        setCategories(key);
      });
      resetFormValue();
      setCategoryValue("");
    }

    setNameValid(validName);
    setUserNameValid(validUserName);
    setPasswordValid(validPassword);
    setCategoryValid(validCategory);
  };

  const changeHandler = (event) => {
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
    setFormValue((prevFormValue) => {
      return {
        ...prevFormValue,
        [event.target.name]: event.target.value,
      };
    });
  };

  const formCloseHandler = () => {
    setNameValid(true);
    setUserNameValid(true);
    setPasswordValid(true);
    setCategoryValid(true);
    setPassword("");
    resetFormValue();
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
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <form onSubmit={createAccount}>
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
              value={password}
              onChange={changeHandler}
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
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={formCloseHandler}
            variant="text"
            color="success"
            className="button"
          >
            Cancel
          </Button>
          <Button
            onClick={createAccount}
            variant="contained"
            color="success"
            className="button"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewAccountModal;
