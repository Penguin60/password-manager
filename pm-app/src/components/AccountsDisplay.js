import Account from "./Account/Account";
import "./AccountsDisplay.css";

const AccountDisplay = ({ accounts }) => {
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
        />
      ))}
    </div>
  );
};

export default AccountDisplay;
