const AccountText = (props) => {
  const copyAccountText = (event) => {
    navigator.clipboard.writeText(event.target.innerHTML);
    props.onCopy();
  };
  return (
    <div className={props.className} type="div" onClick={copyAccountText}>
      {props.data}
    </div>
  );
};

export default AccountText;
