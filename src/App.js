import React, { Component } from 'react';
import Login from './login';
import SignUp from './signUp';
import Dashboard from './dashboard';


class App extends Component {
  constructor(){
    super();
    this.state = {
      view: 'Login'
    }
    this.validateLogin = this.validateLogin.bind(this)
  }

  componentDidMount(){
    console.log("Mounted")
    console.log(this.state.view)
  }

  validateLogin(username, password){
    console.log(username, 'user', password, 'pass', this.state.view)
    this.setState({
      view: username
    })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
        <h1 className="App-title">ORDNING</h1>
        </header>
        <div>
        <Login validateLogin={this.validateLogin}/>
        <SignUp />
        <Dashboard/>
        </div>
      </div>
    );
  }
}

export default App;
