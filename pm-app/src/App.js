import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import AddButton from "./AddButton";
import AccountDisplay from "./AccountsDisplay";
import SearchBar from "./SearchBar";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [searchStr, setSearchStr] = useState("");

  const onSearchBarChange = async (searchTarget) => {
    const lowerSearchStr = searchTarget.toLowerCase();

    setSearchStr(lowerSearchStr);
    fetch("http://192.168.11.11:8080/account/getAccounts")
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
      <AccountDisplay accounts={accounts} setAccounts={setAccounts} />
      <AddButton />
    </div>
  );
}

export default App;
