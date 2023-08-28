import Account from "./Account/Account";
import "./AccountsDisplay.css";

const AccountDisplay = ({ accounts, onAccountRefresh }) => {
  return (
    <div className="accounts">
      {accounts.map((account) => (
        <Account
          id={account.id}
          name={account.name}
          userName={account.userName}
          password={account.password}
          category={account.category}
          favourite={account.favourite}
          key={account.id}
          onAccountRefresh={onAccountRefresh}
        />
      ))}
    </div>
  );
};

export default AccountDisplay;
