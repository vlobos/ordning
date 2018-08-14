import React, { Component } from 'react';
import Login from './login';
import SignUp from './signUp';
import Dashboard from './dashboard';


class App extends Component {
  constructor(){
    super();
    this.state = {
      view: ''
    }
    this.validateLogin = this.validateLogin.bind(this)
  }

  componentDidMount(){
    this.setState({
      view: 'login'
    })
  }

  validateLogin(username, password){
    console.log(username, 'user', password, 'pass', this.state.view)
    if (username === 'Sury'){
      this.setState({
        view: 'dashboard'
      })
    } else {
      this.setState({
        view: 'signup'
      })
    }
  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
        <h1 className="App-title">ORDNING</h1>
        </header>
        <div>
        {this.state.view === 'login' && <Login validateLogin={this.validateLogin}/> ||
        this.state.view === 'signup' && <SignUp/> || 
        this.state.view === 'dashboard' && <Dashboard/>}
        </div>
      </div>
    );
  }
}

export default App;
