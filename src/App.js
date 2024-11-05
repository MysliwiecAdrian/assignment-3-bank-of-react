/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234.56,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

    //Set up the componentDidMount lifecycle method to fetch the credit and debit data
    componentDidMount() {
      // Fetch credit data
      fetch("https://johnnylaicode.github.io/api/credits.json")
        .then((response) => response.json())
        .then((data) => {
          this.setState({creditList: data})
        });
  
      // Fetch debit data
      fetch("https://johnnylaicode.github.io/api/debits.json")
        .then((response) => response.json())
        .then((data) => {
          this.setState({debitList: data})
        });
    }  
  
  // Add a new debit item to the debitList
  addDebit = (debit) => {
    const date = new Date();
    debit.preventDefault();
    const newDebit = {amount: 0, description: '', date: ""};
    newDebit.amount = +parseFloat(debit.target[1].value).toFixed(2);
    newDebit.date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    newDebit.description = debit.target[0].value;
    this.setState({ 
      debitList: this.state.debitList.concat(newDebit) 
    });
    this.setState({
      accountBalance: this.state.accountBalance - newDebit.amount,
    });
  }
  
  //Add new credit payments to the creditList
  addCredit = (credit) => {
    const date = new Date();
    credit.preventDefault();
    const newCredit = {amount: 0, description: '', date: ""};
    newCredit.amount = +parseFloat(credit.target[1].value).toFixed(2);
    newCredit.date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    newCredit.description = credit.target[0].value;
    this.setState({ 
      creditList: this.state.creditList.concat(newCredit) 
    });
    this.setState({
      accountBalance: this.state.accountBalance + newCredit.amount,
    });
  }
  
  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} balance={this.state.accountBalance} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} balance={this.state.accountBalance}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-starter-code">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;