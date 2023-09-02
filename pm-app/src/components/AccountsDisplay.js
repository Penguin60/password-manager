import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Account from "./Account/Account";
import "./AccountsDisplay.css";

const AccountDisplay = ({ accounts, onAccountRefresh }) => {
  return (
    <Box sx={{ flexGrow: 1 }} className="accounts">
      <Grid container rowSpacing={4} justifyContent="center" alignContent="center">
        {accounts.map((account) => (
            <Grid item xs={11.1} key={account.id}>
              <Account
                id={account.id}
                name={account.name}
                userName={account.userName}
                password={account.password}
                category={account.category}
                favourite={account.favourite}
                onAccountRefresh={onAccountRefresh}
              />
            </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AccountDisplay;
