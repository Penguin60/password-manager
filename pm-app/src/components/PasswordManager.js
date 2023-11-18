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

  return (
    <>
      <SearchBar txt={searchStr} onChange={searchBarChangeHandler} />
      <AddButton onFormSubmit={refreshAccountsHandler} />
      <AccountDisplay
        accounts={filteredAccounts}
        onAccountRefresh={refreshAccountsHandler}
      />
    </>
  );
};

export default PasswordManager;
