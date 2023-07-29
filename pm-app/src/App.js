import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import AccountDisplay from "./components/AccountsDisplay";
import SearchBar from "./components/SearchBar";
import { loadAccounts } from "./FirebaseFunctions";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    loadAccounts().then((value) => {
      setAccounts(value)
    })
  }, []);

  const onSearchBarChange = async (searchTarget) => {
    const lowerSearchStr = searchTarget.toLowerCase();

    setSearchStr(lowerSearchStr);
    fetch("http://localhost:8080/account/getAccounts")
      .then((response) => response.json())
      .then((data) =>
        setAccounts(
          data.filter((accounts) => {
            return (
              accounts.name.toLowerCase().includes(lowerSearchStr) ||
              accounts.category.toLowerCase().includes(lowerSearchStr)
            );
          })
        )
      );
  };

  return (
    <div className="App">
      <SearchBar txt={searchStr} onChange={onSearchBarChange} />
      <AccountDisplay accounts={accounts} setAccounts={setAccounts}/>
    </div>
  );
}

export default App;
