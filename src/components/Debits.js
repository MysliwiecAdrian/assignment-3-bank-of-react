/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, {useState} from 'react';

const Debits = (props) => {
  const [debitDesc, setDebitDesc] = useState("");
  const [debitAmount, setDebitAmount] = useState(0);

  const handleDescChange = (event) => {
    setDebitDesc(event.target.value);
  };

  const handleAmountChange = (event) => {
    setDebitAmount(event.target.value);
  };

  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  }
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      {debitsView()}

      <form onSubmit={props.addDebit}>
        <input type="text" name="description" placeholder="Description" value={debitDesc} onChange={handleDescChange}/>
        <input type="number" name="amount" placeholder="Amount" value={debitAmount} onChange={handleAmountChange}/>
        <button type="submit">Add Debit</button>
      </form>
      <div>Balance: ${props.balance}</div>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;