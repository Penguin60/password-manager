import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { addAccount, loadCategories } from "../../firebase/FirebaseFunctions";
import "./NewAccountModal.css";
import Categories from "./Categories";

const NewAccountModal = (props) => {
  const [categoryValue, setCategoryValue] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [userNameValid, setUserNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [categoryValid, setCategoryValid] = useState(true);
  const [categories, setCategories] = useState([]);

  const validateInformation = (text) => {
    if (text && text.trim() != "" && text.length <= 50) {
      return true;
    }
    return false;
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
    }

    setNameValid(validName);
    setUserNameValid(validUserName);
    setPasswordValid(validPassword);
    setCategoryValid(validCategory);
  };

  const changeHandler = (event) => {
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
    setFormValue({
      name: "",
      userName: "",
      password: "",
      category: "",
      favourite: "",
    });
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
              type="password"
              variant="outlined"
              color="success"
              onChange={changeHandler}
              name="password"
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
