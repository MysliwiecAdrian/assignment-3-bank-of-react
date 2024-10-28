/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import AccountBalance from './AccountBalance';


const Credits = (props) => {
  const [creditDesc, setCreditDesc] = useState('');
  const [creditAmount, setCreditAmount] = useState(0);

  const handleDescChange = (event) => {
    setCreditDesc(event.target.value);
  };

  const handleAmountChange = (event) => {
    setCreditAmount(event.target.value);
  };

  let creditsHistory = () => {
    const { credits } = props;
    return credits.map((credit) => {
      let date = credit.date.slice(0, 10);
      return (
        <li key={credit.id}>
          {credit.amount} {credit.description} {date}
        </li>
      );
    });
  };

  return (
    <div>
      <h1>Credits</h1>
      {creditsHistory()}
      <br/>
      <form>
        <input type="text" name="description" placeholder="Description" value={creditDesc} onChange={handleDescChange}/>
        <input type="number" name="amount" placeholder="Amount" value={creditAmount} onChange={handleAmountChange}/>
        <button type="submit">Add Credit</button>
      </form>
      <div>Balance: $</div>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;