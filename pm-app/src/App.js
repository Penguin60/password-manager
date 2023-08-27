import "./App.css";
import React, { useState, useEffect } from "react";
import AccountDisplay from "./components/AccountsDisplay";
import SearchBar from "./components/SearchBar";
import { loadAccounts } from "./firebase/FirebaseFunctions";
import AddButton from "./components/AccountCreation/AddButton";

function App() {
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
    if(lowerSearchStr) {
      setFilteredAccounts(
        accounts.filter((account) => {
          return (
            account.name.toLowerCase().includes(lowerSearchStr) ||
            account.category.toLowerCase().includes(lowerSearchStr)
          );
        }) 
    )
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
    <div className="App">
      <SearchBar txt={searchStr} onChange={searchBarChangeHandler} />
      <AddButton onFormSubmit={refreshAccountsHandler} />
      <AccountDisplay accounts={filteredAccounts} />
    </div>
  );
}

export default App;
