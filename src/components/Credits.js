/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React from 'react';
import AccountBalance from './AccountBalance';


const Credits = (props) => {
  const credits = props.credits;
  const accountBalance = props.accountBalance;

  const addCredits = (credits) => {


  return (
    <div>
      <h1>Credits</h1>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
  }
}

export default Credits;