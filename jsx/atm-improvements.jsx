const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Withdraw'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" onChange={onChange}></input>
        <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
      </label>
    );
  };
  
  const Account = () => {
    // let deposit = 0; // state of this transaction
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState('');
    const [validTransaction, setValidTransaction] = React.useState(false);
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    const handleChange = (event) => {
      console.log(Number(event.target.value));
      if (Number(event.target.value) <= 0) {
        return setValidTransaction(false);
      }
      if (atmMode === 'Withdraw' && Number(event.target.value) > totalState) {
        setValidTransaction(false);
      } else {
        setValidTransaction(true);
      }
      setDeposit(Number(event.target.value));
    };

    const handleSubmit = (event) => {
        if (deposit <= 0) {
          return (event.preventDefault());
        }
        let newTotal;
        if (isDeposit) {
          newTotal = totalState + deposit;
          setTotalState(newTotal);
        }
        else if (!isDeposit && totalState >= deposit && deposit > 0) {
          let result = confirm("Confirm withdrawal ammount");
          if (result) {
            newTotal = totalState - deposit;
            setTotalState(newTotal);
          } else {
            setTotalState(totalState);
          }
        } else if (!isDeposit && totalState < deposit) {
          alert("Insufficient funds available")
          setTotalState(totalState);
        }
        event.preventDefault();
      };

      const handleModeSelect = (event) => {
        console.log(event.target.value);
        setAtmMode(event.target.value);
        setValidTransaction(false);
        if (event.target.value === 'Deposit') {
          setIsDeposit(true);
        } else {
          setIsDeposit(false);
        }
      };
  
    return (
      <form onSubmit={handleSubmit}>
        <>
          <h2 id="total">{status}</h2>
          <label>Select an action below to continue</label>
          <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
            <option id="no-selection" value=""></option>
            <option id="deposit-selection" value="Deposit">
              Deposit
            </option>
            <option id="cashback-selection" value="Withdraw">
              Withdraw
            </option>
          </select>
          {atmMode && (
            <ATMDeposit
              onChange={handleChange}
              isDeposit={isDeposit}
              isValid={validTransaction}
            ></ATMDeposit>
          )}
        </>
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));
  