import { useState, useEffect } from "react";
import AddButton from "./AccountCreation/AddButton";
import AccountDisplay from "./AccountsDisplay";
import SearchBar from "./SearchBar";
import { loadAccounts } from "../firebase/FirebaseFunctions";
import { Button } from "@mui/material";
import LogoutButton from "./UserAuthentication/LogoutButton";

const PasswordManager = ({ userEmail }) => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [deletedOpen, setDeletedOpen] = useState(false);

  useEffect(() => {
    loadAccounts().then((value) => {
      setAccounts(value);
      setFilteredAccounts(value);
    });
  }, []);
  const searchBarChangeHandler = async (searchTarget) => {
    const lowerSearchStr = searchTarget.toLowerCase();

    setSearchStr(lowerSearchStr);
    if (lowerSearchStr) {
      setFilteredAccounts(
        accounts.filter((account) => {
          return (
            account.name.toLowerCase().includes(lowerSearchStr) ||
            account.category.toLowerCase().includes(lowerSearchStr)
          );
        })
      );
    } else {
      setFilteredAccounts(accounts);
    }
  };

  const refreshAccountsHandler = () => {
    loadAccounts().then((value) => {
      setAccounts(value);
      setFilteredAccounts(value);
    });
  };

  const deleteAccountHandler = () => {
    refreshAccountsHandler();
    setDeletedOpen(true);
  };

  const deletedCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setDeletedOpen(false);
  };

  return (
    <>
      <SearchBar txt={searchStr} onChange={searchBarChangeHandler} />
      <AddButton onFormSubmit={refreshAccountsHandler} />
      <AccountDisplay
        accounts={filteredAccounts}
        onAccountRefresh={refreshAccountsHandler}
        onDelete={deleteAccountHandler}
        deletedOpen={deletedOpen}
        onDeletedClose={deletedCloseHandler}
      />
    </>
  );
};

export default PasswordManager;
